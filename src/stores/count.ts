import { create } from 'zustand'

interface CountState {
  count: number
}

export const useCountStore = create<CountState>(set => ({
  count: 0,
  increasePopulation: () => set(state => ({ count: state.count + 1 })),
  removeAllCounts: () => set({ count: 0 }),
}))
