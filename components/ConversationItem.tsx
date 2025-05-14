import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Conversation } from '@/types';
import colors from '@/constants/colors';

interface ConversationItemProps {
  conversation: Conversation;
  onPress: (conversation: Conversation) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, onPress }) => {
  // Mock user data - in a real app, you would fetch this from your API
  const otherUser = {
    id: conversation.participants.find(id => id !== '1') || '',
    name: conversation.participants.includes('2') ? 'TechCorp' : 
          conversation.participants.includes('3') ? 'InnovateSoft' : 'DataViz',
    avatar: `https://images.unsplash.com/photo-${conversation.participants.includes('2') ? '1611162617213-7d7a39e9b1d7' : 
             conversation.participants.includes('3') ? '1611162616475-46b635cb6868' : '1611162618071-b39a2ec055fb'}?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80`,
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const handlePress = () => {
    onPress(conversation);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      <Image source={{ uri: otherUser.avatar }} style={styles.avatar} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{otherUser.name}</Text>
          <Text style={styles.time}>{formatTime(conversation.lastMessage.timestamp)}</Text>
        </View>
        
        <View style={styles.messageContainer}>
          <Text 
            style={[
              styles.message, 
              conversation.unreadCount > 0 && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {conversation.lastMessage.content}
          </Text>
          
          {conversation.unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{conversation.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  time: {
    fontSize: 12,
    color: colors.textLight,
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  unreadMessage: {
    fontWeight: '500',
    color: colors.text,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  badgeText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ConversationItem;