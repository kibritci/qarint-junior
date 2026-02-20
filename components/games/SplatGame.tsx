'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useGameStore } from '@/store/gameStore';
import { updateGamification } from '@/actions/gamification';
import GameWrapper from './GameWrapper';
import { VOCABULARY, getWordsByCategory, CATEGORIES as ALL_CATS } from '@/lib/data/cambridgeYLE';

interface Bubble {
  id: number;
  word: string;
  emoji: string;
  isCorrect: boolean;
  x: number;
  y: number;
  speed: number;
  popped: boolean;
  wrongPop: boolean;
}

function buildCategories() {
  const gameCats = ['animals', 'food', 'family', 'nature', 'clothes', 'transport', 'sports', 'home'];
  return gameCats
    .filter((cat) => getWordsByCategory(cat).length >= 4)
    .map((cat) => {
      const words = getWordsByCategory(cat).filter((w) => !w.openmoji_hex.includes('-'));
      const otherWords = VOCABULARY.filter((w) => w.category !== cat && !w.openmoji_hex.includes('-'));
      const shuffledCorrect = [...words].sort(() => Math.random() - 0.5).slice(0, 6);
      const shuffledWrong = [...otherWords].sort(() => Math.random() - 0.5).slice(0, 6);
      return {
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        correct: shuffledCorrect.map((w) => ({ word: w.word, emoji: w.openmoji_hex })),
        wrong: shuffledWrong.map((w) => ({ word: w.word, emoji: w.openmoji_hex })),
      };
    });
}

const CATEGORIES = buildCategories();

function speakWord(word: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}

export default function SplatGame() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const nextId = useRef(0);
  const animRef = useRef<number>(0);
  const lastSpawn = useRef(0);

  const { addXp } = useGameStore();

  const spawnBubble = useCallback(() => {
    const isCorrect = Math.random() > 0.45;
    const pool = isCorrect ? category.correct : category.wrong;
    const item = pool[Math.floor(Math.random() * pool.length)];

    const bubble: Bubble = {
      id: nextId.current++,
      word: item.word,
      emoji: item.emoji,
      isCorrect,
      x: 10 + Math.random() * 75,
      y: 105,
      speed: 0.3 + Math.random() * 0.4,
      popped: false,
      wrongPop: false,
    };
    setBubbles((prev) => [...prev.filter((b) => b.y > -10 && !b.popped), bubble]);
  }, [category]);

  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsGameOver(true);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, isGameOver]);

  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const tick = () => {
      const now = Date.now();
      if (now - lastSpawn.current > 1200) {
        spawnBubble();
        lastSpawn.current = now;
      }

      setBubbles((prev) =>
        prev
          .map((b) => (b.popped ? b : { ...b, y: b.y - b.speed }))
          .filter((b) => b.y > -15)
      );
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, isGameOver, spawnBubble]);

  const handleBubbleClick = (bubble: Bubble) => {
    if (bubble.popped) return;
    speakWord(bubble.word);

    if (bubble.isCorrect) {
      setScore((prev) => prev + 10);
      addXp(10);
      setBubbles((prev) =>
        prev.map((b) => (b.id === bubble.id ? { ...b, popped: true } : b))
      );
      confetti({ particleCount: 30, spread: 50, origin: { x: bubble.x / 100, y: bubble.y / 100 } });
    } else {
      setBubbles((prev) =>
        prev.map((b) => (b.id === bubble.id ? { ...b, wrongPop: true } : b))
      );
      setTimeout(() => {
        setBubbles((prev) =>
          prev.map((b) => (b.id === bubble.id ? { ...b, wrongPop: false } : b))
        );
      }, 600);
    }
  };

  const startGame = () => {
    const cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    setCategory(cat);
    setBubbles([]);
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    setIsGameOver(false);
    nextId.current = 0;
    lastSpawn.current = 0;
  };

  const finishGame = () => {
    updateGamification(score);
  };

  useEffect(() => {
    if (isGameOver && score > 0) finishGame();
  }, [isGameOver]);

  const progress = ((60 - timeLeft) / 60) * 100;

  if (!isPlaying && !isGameOver) {
    return (
      <GameWrapper title="Splat Word Hunt" progress={0}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="text-6xl mb-6 animate-bounce-in">🎯</div>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Splat Word Hunt</h2>
          <p className="text-gray-500 mb-2 max-w-md">
            Bubbles will float up with words inside. Tap only the ones that belong to the category!
          </p>
          <p className="text-sm text-gray-400 mb-8">60 seconds - no point loss for wrong taps</p>
          <button onClick={startGame} className="btn-primary text-lg px-8 py-4">
            Start Game
          </button>
        </div>
      </GameWrapper>
    );
  }

  if (isGameOver) {
    return (
      <GameWrapper title="Splat Word Hunt" progress={100}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-bounce-in">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Time&apos;s Up!</h2>
          <p className="text-5xl font-display font-black text-primary mb-2">{score}</p>
          <p className="text-gray-500 mb-8">points earned</p>
          <button onClick={startGame} className="btn-primary text-lg px-8 py-4">
            Play Again
          </button>
        </div>
      </GameWrapper>
    );
  }

  return (
    <GameWrapper title="Splat Word Hunt" progress={progress}>
      {/* Category + Timer + Score */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-400">Find all</p>
          <h2 className="text-2xl font-display font-bold text-gray-900">{category.name}</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-display font-bold text-primary">{timeLeft}s</p>
            <p className="text-xs text-gray-400">Time</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center">
            <p className="text-2xl font-display font-bold text-gray-900">{score}</p>
            <p className="text-xs text-gray-400">Score</p>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative w-full h-[60vh] bg-gradient-to-b from-blue-50 to-sky-100 rounded-2xl overflow-hidden border border-blue-100">
        {bubbles.map((bubble) =>
          bubble.popped ? null : (
            <button
              key={bubble.id}
              onClick={() => handleBubbleClick(bubble)}
              className={`
                absolute flex flex-col items-center justify-center
                w-20 h-20 md:w-24 md:h-24 rounded-full
                bg-white shadow-lg border-2
                transition-transform duration-150
                cursor-pointer select-none
                ${bubble.wrongPop
                  ? 'animate-funny-shake border-red-300 bg-red-50'
                  : 'border-white/80 hover:scale-110'
                }
              `}
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/svg/${bubble.emoji}.svg`}
                alt={bubble.word}
                className="w-8 h-8 md:w-10 md:h-10"
              />
              <span className="text-[10px] md:text-xs font-display font-bold text-gray-700 mt-0.5">
                {bubble.word}
              </span>
            </button>
          )
        )}
      </div>
    </GameWrapper>
  );
}
