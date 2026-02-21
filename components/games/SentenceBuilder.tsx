'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import confetti from 'canvas-confetti';
import { useGameStore } from '@/store/gameStore';
import { updateGamification } from '@/actions/gamification';
import { XP_PER_SENTENCE } from '@/lib/gameXp';
import GameWrapper from './GameWrapper';

interface Sentence {
  id: number;
  words: string[];
  hint: string;
}

const SENTENCES: Sentence[] = [
  { id: 1, words: ['I', 'respect', 'my', 'elders'], hint: 'Showing respect to elders' },
  { id: 2, words: ['I', 'help', 'my', 'mother'], hint: 'Helping at home' },
  { id: 3, words: ['We', 'share', 'our', 'food'], hint: 'Being generous' },
  { id: 4, words: ['I', 'love', 'my', 'family'], hint: 'Family love' },
  { id: 5, words: ['We', 'are', 'honest', 'always'], hint: 'Being truthful' },
  { id: 6, words: ['I', 'read', 'every', 'day'], hint: 'Daily reading habit' },
  { id: 7, words: ['Thank', 'you', 'very', 'much'], hint: 'Showing gratitude' },
  { id: 8, words: ['We', 'help', 'each', 'other'], hint: 'Cooperation' },
];

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function speakWord(word: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }
}

