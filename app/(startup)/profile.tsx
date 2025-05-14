import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings, Edit2, LogOut, MapPin, Globe, Calendar, Users, Briefcase } from 'lucide-react-native';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useAuthStore } from '@/store/auth-store';
import { useStartupStore } from '@/store/startup-store';
import colors from '@/constants/colors';

const startupColor = "#E97451"; // Terracotta/coral color for startup theme

export default function StartupProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { profile } = useStartupStore();

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
        <Text style={styles.title}>Startup Profile</Text>
        <TouchableOpacity>
          <Settings size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <Image 
            source={{ 
              uri: user?.profileImage || 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80'
            }} 
            style={styles.profileImage} 
          />
          
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.name || 'Startup Name'}</Text>
            <Text style={styles.industry}>{profile.industry || 'Add your industry'}</Text>
            
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Edit2 size={16} color={startupColor} />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>About Startup</Text>
          <Text style={styles.description}>
            {profile.description || 'Add a description to tell candidates about your startup, mission, and vision.'}
          </Text>
        </Card>
        
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Details</Text>
          
          <View style={styles.detailItem}>
            <MapPin size={20} color={colors.textSecondary} />
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailValue}>
              {profile.location || 'Add location'}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Globe size={20} color={colors.textSecondary} />
            <Text style={styles.detailLabel}>Website:</Text>
            <Text style={styles.detailValue}>
              {profile.website || 'Add website'}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Calendar size={20} color={colors.textSecondary} />
            <Text style={styles.detailLabel}>Founded:</Text>
            <Text style={styles.detailValue}>
              {profile.foundedYear ? profile.foundedYear.toString() : 'Add founding year'}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Users size={20} color={colors.textSecondary} />
            <Text style={styles.detailLabel}>Team Size:</Text>
            <Text style={styles.detailValue}>
              {profile.teamSize ? profile.teamSize.toString() : 'Add team size'}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Briefcase size={20} color={colors.textSecondary} />
            <Text style={styles.detailLabel}>Funding:</Text>
            <Text style={styles.detailValue}>
              {profile.funding || 'Add funding status'}
            </Text>
          </View>
        </Card>
        
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Stage</Text>
          <Text style={styles.stage}>
            {profile.stage || 'Add your startup stage (e.g., Seed, Series A)'}
          </Text>
        </Card>
        
        <Button
          title="Log Out"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
          icon={<LogOut size={18} color={startupColor} />}
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
    borderRadius: 16,
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
  industry: {
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
    color: startupColor,
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
  description: {
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
  stage: {
    fontSize: 14,
    color: colors.text,
  },
  logoutButton: {
    marginTop: 8,
    marginBottom: 24,
  },
});