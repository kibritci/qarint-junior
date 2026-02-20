'use client';

import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useGameStore } from '@/store/gameStore';
import { updateGamification } from '@/actions/gamification';
import { VocabularyWord } from '@/types';
import GameWrapper from './GameWrapper';

interface Card {
  id: string;
  word: string;
  openmoji_hex: string;
  type: 'word' | 'image';
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryMatchProps {
  words: VocabularyWord[];
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

export default function MemoryMatch({ words }: MemoryMatchProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [totalPairs, setTotalPairs] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [shakingCards, setShakingCards] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const { addXp } = useGameStore();

  useEffect(() => {
    if (words.length === 0) return;
    const gameWords = words.slice(0, 6);
    const gameCards: Card[] = [];

    gameWords.forEach((word) => {
      gameCards.push({
        id: `word-${word.id}`,
        word: word.word,
        openmoji_hex: word.openmoji_hex,
        type: 'word',
        isFlipped: false,
        isMatched: false,
      });
      gameCards.push({
        id: `image-${word.id}`,
        word: word.word,
        openmoji_hex: word.openmoji_hex,
        type: 'image',
        isFlipped: false,
        isMatched: false,
      });
    });

    const shuffled = [...gameCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setTotalPairs(gameWords.length);
  }, [words]);

  const handleCardClick = useCallback((index: number) => {
    if (isChecking) return;
    const card = cards[index];
    if (card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    speakWord(card.word);

    const newCards = [...cards];
    newCards[index] = { ...newCards[index], isFlipped: true };
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setMoves((prev) => prev + 1);

      const first = newCards[newFlipped[0]];
      const second = newCards[newFlipped[1]];

      if (first.word === second.word && first.type !== second.type) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.word === first.word ? { ...c, isMatched: true, isFlipped: true } : c
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
          addXp(10);

          confetti({ particleCount: 60, spread: 80, origin: { y: 0.7 } });

          setMatches((prev) => {
            const next = prev + 1;
            if (next === totalPairs) {
              setIsGameComplete(true);
              updateGamification(next * 10);
              confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
            }
            return next;
          });
        }, 400);
      } else {
        setShakingCards(newFlipped);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              newFlipped.includes(i) ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
          setShakingCards([]);
          setIsChecking(false);
        }, 900);
      }
    }
  }, [cards, flippedCards, isChecking, totalPairs, addXp]);

  const resetGame = () => {
    setCards((prev) =>
      prev.map((c) => ({ ...c, isFlipped: false, isMatched: false })).sort(() => Math.random() - 0.5)
    );
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsGameComplete(false);
    setShakingCards([]);
    setIsChecking(false);
  };

  const progress = totalPairs > 0 ? (matches / totalPairs) * 100 : 0;

  if (cards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-gray-400 font-display text-lg">Loading game...</div>
      </div>
    );
  }

  return (
    <GameWrapper title="Memory Match" progress={progress}>
      {/* Game Info */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">Memory Match</h2>
          <p className="text-sm text-gray-400 mt-1">Match English words with their pictures</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-display font-bold text-gray-900">{moves}</p>
            <p className="text-xs text-gray-400">Moves</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center">
            <p className="text-2xl font-display font-bold text-primary">{matches}/{totalPairs}</p>
            <p className="text-xs text-gray-400">Matched</p>
          </div>
        </div>
      </div>

      {/* Complete Banner */}
      {isGameComplete && (
        <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 animate-bounce-in">
          <div className="text-center">
            <p className="text-4xl mb-2">🎉</p>
            <h3 className="text-xl font-display font-bold text-green-800 mb-1">Congratulations!</h3>
            <p className="text-green-600 text-sm mb-4">You completed the game in {moves} moves!</p>
            <button onClick={resetGame} className="btn-primary">
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Card Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {cards.map((card, index) => {
          const isShaking = shakingCards.includes(index);
          const isRevealed = card.isFlipped || card.isMatched;

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              disabled={card.isMatched || isChecking}
              className={`
                aspect-square rounded-2xl border-2 flex items-center justify-center p-3
                transition-all duration-300 ease-out cursor-pointer select-none
                ${isShaking ? 'animate-funny-shake' : ''}
                ${card.isMatched
                  ? 'border-green-300 bg-green-50 scale-95 opacity-60'
                  : isRevealed
                    ? 'border-primary-200 bg-white shadow-game scale-[1.02]'
                    : 'border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 hover:border-gray-300 hover:shadow-md hover:scale-[1.02]'
                }
                disabled:cursor-default
              `}
            >
              {isRevealed ? (
                <div className="animate-flip-in">
                  {card.type === 'word' ? (
                    <span className="text-lg md:text-xl font-display font-bold text-gray-800">
                      {card.word}
                    </span>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/svg/${card.openmoji_hex}.svg`}
                      alt={card.word}
                      className="w-12 h-12 md:w-16 md:h-16"
                    />
                  )}
                </div>
              ) : (
                <span className="text-3xl opacity-30 group-hover:opacity-50 transition-opacity">❓</span>
              )}
            </button>
          );
        })}
      </div>
    </GameWrapper>
  );
}
