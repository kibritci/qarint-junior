'use client';

import { useState } from 'react';
import { useRive } from '@rive-app/react-canvas';
import Skeleton from '@/components/ui/Skeleton';

const SRC = '/rive/logo-loading.riv';

export default function RiveLoading() {
  const [loaded, setLoaded] = useState(false);
  const { RiveComponent } = useRive(
    { src: SRC, autoplay: true, onLoad: () => setLoaded(true) },
    { shouldResizeCanvasToContainer: true }
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full">
      <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-2xl overflow-hidden">
        <RiveComponent
          className="w-full h-full"
          style={{ width: '100%', height: '100%', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
        />
        {!loaded && (
          <Skeleton className="absolute inset-0 rounded-2xl" aria-hidden />
        )}
      </div>
    </div>
  );
}
