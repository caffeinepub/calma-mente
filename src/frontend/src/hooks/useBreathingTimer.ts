import { useState, useEffect, useRef } from 'react';

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale';

export function useBreathingTimer() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const cycleCountRef = useRef(0);

  const INHALE_DURATION = 4000;
  const HOLD_DURATION = 4000;
  const EXHALE_DURATION = 4000;

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const runCycle = () => {
      setPhase('inhale');
      
      timerRef.current = setTimeout(() => {
        setPhase('hold');
        
        timerRef.current = setTimeout(() => {
          setPhase('exhale');
          
          timerRef.current = setTimeout(() => {
            cycleCountRef.current += 1;
            if (isActive) {
              runCycle();
            }
          }, EXHALE_DURATION);
        }, HOLD_DURATION);
      }, INHALE_DURATION);
    };

    runCycle();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isActive]);

  const start = () => {
    setIsActive(true);
  };

  const pause = () => {
    setIsActive(false);
    setPhase('idle');
  };

  const reset = () => {
    setIsActive(false);
    setPhase('idle');
    cycleCountRef.current = 0;
  };

  return {
    phase,
    isActive,
    start,
    pause,
    reset,
    cycleCount: cycleCountRef.current
  };
}
