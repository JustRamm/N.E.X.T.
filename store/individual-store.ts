import { create } from 'zustand';
import { Individual, Job } from '@/types';

interface IndividualState {
  profile: Partial<Individual>;
  recommendedJobs: Job[];
  isLoading: boolean;
  updateProfile: (profile: Partial<Individual>) => void;
  fetchRecommendedJobs: () => Promise<void>;
}

// Mock jobs data
const mockJobs: Job[] = [
  {
    id: '1',
    companyId: '1',
    companyName: 'TechCorp',
    companyLogo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
    title: 'Senior React Native Developer',
    description: 'We are looking for an experienced React Native developer to join our mobile team.',
    location: 'San Francisco, CA',
    salary: '$120,000 - $150,000',
    skills: ['React Native', 'TypeScript', 'Redux', 'Mobile Development'],
    postedDate: '2023-10-15',
    isRemote: true,
  },
  {
    id: '2',
    companyId: '2',
    companyName: 'InnovateSoft',
    companyLogo: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
    title: 'UX/UI Designer',
    description: 'Join our design team to create beautiful and intuitive user experiences.',
    location: 'New York, NY',
    salary: '$90,000 - $120,000',
    skills: ['Figma', 'UI Design', 'User Research', 'Prototyping'],
    postedDate: '2023-10-18',
    isRemote: false,
  },
  {
    id: '3',
    companyId: '3',
    companyName: 'DataViz',
    companyLogo: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
    title: 'Data Scientist',
    description: 'Looking for a data scientist to help us analyze and visualize complex datasets.',
    location: 'Austin, TX',
    salary: '$110,000 - $140,000',
    skills: ['Python', 'Machine Learning', 'Data Visualization', 'SQL'],
    postedDate: '2023-10-20',
    isRemote: true,
  },
  {
    id: '4',
    companyId: '4',
    companyName: 'CloudNative',
    companyLogo: 'https://images.unsplash.com/photo-1611162616305-c69b3396f6b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
    title: 'DevOps Engineer',
    description: 'Join our infrastructure team to build and maintain our cloud-based systems.',
    location: 'Seattle, WA',
    salary: '$130,000 - $160,000',
    skills: ['AWS', 'Kubernetes', 'Docker', 'CI/CD'],
    postedDate: '2023-10-22',
    isRemote: true,
  },
];

export const useIndividualStore = create<IndividualState>((set) => ({
  profile: {
    userType: 'individual',
    skills: [],
    experience: 0,
    bio: '',
    location: '',
    education: '',
    jobTitle: '',
    profileCompletionPercentage: 0,
  },
  recommendedJobs: [],
  isLoading: false,
  
  updateProfile: (profile) => {
    set((state) => ({
      profile: {
        ...state.profile,
        ...profile,
      },
    }));
  },
  
  fetchRecommendedJobs: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ recommendedJobs: mockJobs, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Error fetching recommended jobs:', error);
    }
  },
}));