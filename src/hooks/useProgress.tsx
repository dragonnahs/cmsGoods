'use client';

import { useEffect, useState } from 'react';

export const useProgress = () => {
  const [state, setState] = useState('initial');
  const [value, setValue] = useState(0);
  const start = () => {
    setState('in-progress');
  };
  const reset = () => {
    setState('initial');
    setValue(0);
  };
  const done = () => {
    setState('complete');
  };
  useEffect(() => {
    const interval = setInterval(
      () => {
        if (state === 'in-progress') {
          if (value >= 60 && value < 80) {
            setValue(value + 2);
          } else if (value >= 80 && value < 95) {
            setValue(value + 0.5);
          } else if (value >= 95) {
            setValue(95);
          } else {
            setValue(value + 5);
          }
        } else if (state === 'complete') {
          setValue(100);
        }
      },
      state === 'in-progress' ? 600 : 0,
    );
    return () => clearInterval(interval);
  }, [value, state]);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (value === 100) {
      t = setTimeout(() => {
        reset();
      }, 300);
    }
    return () => clearTimeout(t);
  }, [value]);
  return {
    state,
    value,
    start,
    done,
    reset,
  };
};
