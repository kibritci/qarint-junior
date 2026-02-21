'use client';

import Link from 'next/link';
import { useRive } from '@rive-app/react-canvas';

const SRC = '/rive/404-sad.riv';
const STATE_MACHINE = 'State Machine 1';

export default function Rive404() {
  const { rive, RiveComponent } = useRive(
    { src: SRC, stateMachines: STATE_MACHINE },
    { shouldResizeCanvasToContainer: true }
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      <div className="w-48 h-48 md:w-56 md:h-56 mb-6 flex items-center justify-center">
        {rive ? (
          <RiveComponent className="w-full h-full" style={{ width: '100%', height: '100%' }} />
        ) : (
          <span className="text-7xl md:text-8xl">😢</span>
        )}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-sm">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-600 dark:hover:bg-primary-400 transition-colors font-semibold"
      >
        Go Home
      </Link>
    </div>
  );
}
