import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Briefcase } from 'lucide-react-native';
import Card from './Card';
import { Job } from '@/types';
import colors from '@/constants/colors';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/job-details',
      params: { id: job.id },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Image source={
            typeof job.companyLogo === 'string'
              ? { uri: job.companyLogo }
              : job.companyLogo
          } style={styles.logo} />
          <View style={styles.headerText}>
            <Text style={styles.title}>{job.title}</Text>
            <Text style={styles.company}>{job.companyName}</Text>
          </View>
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <MapPin size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>
              {job.location} {job.isRemote && '• Remote'}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Briefcase size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{job.salary}</Text>
          </View>
        </View>
        
        <View style={styles.skills}>
          {job.skills.slice(0, 3).map((skill, index) => (
            <View key={index} style={styles.skill}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
          {job.skills.length > 3 && (
            <View style={styles.skill}>
              <Text style={styles.skillText}>+{job.skills.length - 3}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.date}>Posted on {formatDate(job.postedDate)}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  details: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
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
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  date: {
    fontSize: 12,
    color: colors.textLight,
  },
});

export default JobCard;