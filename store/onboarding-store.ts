import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface OnboardingState {
  hasSeenOnboarding: boolean;
  hasSeenSplash: boolean;
  markOnboardingComplete: () => void;
  markSplashComplete: () => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasSeenOnboarding: false,
      hasSeenSplash: false,
      
      markOnboardingComplete: () => {
        set({ hasSeenOnboarding: true });
      },
      
      markSplashComplete: () => {
        set({ hasSeenSplash: true });
      },
      
      resetOnboarding: () => {
        set({ hasSeenOnboarding: false, hasSeenSplash: false });
      },
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);