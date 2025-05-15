import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, UserType } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  userType: UserType | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, userType: UserType) => Promise<void>;
  logout: () => void;
  setUserType: (userType: UserType) => void;
}

// Mock authentication function
const mockAuth = async (email: string, password: string): Promise<User> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, return a mock user
  return {
    id: '1',
    email,
    name: 'Karthika Suresh',
    userType: 'individual',
    profileCompleted: false,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };
};

// Mock signup function
const mockSignup = async (email: string, password: string, name: string, userType: UserType): Promise<User> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, return a mock user
  return {
    id: '1',
    email,
    name,
    userType,
    profileCompleted: false,
    profileImage: undefined,
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      userType: null,
      isLoading: false,
      
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const user = await mockAuth(email, password);
          set({ user, isAuthenticated: true, userType: user.userType, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      signup: async (email, password, name, userType) => {
        set({ isLoading: true });
        try {
          const user = await mockSignup(email, password, name, userType);
          set({ user, isAuthenticated: true, userType, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false, userType: null });
      },
      
      setUserType: (userType) => {
        set({ userType });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);