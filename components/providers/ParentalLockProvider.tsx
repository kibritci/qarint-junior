'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { verifyParentalUnlock } from '@/actions/gamification';

const STORAGE_KEY = 'qarint_parent_lock';

type ParentalLockContextValue = {
  lockEnabled: boolean;
  setLockEnabled: (value: boolean) => void;
  requestUnlock: (birthDate: string) => Promise<{ success: boolean; error?: string }>;
  parentBirthDate: string | null;
};

const ParentalLockContext = createContext<ParentalLockContextValue | null>(null);

function readStored(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function ParentalLockProvider({
  children,
  storedParentBirthDate,
}: {
  children: React.ReactNode;
  storedParentBirthDate: string | null;
}) {
  const [lockEnabled, setLockState] = useState(false);
  const [parentBirthDate] = useState<string | null>(storedParentBirthDate);

  useEffect(() => {
    setLockState(readStored());
  }, []);

  const setLockEnabled = useCallback((value: boolean) => {
    if (typeof window !== 'undefined') {
      if (value) sessionStorage.setItem(STORAGE_KEY, '1');
      else sessionStorage.removeItem(STORAGE_KEY);
    }
    setLockState(value);
  }, []);

  const requestUnlock = useCallback(
    async (birthDate: string): Promise<{ success: boolean; error?: string }> => {
      const normalized = birthDate.trim();
      if (!normalized) return { success: false, error: 'required' };

      const result = await verifyParentalUnlock(normalized);
      if (result.success) {
        setLockEnabled(false);
        return { success: true };
      }
      return { success: false, error: 'mismatch' };
    },
    [setLockEnabled]
  );

  const value: ParentalLockContextValue = {
    lockEnabled,
    setLockEnabled,
    requestUnlock,
    parentBirthDate,
  };

  return (
    <ParentalLockContext.Provider value={value}>
      {children}
    </ParentalLockContext.Provider>
  );
}

export function useParentalLock(): ParentalLockContextValue {
  const ctx = useContext(ParentalLockContext);
  if (!ctx) {
    return {
      lockEnabled: false,
      setLockEnabled: () => {},
      requestUnlock: async () => ({ success: false }),
      parentBirthDate: null,
    };
  }
  return ctx;
}
