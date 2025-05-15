import { create } from 'zustand';
import { Startup, Candidate } from '@/types';

interface StartupState {
  profile: Partial<Startup>;
  candidates: Candidate[];
  likedCandidates: string[];
  rejectedCandidates: string[];
  isLoading: boolean;
  updateProfile: (profile: Partial<Startup>) => void;
  fetchCandidates: () => Promise<void>;
  likeCandidate: (candidateId: string) => void;
  rejectCandidate: (candidateId: string) => void;
}

// Mock candidates data - focused on early-stage startup needs
const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    profileImage: require('@/assets/images/jobSeeker/1.jpg'),
    jobTitle: 'Full Stack Developer',
    experience: 4,
    skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Startup Experience'],
    bio: 'Passionate developer with experience in early-stage startups. Looking to join a mission-driven team where I can wear multiple hats and make a significant impact.',
    location: 'San Francisco, CA',
  },
  {
    id: '2',
    name: 'Jamie Lee',
    profileImage: require('@/assets/images/jobSeeker/1.jpg'),
    jobTitle: 'Product Designer',
    experience: 3,
    skills: ['UI/UX', 'Figma', 'User Research', 'Prototyping', 'Growth Design'],
    bio: 'Designer who loves creating intuitive experiences for complex problems. Previously worked at two YC startups from seed to Series A.',
    location: 'New York, NY',
  },
  {
    id: '3',
    name: 'Taylor Kim',
    profileImage: require('@/assets/images/jobSeeker/1.jpg'),
    jobTitle: 'Growth Marketer',
    experience: 5,
    skills: ['SEO', 'Content Marketing', 'Analytics', 'Social Media', 'Email Campaigns'],
    bio: 'Growth specialist with a track record of scaling startups from zero to thousands of users. Data-driven approach with creative execution.',
    location: 'Austin, TX',
  },
  {
    id: '4',
    name: 'Jordan Rivera',
    profileImage: require('@/assets/images/jobSeeker/1.jpg'),
    jobTitle: 'Technical Co-Founder',
    experience: 7,
    skills: ['System Architecture', 'Team Leadership', 'Python', 'Machine Learning', 'Fundraising'],
    bio: 'Experienced technical leader looking to join an early-stage startup as a co-founder or CTO. Strong background in building scalable systems and leading engineering teams.',
    location: 'Boston, MA',
  },
];

export const useStartupStore = create<StartupState>((set) => ({
  profile: {
    userType: 'startup',
    industry: '',
    stage: '',
    description: '',
    location: '',
    website: '',
    foundedYear: 0,
    teamSize: 0,
    funding: '',
  },
  candidates: [],
  likedCandidates: [],
  rejectedCandidates: [],
  isLoading: false,
  
  updateProfile: (profile) => {
    set((state) => ({
      profile: {
        ...state.profile,
        ...profile,
      },
    }));
  },
  
  fetchCandidates: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ candidates: mockCandidates, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Error fetching candidates:', error);
    }
  },
  
  likeCandidate: (candidateId) => {
    set((state) => ({
      likedCandidates: [...state.likedCandidates, candidateId],
      candidates: state.candidates.filter(candidate => candidate.id !== candidateId),
    }));
  },
  
  rejectCandidate: (candidateId) => {
    set((state) => ({
      rejectedCandidates: [...state.rejectedCandidates, candidateId],
      candidates: state.candidates.filter(candidate => candidate.id !== candidateId),
    }));
  },
}));