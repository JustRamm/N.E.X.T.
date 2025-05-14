import { create } from 'zustand';
import { CalendarEvent } from '@/types';

interface CalendarState {
  events: CalendarEvent[];
  isLoading: boolean;
  fetchEvents: () => Promise<void>;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => Promise<void>;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

// Mock calendar events
const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Interview with TechCorp',
    description: 'First round interview for the Senior React Native Developer position',
    date: '2023-11-15',
    startTime: '10:00',
    endTime: '11:00',
    participants: ['1', '2'],
    isOnline: true,
    meetingLink: 'https://zoom.us/j/123456789',
  },
  {
    id: '2',
    title: 'Coffee Chat with InnovateSoft',
    description: 'Informal discussion about potential opportunities',
    date: '2023-11-17',
    startTime: '14:00',
    endTime: '15:00',
    participants: ['1', '3'],
    location: 'Starbucks, 123 Main St',
    isOnline: false,
  },
  {
    id: '3',
    title: 'Technical Assessment',
    description: 'Coding challenge for DataViz position',
    date: '2023-11-20',
    startTime: '13:00',
    endTime: '15:00',
    participants: ['1', '4'],
    isOnline: true,
    meetingLink: 'https://meet.google.com/abc-defg-hij',
  },
];

export const useCalendarStore = create<CalendarState>((set, get) => ({
  events: [],
  isLoading: false,
  
  fetchEvents: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ events: mockEvents, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Error fetching events:', error);
    }
  },
  
  addEvent: async (event) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newEvent = {
        ...event,
        id: Math.random().toString(36).substring(2, 9),
      };
      set((state) => ({
        events: [...state.events, newEvent as CalendarEvent],
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error('Error adding event:', error);
    }
  },
  
  updateEvent: async (id, event) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set((state) => ({
        events: state.events.map((e) => (e.id === id ? { ...e, ...event } : e)),
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error('Error updating event:', error);
    }
  },
  
  deleteEvent: async (id) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set((state) => ({
        events: state.events.filter((e) => e.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error('Error deleting event:', error);
    }
  },
}));