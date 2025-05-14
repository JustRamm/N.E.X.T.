export type UserType = 'individual' | 'company' | 'startup';

export interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  profileCompleted: boolean;
  profileImage?: string;
}

export interface Individual extends User {
  userType: 'individual';
  skills: string[];
  experience: number;
  bio: string;
  location: string;
  education: string;
  jobTitle: string;
  profileCompletionPercentage: number;
}

export interface Company extends User {
  userType: 'company';
  industry: string;
  size: string;
  description: string;
  location: string;
  website: string;
  foundedYear: number;
}

export interface Startup extends User {
  userType: 'startup';
  industry: string;
  stage: string; // e.g., "Seed", "Series A", "Growth"
  description: string;
  location: string;
  website: string;
  foundedYear: number;
  teamSize: number;
  funding: string;
}

export interface Job {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  skills: string[];
  postedDate: string;
  isRemote: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  profileImage: string;
  jobTitle: string;
  experience: number;
  skills: string[];
  bio: string;
  location: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: string[];
  location?: string;
  isOnline: boolean;
  meetingLink?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
}