'use client';

import Link from 'next/link';
import { ArrowLeftIcon, HeartIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface GameWrapperProps {
  title: string;
  children: React.ReactNode;
  progress?: number;
  lives?: number;
  maxLives?: number;
  onExit?: () => void;
}

export default function GameWrapper({
  title,
  children,
  progress = 0,
  lives,
  maxLives = 3,
}: GameWrapperProps) {
  return (
    <div className="min-h-[calc(100vh-57px)] flex flex-col">
      {/* Game Header */}
      <div className="sticky top-[57px] z-40 bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link
            href="/games"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400" />
          </Link>

          {/* Progress Bar */}
          <div className="flex-1">
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          </div>

          {/* Lives */}
          {lives !== undefined && (
            <div className="flex items-center gap-1">
              {Array.from({ length: maxLives }).map((_, i) => (
                <HeartIcon
                  key={i}
                  className={`w-5 h-5 transition-all duration-300 ${
                    i < lives ? 'text-red-500' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Game Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
