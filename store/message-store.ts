import { create } from 'zustand';
import { Message, Conversation } from '@/types';

interface MessageState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (content: string, receiverId: string) => Promise<void>;
  setCurrentConversation: (conversation: Conversation) => void;
}

// Mock conversations
const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: ['1', '2'],
    lastMessage: {
      id: '101',
      senderId: '2',
      receiverId: '1',
      content: "Hi there! I saw your profile and I'm interested in discussing a potential opportunity.",
      timestamp: '2023-11-10T14:30:00Z',
      read: true,
    },
    unreadCount: 0,
  },
  {
    id: '2',
    participants: ['1', '3'],
    lastMessage: {
      id: '201',
      senderId: '3',
      receiverId: '1',
      content: "Thanks for connecting! When would be a good time to schedule a call?",
      timestamp: '2023-11-12T09:15:00Z',
      read: false,
    },
    unreadCount: 1,
  },
  {
    id: '3',
    participants: ['1', '4'],
    lastMessage: {
      id: '301',
      senderId: '1',
      receiverId: '4',
      content: "I'm interested in learning more about the position. Could you share the job description?",
      timestamp: '2023-11-13T16:45:00Z',
      read: true,
    },
    unreadCount: 0,
  },
];

// Mock messages for conversation 1
const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '101',
      senderId: '2',
      receiverId: '1',
      content: "Hi there! I saw your profile and I'm interested in discussing a potential opportunity.",
      timestamp: '2023-11-10T14:30:00Z',
      read: true,
    },
    {
      id: '102',
      senderId: '1',
      receiverId: '2',
      content: "Hello! I'd be happy to discuss. What kind of opportunity are you looking for?",
      timestamp: '2023-11-10T14:35:00Z',
      read: true,
    },
    {
      id: '103',
      senderId: '2',
      receiverId: '1',
      content: "We're looking for a senior developer to join our team. Your experience seems like a great fit.",
      timestamp: '2023-11-10T14:40:00Z',
      read: true,
    },
  ],
  '2': [
    {
      id: '201',
      senderId: '3',
      receiverId: '1',
      content: "Thanks for connecting! When would be a good time to schedule a call?",
      timestamp: '2023-11-12T09:15:00Z',
      read: false,
    },
  ],
  '3': [
    {
      id: '301',
      senderId: '1',
      receiverId: '4',
      content: "I'm interested in learning more about the position. Could you share the job description?",
      timestamp: '2023-11-13T16:45:00Z',
      read: true,
    },
    {
      id: '302',
      senderId: '4',
      receiverId: '1',
      content: "Of course! I'll send it over shortly.",
      timestamp: '2023-11-13T16:50:00Z',
      read: true,
    },
  ],
};

export const useMessageStore = create<MessageState>((set) => ({
  conversations: [],
  currentConversation: null,
  messages: [],
  isLoading: false,
  
  fetchConversations: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ conversations: mockConversations, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Error fetching conversations:', error);
    }
  },
  
  fetchMessages: async (conversationId) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const messages = mockMessages[conversationId] || [];
      set({ messages, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Error fetching messages:', error);
    }
  },
  
  sendMessage: async (content, receiverId) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newMessage: Message = {
        id: Math.random().toString(36).substring(2, 9),
        senderId: '1', // Assuming current user id is '1'
        receiverId,
        content,
        timestamp: new Date().toISOString(),
        read: false,
      };
      
      set((state) => {
        // Update messages
        const updatedMessages = [...state.messages, newMessage];
        
        // Find or create conversation
        let conversationId = '';
        const existingConversation = state.conversations.find(
          (c) => c.participants.includes(receiverId)
        );
        
        if (existingConversation) {
          conversationId = existingConversation.id;
        } else {
          conversationId = Math.random().toString(36).substring(2, 9);
        }
        
        // Update conversations
        const updatedConversations = existingConversation
          ? state.conversations.map((c) =>
              c.id === existingConversation.id
                ? { ...c, lastMessage: newMessage, unreadCount: 0 }
                : c
            )
          : [
              ...state.conversations,
              {
                id: conversationId,
                participants: ['1', receiverId],
                lastMessage: newMessage,
                unreadCount: 0,
              },
            ];
        
        return {
          messages: updatedMessages,
          conversations: updatedConversations,
          isLoading: false,
        };
      });
    } catch (error) {
      set({ isLoading: false });
      console.error('Error sending message:', error);
    }
  },
  
  setCurrentConversation: (conversation) => {
    set({ currentConversation: conversation });
  },
}));