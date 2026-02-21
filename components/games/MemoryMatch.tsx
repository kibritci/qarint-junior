'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import confetti from 'canvas-confetti';
import { useGameStore } from '@/store/gameStore';
import { updateGamification } from '@/actions/gamification';
import { XP_PER_MATCH } from '@/lib/gameXp';
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

  const t = useTranslations('games.memoryMatch');
  const { addXp } = useGameStore();

  useEffect(() => {
    if (words.length === 0) return;
    const gameWords = words.slice(0, 4);
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
          addXp(XP_PER_MATCH);

          confetti({ particleCount: 60, spread: 80, origin: { y: 0.7 } });

          setMatches((prev) => {
            const next = prev + 1;
            if (next === totalPairs) {
              setIsGameComplete(true);
              updateGamification(next * XP_PER_MATCH, 'memory-match');
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
        <div className="animate-pulse text-gray-400 dark:text-gray-500 font-display text-lg">Loading game...</div>
      </div>
    );
  }

  const headerTrailing = (
    <div className="flex items-center gap-2 md:gap-3">
      <div className="text-center">
        <p className="text-base md:text-lg font-display font-bold text-gray-900 dark:text-gray-100 tabular-nums">{moves}</p>
        <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500">{t('moves')}</p>
      </div>
      <div className="w-px h-5 md:h-6 bg-gray-200 dark:bg-gray-600" />
      <div className="text-center">
        <p className="text-base md:text-lg font-display font-bold text-primary tabular-nums">{matches}/{totalPairs}</p>
        <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500">{t('matched')}</p>
      </div>
    </div>
  );

  return (
    <GameWrapper title={t('title')} progress={progress} headerTrailing={headerTrailing}>
      <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">{t('description')}</p>

      {/* Completion bottom sheet (Duolingo style) */}
      {isGameComplete && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50" aria-hidden />
          <div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)] px-4 pt-5 pb-6 safe-area-bottom animate-slide-up"
            role="dialog"
            aria-labelledby="memory-complete-title"
          >
            <div className="max-w-sm mx-auto text-center">
              <p className="text-3xl mb-2" aria-hidden>🎉</p>
              <h3 id="memory-complete-title" className="text-lg font-display font-bold text-green-800 mb-1">
                {t('congratulations')}
              </h3>
              <p className="text-green-600 text-sm mb-4">{t('completedInMoves', { moves })}</p>
              <button onClick={resetGame} className="btn-primary w-full sm:w-auto">
                {t('playAgain')}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Card Grid - 4 pairs = 8 cards, 4x2 */}
      <div className="grid grid-cols-4 gap-1.5 md:gap-2 max-w-sm mx-auto">
        {cards.map((card, index) => {
          const isShaking = shakingCards.includes(index);
          const isRevealed = card.isFlipped || card.isMatched;

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              disabled={card.isMatched || isChecking}
              className={`
                aspect-square rounded-lg md:rounded-xl border-2 flex items-center justify-center p-1.5 md:p-2
                transition-all duration-300 ease-out cursor-pointer select-none
                ${isShaking ? 'animate-funny-shake' : ''}
                ${card.isMatched
                  ? 'border-green-300 bg-green-50 scale-95 opacity-60'
                  : isRevealed
                    ? 'border-primary-200 dark:border-primary-600 bg-white dark:bg-gray-800 shadow-game scale-[1.02]'
                    : 'border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 hover:border-gray-300 hover:shadow-md active:scale-95'
                }
                disabled:cursor-default
              `}
            >
              {isRevealed ? (
                <div className="animate-flip-in">
                  {card.type === 'word' ? (
                    <span className="text-[10px] md:text-sm font-display font-bold text-gray-800 dark:text-gray-200 break-all leading-tight">
                      {card.word}
                    </span>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji/color/svg/${card.openmoji_hex}.svg`}
                      alt={card.word}
                      className="w-8 h-8 md:w-12 md:h-12"
                    />
                  )}
                </div>
              ) : (
                <span className="text-lg md:text-2xl opacity-30 transition-opacity">❓</span>
              )}
            </button>
          );
        })}
      </div>
    </GameWrapper>
  );
}
