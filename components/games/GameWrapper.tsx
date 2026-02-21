'use client';

import Link from 'next/link';
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface GameWrapperProps {
  title: string;
  children: React.ReactNode;
  progress?: number;
  lives?: number;
  maxLives?: number;
  onExit?: () => void;
  /** Optional content to show in the sticky header (e.g. moves, score). */
  headerTrailing?: React.ReactNode;
}

export default function GameWrapper({
  title,
  children,
  progress = 0,
  lives,
  maxLives = 3,
  headerTrailing,
}: GameWrapperProps) {
  return (
    <div className="min-h-screen md:min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Game Header - sticky with title and progress */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 md:px-6 py-2.5 md:py-3 safe-area-top">
        <div className="max-w-4xl mx-auto flex items-center gap-3 md:gap-4">
          <Link
            href="/games"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400" />
          </Link>

          <div className="flex-1 min-w-0">
            <p className="text-sm md:text-base font-display font-bold text-gray-900 dark:text-gray-100 truncate mb-1">
              {title}
            </p>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          </div>

          {headerTrailing != null ? (
            <div className="flex-shrink-0">{headerTrailing}</div>
          ) : lives !== undefined ? (
            <div className="flex items-center gap-1 flex-shrink-0">
              {Array.from({ length: maxLives }).map((_, i) => (
                <HeartIcon
                  key={i}
                  className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${
                    i < lives ? 'text-red-500' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Game Content */}
      <div className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
