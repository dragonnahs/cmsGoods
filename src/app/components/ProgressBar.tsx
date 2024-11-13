'use client';
import { createContext } from 'react';
import { useProgress } from '@/hooks/useProgress';
type ProgressBarContext = ReturnType<typeof useProgress>;
export const ProgressBarContext = createContext<ProgressBarContext | null>(
  null,
);

export default function ProgressBar({
  children,
}: {
  children: React.ReactNode;
}) {
  const progress = useProgress();
  return (
    <ProgressBarContext.Provider value={progress}>
      {progress.state !== 'initial' && (
        <div
          className="fixed top-0 z-50 h-1 bg-gradient-to-r from-blue-500 to-blue-300 duration-300 transition-all ease-in-out"
          style={{ width: `${progress.value}%` }}
        />
      )}
      {children}
    </ProgressBarContext.Provider>
  );
}
