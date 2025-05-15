import { create } from 'zustand';
import { Company, Candidate } from '@/types';

interface CompanyState {
  profile: Partial<Company>;
  candidates: Candidate[];
  likedCandidates: string[];
  rejectedCandidates: string[];
  isLoading: boolean;
  updateProfile: (profile: Partial<Company>) => void;
  fetchCandidates: () => Promise<void>;
  likeCandidate: (candidateId: string) => void;
  rejectCandidate: (candidateId: string) => void;
}

// Mock candidates data
const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Vysak Krishna',
    profileImage: require('@/assets/images/jobSeeker/1.jpg'),
    jobTitle: 'Senior Frontend Developer',
    experience: 5,
    skills: ['React', 'TypeScript', 'CSS', 'HTML'],
    bio: 'Passionate frontend developer with 5 years of experience building responsive web applications.',
    location: 'San Francisco, CA',
  },
  {
    id: '2',
    name: 'Abiram T Bijoy',
    profileImage: require('@/assets/images/jobSeeker/2.jpg'),
    jobTitle: 'Backend Engineer',
    experience: 3,
    skills: ['Node.js', 'Express', 'MongoDB', 'AWS'],
    bio: 'Backend developer specializing in building scalable APIs and microservices.',
    location: 'Seattle, WA',
  },
  {
    id: '3',
    name: 'Trisha Gautam ',
    profileImage: require('@/assets/images/jobSeeker/3.jpg'),
    jobTitle: 'UX/UI Designer',
    experience: 4,
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    bio: 'Designer focused on creating intuitive and beautiful user experiences.',
    location: 'New York, NY',
  },
  {
    id: '4',
    name: 'GopiKrishna',
    profileImage: require('@/assets/images/jobSeeker/2.jpg'),
    jobTitle: 'Full Stack Developer',
    experience: 6,
    skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    bio: 'Full stack developer with experience in building complex web applications from start to finish.',
    location: 'Austin, TX',
  },
];

export const useCompanyStore = create<CompanyState>((set) => ({
  profile: {
    userType: 'company',
    industry: '',
    size: '',
    description: '',
    location: '',
    website: '',
    foundedYear: 0,
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