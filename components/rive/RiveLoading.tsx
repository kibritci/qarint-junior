'use client';

import { useRive } from '@rive-app/react-canvas';

const SRC = '/rive/logo-loading.riv';

export default function RiveLoading() {
  const { rive, RiveComponent } = useRive(
    { src: SRC },
    { shouldResizeCanvasToContainer: true }
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full">
      <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
        {rive ? (
          <RiveComponent className="w-full h-full" style={{ width: '100%', height: '100%' }} />
        ) : (
          <span className="text-4xl md:text-5xl animate-pulse" aria-hidden>✨</span>
        )}
      </div>
    </div>
  );
}
