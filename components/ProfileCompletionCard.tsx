import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import Card from './Card';
import colors from '@/constants/colors';

interface ProfileCompletionCardProps {
  percentage: number;
}

const ProfileCompletionCard: React.FC<ProfileCompletionCardProps> = ({ percentage }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/profile');
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${percentage}%` }]} />
      </View>
      
      <Text style={styles.description}>
        A complete profile increases your chances of getting noticed by companies.
      </Text>
      
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Complete Profile</Text>
        <ArrowRight size={18} color={colors.primary} />
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  percentage: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  progressContainer: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    marginRight: 8,
  },
});

export default ProfileCompletionCard;