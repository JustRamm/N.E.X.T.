import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Briefcase, Calendar } from 'lucide-react-native';
import Button from '@/components/Button';
import { useIndividualStore } from '@/store/individual-store';
import colors from '@/constants/colors';

export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { recommendedJobs } = useIndividualStore();
  
  // Find the job by id
  const job = recommendedJobs.find(job => job.id === id);
  
  if (!job) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Job not found</Text>
      </SafeAreaView>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleApply = () => {
    // Handle job application (not implemented in this example)
    console.log('Apply for job:', job.id);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <StatusBar style="dark" />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Image source={
            typeof job.companyLogo === 'string'
              ? { uri: job.companyLogo }
              : job.companyLogo
          } style={styles.logo} />
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.company}>{job.companyName}</Text>
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <MapPin size={18} color={colors.textSecondary} />
            <Text style={styles.detailText}>
              {job.location} {job.isRemote && '• Remote'}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Briefcase size={18} color={colors.textSecondary} />
            <Text style={styles.detailText}>{job.salary}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Calendar size={18} color={colors.textSecondary} />
            <Text style={styles.detailText}>Posted on {formatDate(job.postedDate)}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Required Skills</Text>
          <View style={styles.skills}>
            {job.skills.map((skill, index) => (
              <View key={index} style={styles.skill}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.description}>{job.description}</Text>
        </View>
        
        <Button
          title="Apply Now"
          onPress={handleApply}
          style={styles.applyButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  company: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  details: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  applyButton: {
    marginBottom: 24,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
    marginTop: 24,
  },
});