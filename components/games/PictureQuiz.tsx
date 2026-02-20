'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { useGameStore } from '@/store/gameStore';
import { updateGamification } from '@/actions/gamification';
import GameWrapper from './GameWrapper';
import { getRandomQuizQuestions, IMAGE_BASE_PATH } from '@/lib/data/quizImages';

const QUESTIONS_PER_ROUND = 10;
const TIME_PER_QUESTION = 6;
const XP_CORRECT = 10;
const XP_FAST_BONUS = 5;

type Phase = 'idle' | 'playing' | 'feedback' | 'results';

interface QuizQuestion {
  image: { filename: string; word: string };
  options: string[];
  correct: string;
}

function speakWord(word: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }
}

export default function PictureQuiz() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const { addXp } = useGameStore();

  const currentQuestion = questions[currentIndex];

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    setTimeLeft(TIME_PER_QUESTION);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);

  useEffect(() => {
    if (phase === 'playing' && timeLeft === 0 && selectedAnswer === null) {
      handleTimeout();
    }
  }, [timeLeft, phase, selectedAnswer]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const startGame = () => {
    const qs = getRandomQuizQuestions(QUESTIONS_PER_ROUND);
    setQuestions(qs);
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setTotalTime(0);
    setSelectedAnswer(null);
    setIsCorrectAnswer(null);
    startTimeRef.current = Date.now();
    setPhase('playing');
    startTimer();
  };

  const handleTimeout = () => {
    clearTimer();
    setSelectedAnswer('__timeout__');
    setIsCorrectAnswer(false);
    speakWord(currentQuestion.correct);
    setPhase('feedback');
    setTimeout(() => advanceQuestion(), 2000);
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer !== null || phase !== 'playing') return;
    clearTimer();

    const correct = answer === currentQuestion.correct;
    setSelectedAnswer(answer);
    setIsCorrectAnswer(correct);
    speakWord(currentQuestion.correct);
    setPhase('feedback');

    if (correct) {
      const bonus = timeLeft >= 4 ? XP_FAST_BONUS : 0;
      const earned = XP_CORRECT + bonus;
      setScore(prev => prev + earned);
      setCorrectCount(prev => prev + 1);
      addXp(earned);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }

    setTimeout(() => advanceQuestion(), correct ? 1200 : 2000);
  };

  const advanceQuestion = () => {
    const next = currentIndex + 1;
    if (next >= questions.length) {
      setTotalTime(Math.round((Date.now() - startTimeRef.current) / 1000));
      setPhase('results');
      updateGamification(score);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      return;
    }
    setCurrentIndex(next);
    setSelectedAnswer(null);
    setIsCorrectAnswer(null);
    setPhase('playing');
    startTimer();
  };

  const progress = questions.length > 0
    ? ((currentIndex + (phase === 'results' ? 1 : 0)) / questions.length) * 100
    : 0;

  // Start Screen
  if (phase === 'idle') {
    return (
      <GameWrapper title="Picture Quiz" progress={0}>
        <div className="flex flex-col items-center justify-center min-h-[50vh] md:min-h-[60vh] text-center px-4">
          <div className="text-5xl md:text-6xl mb-4 md:mb-6 animate-bounce-in">🖼️</div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2 md:mb-3">Picture Quiz</h2>
          <p className="text-sm md:text-base text-gray-500 mb-2 max-w-md">
            Look at the picture and pick the correct English word! You have {TIME_PER_QUESTION} seconds for each question.
          </p>
          <p className="text-xs md:text-sm text-gray-400 mb-6 md:mb-8">
            {QUESTIONS_PER_ROUND} questions per round &middot; Answer fast for bonus XP!
          </p>
          <button onClick={startGame} className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
            Start Quiz
          </button>
        </div>
      </GameWrapper>
    );
  }

  // Results Screen
  if (phase === 'results') {
    const accuracy = Math.round((correctCount / questions.length) * 100);
    const emoji = accuracy >= 80 ? '🏆' : accuracy >= 50 ? '👏' : '💪';
    const message = accuracy >= 80 ? 'Amazing!' : accuracy >= 50 ? 'Good job!' : 'Keep practicing!';

    return (
      <GameWrapper title="Picture Quiz" progress={100}>
        <div className="flex flex-col items-center justify-center min-h-[50vh] md:min-h-[60vh] text-center px-4 animate-bounce-in">
          <div className="text-5xl md:text-6xl mb-3 md:mb-4">{emoji}</div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4 md:mb-6">{message}</h2>

          <div className="grid grid-cols-3 gap-3 md:gap-5 mb-6 md:mb-8 w-full max-w-sm">
            <div className="bg-green-50 rounded-xl p-3 md:p-4">
              <p className="text-2xl md:text-3xl font-display font-black text-green-600">{correctCount}</p>
              <p className="text-[10px] md:text-xs text-green-500 font-medium">Correct</p>
            </div>
            <div className="bg-primary-50 rounded-xl p-3 md:p-4">
              <p className="text-2xl md:text-3xl font-display font-black text-primary">{score}</p>
              <p className="text-[10px] md:text-xs text-primary-400 font-medium">XP Earned</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 md:p-4">
              <p className="text-2xl md:text-3xl font-display font-black text-blue-600">{accuracy}%</p>
              <p className="text-[10px] md:text-xs text-blue-500 font-medium">Accuracy</p>
            </div>
          </div>

          <p className="text-sm text-gray-400 mb-6">Completed in {totalTime}s</p>

          <button onClick={startGame} className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
            Play Again
          </button>
        </div>
      </GameWrapper>
    );
  }

  // Playing / Feedback Screen
  if (!currentQuestion) return null;

  const timerPercent = (timeLeft / TIME_PER_QUESTION) * 100;
  const timerColor = timeLeft <= 2 ? 'bg-red-500' : timeLeft <= 4 ? 'bg-amber-500' : 'bg-green-500';

  return (
    <GameWrapper title="Picture Quiz" progress={progress}>
      {/* Question counter */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h2 className="text-lg md:text-xl font-display font-bold text-gray-900">
          What is this?
        </h2>
        <span className="text-sm md:text-base font-display font-bold text-gray-400">
          {currentIndex + 1}/{questions.length}
        </span>
      </div>

      {/* Image */}
      <div className="relative w-full max-w-sm mx-auto mb-4 md:mb-5">
        <div className="aspect-square relative rounded-2xl overflow-hidden bg-white border-2 border-gray-100 shadow-card">
          <Image
            src={`${IMAGE_BASE_PATH}/${currentQuestion.image.filename}`}
            alt="Quiz image"
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 80vw, 384px"
            priority
          />
        </div>
      </div>

      {/* Timer Bar */}
      <div className="w-full max-w-sm mx-auto mb-5 md:mb-6">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${timerColor}`}
            style={{ width: `${timerPercent}%` }}
          />
        </div>
        <p className={`text-center text-xs font-bold mt-1 ${
          timeLeft <= 2 ? 'text-red-500' : 'text-gray-400'
        }`}>
          {timeLeft}s
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2.5 md:gap-3 max-w-sm mx-auto">
        {currentQuestion.options.map((option) => {
          let btnClass = 'bg-white border-2 border-gray-200 text-gray-800 active:scale-[0.98]';

          if (selectedAnswer !== null) {
            if (option === currentQuestion.correct) {
              btnClass = 'bg-green-50 border-2 border-green-400 text-green-700 scale-[1.02]';
            } else if (option === selectedAnswer && !isCorrectAnswer) {
              btnClass = 'bg-red-50 border-2 border-red-300 text-red-600 animate-funny-shake';
            } else {
              btnClass = 'bg-gray-50 border-2 border-gray-100 text-gray-400';
            }
          }

          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`
                w-full py-3.5 md:py-4 px-5 rounded-xl font-display font-bold text-base md:text-lg
                transition-all duration-200 cursor-pointer select-none
                disabled:cursor-default
                ${btnClass}
              `}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Feedback overlay text */}
      {phase === 'feedback' && (
        <div className="mt-4 md:mt-5 text-center animate-slide-up">
          {isCorrectAnswer ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
              <span className="text-green-600 font-display font-bold text-sm">
                ✓ Correct! +{timeLeft >= 4 ? XP_CORRECT + XP_FAST_BONUS : XP_CORRECT} XP
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
              <span className="text-orange-600 font-display font-bold text-sm">
                {selectedAnswer === '__timeout__' ? '⏱ Time\'s up!' : '✗ Not quite!'} The answer is: {currentQuestion.correct}
              </span>
            </div>
          )}
        </div>
      )}
    </GameWrapper>
  );
}
