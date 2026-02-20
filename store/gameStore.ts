import { create } from 'zustand';

interface GameState {
  totalXp: number;
  currentStreak: number;
  setTotalXp: (xp: number) => void;
  addXp: (amount: number) => void;
  setCurrentStreak: (streak: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  totalXp: 0,
  currentStreak: 0,
  setTotalXp: (xp) => set({ totalXp: xp }),
  addXp: (amount) => set((state) => ({ totalXp: state.totalXp + amount })),
  setCurrentStreak: (streak) => set({ currentStreak: streak }),
  incrementStreak: () => set((state) => ({ currentStreak: state.currentStreak + 1 })),
  resetStreak: () => set({ currentStreak: 1 }),
}));
