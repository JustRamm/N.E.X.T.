import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConversationItem from '@/components/ConversationItem';
import { useMessageStore } from '@/store/message-store';
import colors from '@/constants/colors';

const startupColor = "#E97451"; // Terracotta/coral color for startup theme

export default function StartupMessagesScreen() {
  const router = useRouter();
  const { conversations, fetchConversations, isLoading, setCurrentConversation } = useMessageStore();

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleConversationPress = (conversation: any) => {
    setCurrentConversation(conversation);
    router.push({
      pathname: "/modal",
      params: { id: conversation.id }
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={startupColor} />
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ConversationItem 
              conversation={item} 
              onPress={handleConversationPress} 
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No conversations yet</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 64,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});