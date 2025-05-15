import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings, Edit2, LogOut, Briefcase, MapPin, GraduationCap } from 'lucide-react-native';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useAuthStore } from '@/store/auth-store';
import { useIndividualStore } from '@/store/individual-store';
import colors from '@/constants/colors';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { profile } = useIndividualStore();

  const handleLogout = () => {
    logout();
    router.replace('/user-type');
  };

  const handleEditProfile = () => {
    // Navigate to edit profile screen (not implemented in this example)
    console.log('Edit profile');
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity>
          <Settings size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <Image 
            source={
              typeof user?.profileImage === 'string'
                ? { uri: user.profileImage }
                : user?.profileImage
            }
            style={styles.profileImage} 
          />
          
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.name || 'User'}</Text>
            <Text style={styles.jobTitle}>{profile.jobTitle || 'Add your job title'}</Text>
            
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Edit2 size={16} color={colors.primary} />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>About Me</Text>
          <Text style={styles.bio}>
            {profile.bio || 'Add a bio to tell others about yourself and your professional background.'}
          </Text>
        </Card>
        
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Details</Text>
          
          <View style={styles.detailItem}>
            <Briefcase size={20} color={colors.textSecondary} />
            <Text style={styles.detailLabel}>Experience:</Text>
            <Text style={styles.detailValue}>
              {profile.experience ? `${profile.experience} years` : 'Add experience'}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <MapPin size={20} color={colors.textSecondary} />
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailValue}>
              {profile.location || 'Add location'}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <GraduationCap size={20} color={colors.textSecondary} />
            <Text style={styles.detailLabel}>Education:</Text>
            <Text style={styles.detailValue}>
              {profile.education || 'Add education'}
            </Text>
          </View>
        </Card>
        
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Skills</Text>
          
          {profile.skills && profile.skills.length > 0 ? (
            <View style={styles.skills}>
              {profile.skills.map((skill, index) => (
                <View key={index} style={styles.skill}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>Add your skills to showcase your expertise</Text>
          )}
        </Card>
        
        <Button
          title="Log Out"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
          icon={<LogOut size={18} color={colors.primary} />}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 4,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
    marginRight: 4,
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
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
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 14,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  logoutButton: {
    marginTop: 8,
    marginBottom: 24,
  },
});