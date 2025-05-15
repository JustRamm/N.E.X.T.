import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MapPin, Briefcase, Award } from 'lucide-react-native';
import Card from './Card';
import { Candidate } from '@/types';
import colors from '@/constants/colors';

interface CandidateCardProps {
  candidate: Candidate;
  onPress?: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onPress }) => {
  const CardComponent = onPress ? TouchableOpacity : View;
  const cardProps = onPress ? { onPress, activeOpacity: 0.9 } : {};

  return (
    <CardComponent {...cardProps}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Image source={
            typeof candidate.profileImage === 'string'
              ? { uri: candidate.profileImage }
              : candidate.profileImage
          } style={styles.profileImage} />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{candidate.name}</Text>
            <Text style={styles.title}>{candidate.jobTitle}</Text>
          </View>
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <MapPin size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{candidate.location}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Briefcase size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>{candidate.experience} years experience</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Award size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>Top skills</Text>
          </View>
        </View>
        
        <Text style={styles.bio}>{candidate.bio}</Text>
        
        <View style={styles.skills}>
          {candidate.skills.map((skill, index) => (
            <View key={index} style={styles.skill}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </Card>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    alignSelf: 'center',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  details: {
    marginBottom: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  bio: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    backgroundColor: `${colors.primary}15`,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
  },
});

export default CandidateCard;