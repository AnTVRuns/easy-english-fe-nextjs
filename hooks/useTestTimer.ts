'use client';

import { useEffect, useState, useCallback } from 'react';

interface UseTestTimerOptions {
  onTimeUp?: () => void;
  onLowTime?: () => void;
  autoSubmit?: boolean;
}

export function useTestTimer(totalTimeMs: number, options?: UseTestTimerOptions) {
  const [timeRemaining, setTimeRemaining] = useState(totalTimeMs);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeTimer = useCallback(() => {
    setIsPaused(false);
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeRemaining(totalTimeMs);
    setIsTimeUp(false);
    setIsRunning(false);
    setIsPaused(false);
  }, [totalTimeMs]);

  // Timer effect
  useEffect(() => {
    if (!isRunning || isPaused) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        const next = Math.max(prev - 1000, 0);

        // Check for time up
        if (next === 0) {
          setIsTimeUp(true);
          setIsRunning(false);
          options?.onTimeUp?.();
          if (options?.autoSubmit) {
            // Trigger auto-submit
          }
          clearInterval(interval);
        }

        // Check for low time (5 minutes)
        if (next === 5 * 60 * 1000) {
          options?.onLowTime?.();
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPaused, options]);

  return {
    timeRemaining,
    isTimeUp,
    isRunning,
    isPaused,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    resetTimer,
  };
}