export default function SentenceBuilder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<string[]>(() =>
    shuffle(SENTENCES[0].words)
  );
  const [placedWords, setPlacedWords] = useState<(string | null)[]>(() =>
    new Array(SENTENCES[0].words.length).fill(null)
  );
  const [wrongSlots, setWrongSlots] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const hasCelebratedRef = useRef(false);

  const t = useTranslations('games.sentenceBuilder');

  useEffect(() => {
    if (!isComplete || hasCelebratedRef.current) return;
    const tid = setTimeout(() => {
      hasCelebratedRef.current = true;
      confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
    }, 350);
    return () => clearTimeout(tid);
  }, [isComplete]);

  useEffect(() => {
    if (!isComplete) hasCelebratedRef.current = false;
  }, [isComplete]);
  const { addXp } = useGameStore();
  const sentence = SENTENCES[currentIndex];

  const availableWords = shuffledWords.filter((w) => !placedWords.includes(w));

  const handleWordClick = useCallback((word: string) => {
    speakWord(word);
    const firstEmpty = placedWords.indexOf(null);
    if (firstEmpty === -1) return;
    const newPlaced = [...placedWords];
    newPlaced[firstEmpty] = word;
    setPlacedWords(newPlaced);
  }, [placedWords]);

  const handleSlotClick = useCallback((index: number) => {
    if (placedWords[index] === null) return;
    const newPlaced = [...placedWords];
    newPlaced[index] = null;
    setPlacedWords(newPlaced);
    setWrongSlots([]);
  }, [placedWords]);

  const checkAnswer = () => {
    const isAllFilled = placedWords.every((w) => w !== null);
    if (!isAllFilled) return;

    const correct = sentence.words;
    const wrong: number[] = [];
    placedWords.forEach((w, i) => {
      if (w !== correct[i]) wrong.push(i);
    });

    if (wrong.length === 0) {
      setIsCorrect(true);
      addXp(XP_PER_SENTENCE);
      setTotalScore((prev) => prev + XP_PER_SENTENCE);
      confetti({ particleCount: 80, spread: 90, origin: { y: 0.6 } });
      speakWord(correct.join(' '));
    } else {
      setWrongSlots(wrong);
      setTimeout(() => {
        const newPlaced: (string | null)[] = [...placedWords];
        wrong.forEach((i) => {
          newPlaced[i] = null;
        });
        setPlacedWords(newPlaced);
        setWrongSlots([]);
      }, 800);
    }
  };

  const nextSentence = () => {
    const next = currentIndex + 1;
    if (next >= SENTENCES.length) {
      setIsComplete(true);
      updateGamification(totalScore, 'sentence-builder');
      return;
    }
    setCurrentIndex(next);
    setShuffledWords(shuffle(SENTENCES[next].words));
    setPlacedWords(new Array(SENTENCES[next].words.length).fill(null));
    setIsCorrect(false);
    setWrongSlots([]);
  };

  const restart = () => {
    setCurrentIndex(0);
    setShuffledWords(shuffle(SENTENCES[0].words));
    setPlacedWords(new Array(SENTENCES[0].words.length).fill(null));
    setIsCorrect(false);
    setWrongSlots([]);
    setTotalScore(0);
    setIsComplete(false);
  };

  const progress = ((currentIndex + (isCorrect ? 1 : 0)) / SENTENCES.length) * 100;

  if (isComplete) {
    return (
      <GameWrapper title={t('title')} progress={100}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-bounce-in">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-gray-100 mb-2">{t('amazing')}</h2>
          <p className="text-5xl font-display font-black text-primary mb-2">{totalScore}</p>
          <p className="text-gray-500 mb-8">{t('totalPointsEarned')}</p>
          <button onClick={restart} className="btn-primary text-lg px-8 py-4">
            {t('playAgain')}
          </button>
        </div>
      </GameWrapper>
    );
  }

  return (
    <GameWrapper title={t('title')} progress={progress}>
      {/* Info */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="min-w-0">
          <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-gray-100">{t('buildSentence')}</h2>
          <p className="text-xs md:text-sm text-gray-400 mt-0.5 md:mt-1">{t('tapOrder')}</p>
        </div>
        <div className="badge-blue flex-shrink-0">
          {currentIndex + 1} / {SENTENCES.length}
        </div>
      </div>

      {/* Hint */}
      <div className="mb-4 md:mb-6 p-3 md:p-4 bg-amber-50 rounded-xl border border-amber-200">
        <p className="text-xs md:text-sm text-amber-700 font-medium">
          💡 {t('hintLabel')}: {sentence.hint}
        </p>
      </div>

      {/* Drop Zones */}
      <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8 min-h-[52px] md:min-h-[60px] p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-xl md:rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-600">
        {placedWords.map((word, index) => (
          <button
            key={index}
            onClick={() => handleSlotClick(index)}
            className={`
              min-w-[60px] md:min-w-[80px] h-10 md:h-12 px-3 md:px-4 rounded-lg md:rounded-xl border-2 font-display font-bold text-xs md:text-sm
              transition-all duration-300
              ${wrongSlots.includes(index)
                ? 'animate-spring-back border-red-300 bg-red-50 text-red-600'
                : word
                  ? 'border-primary-200 dark:border-primary-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm active:scale-95 cursor-pointer'
                  : 'border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-300 dark:text-gray-500'
              }
            `}
          >
            {word || (index + 1)}
          </button>
        ))}
      </div>

      {/* Word Pool */}
      {!isCorrect && (
        <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6 justify-center">
          {availableWords.map((word, i) => (
            <button
              key={`${word}-${i}`}
              onClick={() => handleWordClick(word)}
              className="px-4 md:px-5 h-10 md:h-12 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl border-2 border-gray-200 dark:border-gray-600
                         font-display font-bold text-xs md:text-sm text-gray-700 dark:text-gray-300
                         shadow-card active:scale-95 transition-all duration-200 cursor-pointer"
            >
              {word}
            </button>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-3 md:gap-4">
        {isCorrect ? (
          <button onClick={nextSentence} className="btn-primary text-base md:text-lg px-6 md:px-8">
            {currentIndex + 1 >= SENTENCES.length ? t('finish') : t('next')}
          </button>
        ) : (
          <button
            onClick={checkAnswer}
            disabled={placedWords.includes(null)}
            className="btn-primary text-base md:text-lg px-6 md:px-8 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        )}
      </div>

      {/* Correct feedback */}
      {isCorrect && (
        <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200 text-center animate-bounce-in">
          <p className="text-green-700 font-display font-bold">
            ✅ &quot;{sentence.words.join(' ')}&quot;
          </p>
        </div>
      )}
    </GameWrapper>
  );
}
