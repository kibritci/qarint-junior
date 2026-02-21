'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import confetti from 'canvas-confetti';
import { useGameStore } from '@/store/gameStore';
import { updateGamification } from '@/actions/gamification';
import { XP_PER_BLANK } from '@/lib/gameXp';
import GameWrapper from './GameWrapper';

interface Story {
  id: number;
  template: string[];
  blanks: {
    index: number;
    correct: string;
    options: string[];
    wrongReaction: string;
  }[];
}

const STORIES: Story[] = [
  {
    id: 1,
    template: ['Ali wanted to', '_____', 'a bridge for his village. He worked very hard with his', '_____', 'and they finished it together!'],
    blanks: [
      {
        index: 1,
        correct: 'build',
        options: ['build', 'eat', 'fly'],
        wrongReaction: 'eat',
      },
      {
        index: 3,
        correct: 'family',
        options: ['family', 'pencil', 'cloud'],
        wrongReaction: 'pencil',
      },
    ],
  },
  {
    id: 2,
    template: ['Every morning, Fatima likes to', '_____', 'her grandmother. She brings her a cup of', '_____', 'with love.'],
    blanks: [
      {
        index: 1,
        correct: 'visit',
        options: ['visit', 'throw', 'paint'],
        wrongReaction: 'throw',
      },
      {
        index: 3,
        correct: 'tea',
        options: ['tea', 'rocks', 'shoes'],
        wrongReaction: 'rocks',
      },
    ],
  },
  {
    id: 3,
    template: ['At the picnic, we', '_____', 'our food with friends. It makes everyone', '_____', '!'],
    blanks: [
      {
        index: 1,
        correct: 'share',
        options: ['share', 'hide', 'juggle'],
        wrongReaction: 'hide',
      },
      {
        index: 3,
        correct: 'happy',
        options: ['happy', 'purple', 'dizzy'],
        wrongReaction: 'dizzy',
      },
    ],
  },
  {
    id: 4,
    template: ['Omar always tells the', '_____', '. His teacher says he is very', '_____', 'and gives him a star!'],
    blanks: [
      {
        index: 1,
        correct: 'truth',
        options: ['truth', 'pizza', 'moon'],
        wrongReaction: 'pizza',
      },
      {
        index: 3,
        correct: 'honest',
        options: ['honest', 'sleepy', 'tiny'],
        wrongReaction: 'sleepy',
      },
    ],
  },
];

const WRONG_REACTIONS: Record<string, { emoji: string; text: string }> = {
  eat: { emoji: '🦷', text: 'He tried to eat the bridge and broke his teeth!' },
  pencil: { emoji: '✏️', text: 'A pencil can\'t build bridges... silly!' },
  throw: { emoji: '🤸', text: 'You can\'t throw a grandmother!' },
  rocks: { emoji: '🪨', text: 'Grandma does NOT want a cup of rocks!' },
  hide: { emoji: '🙈', text: 'If you hide the food, nobody eats!' },
  dizzy: { emoji: '😵‍💫', text: 'Everyone got dizzy and fell over!' },
  pizza: { emoji: '🍕', text: 'You can\'t tell a pizza... it won\'t listen!' },
  sleepy: { emoji: '😴', text: 'Zzzzz... the teacher fell asleep giving stars!' },
  fly: { emoji: '🦅', text: 'Bridges don\'t fly... at least not yet!' },
  paint: { emoji: '🎨', text: 'You painted your grandmother? Oh no!' },
  juggle: { emoji: '🤹', text: 'Juggling food? What a mess!' },
  cloud: { emoji: '☁️', text: 'A cloud disappeared halfway through!' },
  purple: { emoji: '🟣', text: 'Everyone turned purple? That\'s weird!' },
  tiny: { emoji: '🐜', text: 'He became tiny and the star was bigger than him!' },
  moon: { emoji: '🌙', text: 'The moon is too far away to tell anything!' },
  shoes: { emoji: '👟', text: 'Grandma took a sip of shoes and spit them out!' },
};

function speakWord(word: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }
}

