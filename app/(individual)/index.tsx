import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileCompletionCard from '@/components/ProfileCompletionCard';
import JobCard from '../../components/JobCards';
import { useIndividualStore } from '@/store/individual-store';
import { useAuthStore } from '@/store/auth-store';
import colors from '@/constants/colors';

export default function IndividualHomeScreen() {
  const { user } = useAuthStore();
  const { recommendedJobs, fetchRecommendedJobs, isLoading, profile } = useIndividualStore();

  useEffect(() => {
    fetchRecommendedJobs();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.name}>{user?.name || 'User'}</Text>
        </View>
      </View>
      
      <FlatList
        data={recommendedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <JobCard job={item} />}
        ListHeaderComponent={
          <>
            {!user?.profileCompleted && (
              <ProfileCompletionCard percentage={profile.profileCompletionPercentage || 20} />
            )}
            
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recommended Jobs</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No jobs found</Text>
            </View>
          )
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  listContent: {
    paddingBottom: 16,
  },
  loadingContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});