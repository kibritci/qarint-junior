'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar } from '@/components/ui';
import confetti from 'canvas-confetti';
import { useGameStore } from '@/store/gameStore';

const AVATARS = [
  { emoji: '🦁', label: 'Lion' },
  { emoji: '🚀', label: 'Astronaut' },
  { emoji: '🤖', label: 'Robot' },
  { emoji: '🦊', label: 'Fox' },
  { emoji: '🐱', label: 'Cat' },
  { emoji: '🦋', label: 'Butterfly' },
  { emoji: '🐻', label: 'Bear' },
  { emoji: '🦉', label: 'Owl' },
  { emoji: '🐬', label: 'Dolphin' },
  { emoji: '🦄', label: 'Unicorn' },
  { emoji: '🌟', label: 'Star' },
  { emoji: '🎈', label: 'Balloon' },
];

function speakText(text: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }
}

export default function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const router = useRouter();
  const { addXp, incrementStreak } = useGameStore();

  const handleStart = () => {
    speakText('Welcome to Qarint Junior! Let\'s learn English together!');
    setStep(1);
  };

  const handleAvatarSelect = (emoji: string) => {
    setSelectedAvatar(emoji);
    speakText('Great choice!');
  };

  const handleAvatarConfirm = () => {
    if (!selectedAvatar) return;
    setStep(2);
    speakText('Now let me show you how to play!');
  };

  const handleTutorialDone = () => {
    setStep(3);
    addXp(10);
    incrementStreak();
    confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
    speakText('Congratulations! You earned your first points!');
  };

  const handleFinish = () => {
    router.push('/games');
  };

  // Step 0: Welcome
  if (step === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-8 animate-slide-up">
        <div className="text-8xl mb-6 animate-bounce-in">🎉</div>
        <h1 className="text-4xl font-display font-black text-gray-900 mb-3">
          Welcome to<br />
          <span className="text-primary">Qarint Junior!</span>
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-md">
          Learn English through fun games, earn points, and become a champion!
        </p>
        <button onClick={handleStart} className="btn-primary text-lg px-10 py-4 animate-pulse-glow">
          Let&apos;s Go!
        </button>
      </div>
    );
  }

  // Step 1: Avatar Selection
  if (step === 1) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 animate-slide-up">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Choose Your Avatar</h2>
        <p className="text-gray-500 mb-8">Pick a character that represents you!</p>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {AVATARS.map((avatar, i) => (
            <div
              key={avatar.emoji}
              className="flex flex-col items-center gap-1 animate-pop-in"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
            >
              <Avatar
                emoji={avatar.emoji}
                size="xl"
                selected={selectedAvatar === avatar.emoji}
                onClick={() => handleAvatarSelect(avatar.emoji)}
              />
              <span className="text-xs text-gray-400">{avatar.label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleAvatarConfirm}
          disabled={!selectedAvatar}
          className="btn-primary text-lg px-10 py-4 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    );
  }

  // Step 2: Tutorial
  if (step === 2) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 animate-slide-up">
        <div className="text-6xl mb-6">{selectedAvatar}</div>
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">How to Play</h2>
        <p className="text-gray-500 mb-8 max-w-md text-center">
          Tap on &quot;Games&quot; to find fun mini-games. Match words, build sentences, and earn XP!
        </p>

        <div className="w-full max-w-md space-y-4 mb-8">
          {[
            { icon: '🧩', title: 'Memory Match', desc: 'Match English words with pictures' },
            { icon: '🎯', title: 'Splat Word Hunt', desc: 'Pop the correct word bubbles' },
            { icon: '✍️', title: 'Sentence Builder', desc: 'Put words in the right order' },
          ].map((game, i) => (
            <div
              key={game.title}
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-card animate-slide-up"
              style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}
            >
              <div className="text-2xl">{game.icon}</div>
              <div>
                <p className="font-display font-bold text-gray-900">{game.title}</p>
                <p className="text-sm text-gray-400">{game.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Animated hand pointer */}
        <div className="relative mb-6">
          <div className="w-48 h-14 bg-primary-50 rounded-xl border-2 border-primary-200 flex items-center justify-center">
            <span className="font-display font-bold text-primary">Games</span>
          </div>
          <div className="absolute -bottom-4 right-4 text-2xl animate-bounce">👆</div>
        </div>

        <button onClick={handleTutorialDone} className="btn-primary text-lg px-10 py-4">
          I Got It!
        </button>
      </div>
    );
  }

  // Step 3: First Achievement
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 animate-bounce-in">
      <div className="text-8xl mb-4">🏆</div>
      <h2 className="text-3xl font-display font-black text-gray-900 mb-2">First Achievement!</h2>
      <p className="text-gray-500 mb-6">You earned your first rewards!</p>

      <div className="flex items-center gap-6 mb-8">
        <div className="flex flex-col items-center p-4 bg-orange-50 rounded-xl border border-orange-200 animate-pop-in">
          <span className="text-3xl mb-1">🔥</span>
          <span className="text-2xl font-display font-black text-orange-600">+10</span>
          <span className="text-xs text-orange-500 font-semibold">XP Earned</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl border border-blue-200 animate-pop-in" style={{ animationDelay: '200ms' }}>
          <span className="text-3xl mb-1">⚡</span>
          <span className="text-2xl font-display font-black text-blue-600">1</span>
          <span className="text-xs text-blue-500 font-semibold">Day Streak</span>
        </div>
      </div>

      <button onClick={handleFinish} className="btn-primary text-lg px-10 py-4">
        Start Playing!
      </button>
    </div>
  );
}