export default function MadLibsGame() {
  const t = useTranslations('games.madLibs');
  const [currentStory, setCurrentStory] = useState(0);
  const [currentBlank, setCurrentBlank] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [wrongReaction, setWrongReaction] = useState<{ emoji: string; text: string } | null>(null);
  const [isStoryComplete, setIsStoryComplete] = useState(false);
  const [isAllComplete, setIsAllComplete] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const hasCelebratedRef = useRef(false);

  const { addXp } = useGameStore();
  const story = STORIES[currentStory];

  useEffect(() => {
    if (isAllComplete && !hasCelebratedRef.current) {
      hasCelebratedRef.current = true;
      confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
    }
  }, [isAllComplete]);

  useEffect(() => {
    if (!isAllComplete) hasCelebratedRef.current = false;
  }, [isAllComplete]);

  const initStory = (index: number) => {
    setCurrentStory(index);
    setCurrentBlank(0);
    setAnswers(new Array(STORIES[index].blanks.length).fill(null));
    setIsStoryComplete(false);
    setWrongReaction(null);
  };

  const handleOptionClick = (option: string) => {
    speakWord(option);
    const blank = story.blanks[currentBlank];

    if (option === blank.correct) {
      const newAnswers = [...answers];
      newAnswers[currentBlank] = option;
      setAnswers(newAnswers);
      setWrongReaction(null);
      addXp(XP_PER_BLANK);
      setTotalScore((prev) => prev + XP_PER_BLANK);

      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });

      if (currentBlank + 1 >= story.blanks.length) {
        setIsStoryComplete(true);
        speakWord(buildSentence(newAnswers));
      } else {
        setCurrentBlank(currentBlank + 1);
      }
    } else {
      const reaction = WRONG_REACTIONS[blank.wrongReaction] || { emoji: '😂', text: t('oopsTryAgain') };
      setWrongReaction(reaction);
    }
  };

  const buildSentence = (ans: (string | null)[]) => {
    let blankIdx = 0;
    return story.template
      .map((part) => {
        if (part === '_____') {
          return ans[blankIdx++] || '___';
        }
        return part;
      })
      .join(' ');
  };

  const nextStory = () => {
    const next = currentStory + 1;
    if (next >= STORIES.length) {
      setIsAllComplete(true);
      updateGamification(totalScore, 'mad-libs');
    } else {
      initStory(next);
    }
  };

  const restart = () => {
    initStory(0);
    setTotalScore(0);
    setIsAllComplete(false);
  };

  const progress = ((currentStory + (isStoryComplete ? 1 : 0)) / STORIES.length) * 100;

  if (isAllComplete) {
    return (
      <GameWrapper title={t('title')} progress={100}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-bounce-in">
          <div className="text-6xl mb-4">📖</div>
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-gray-100 mb-2">{t('allStoriesComplete')}</h2>
          <p className="text-5xl font-display font-black text-primary mb-2">{totalScore}</p>
          <p className="text-gray-500 dark:text-gray-400 mb-8">{t('totalPointsEarned')}</p>
          <button onClick={restart} className="btn-primary text-lg px-8 py-4">
            {t('playAgain')}
          </button>
        </div>
      </GameWrapper>
    );
  }

  return (
    <GameWrapper title={t('title')} progress={progress}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="min-w-0">
          <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-gray-100">{t('fillInStory')}</h2>
          <p className="text-xs md:text-sm text-gray-400 mt-0.5 md:mt-1">{t('pickRightWordHint')}</p>
        </div>
        <div className="badge-green flex-shrink-0">
          Story {currentStory + 1} / {STORIES.length}
        </div>
      </div>

      {/* Story Text */}
      <div className="p-4 md:p-6 bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl border border-gray-100 dark:border-gray-700 shadow-card mb-4 md:mb-6">
        <div className="text-base md:text-xl leading-relaxed font-body">
          {(() => {
            let blankIdx = 0;
            return story.template.map((part, i) => {
              if (part === '_____') {
                const idx = blankIdx;
                blankIdx++;
                const answer = answers[idx];
                const isCurrentBlank = idx === currentBlank && !isStoryComplete;
                return (
                  <span
                    key={i}
                    className={`
                      inline-block mx-1 px-3 py-1 rounded-lg font-display font-bold
                      ${answer
                        ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                        : isCurrentBlank
                          ? 'bg-primary-50 text-primary border-2 border-primary-200 animate-pulse-glow'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-600'
                      }
                    `}
                  >
                    {answer || '???'}
                  </span>
                );
              }
              return <span key={i}>{part}</span>;
            });
          })()}
        </div>
      </div>

      {/* Wrong Reaction */}
      {wrongReaction && (
        <div className="mb-4 md:mb-6 p-4 md:p-5 bg-orange-50 rounded-xl md:rounded-2xl border border-orange-200 text-center animate-funny-shake">
          <p className="text-3xl md:text-4xl mb-1 md:mb-2">{wrongReaction.emoji}</p>
          <p className="text-sm md:text-base text-orange-700 dark:text-orange-300 font-display font-bold">{wrongReaction.text}</p>
          <p className="text-xs md:text-sm text-orange-500 mt-1">{t('tryAnotherWord')}</p>
        </div>
      )}

      {/* Options */}
      {!isStoryComplete && (
        <div className="mb-4 md:mb-6">
          <p className="text-xs md:text-sm text-gray-400 mb-2 md:mb-3 text-center">{t('pickRightWord')}</p>
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            {story.blanks[currentBlank]?.options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="px-4 md:px-6 py-2.5 md:py-3 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl border-2 border-gray-200 dark:border-gray-600
                           font-display font-bold text-sm md:text-base text-gray-700 dark:text-gray-300
                           shadow-card active:scale-95 transition-all duration-200 cursor-pointer"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Story Complete */}
      {isStoryComplete && (
        <div className="text-center animate-bounce-in">
          <div className="mb-4 p-4 bg-green-50 rounded-xl border border-green-200">
            <p className="text-green-700 dark:text-green-300 font-display font-bold">
              ✅ {t('storyCompleteGreatJob')}
            </p>
          </div>
          <button onClick={nextStory} className="btn-primary text-lg px-8">
            {currentStory + 1 >= STORIES.length ? t('finishAllStories') : t('nextStory')}
          </button>
        </div>
      )}
    </GameWrapper>
  );
}
