import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings, Edit2, LogOut, MapPin, Globe, Calendar } from 'lucide-react-native';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useAuthStore } from '@/store/auth-store';
import { useCompanyStore } from '@/store/company-store';
import colors from '@/constants/colors';

export default function CompanyProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { profile } = useCompanyStore();

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
        <Text style={styles.title}>Company Profile</Text>
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
            <Text style={styles.name}>{user?.name || 'Company Name'}</Text>
            <Text style={styles.industry}>{profile.industry || 'Add your industry'}</Text>
            
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Edit2 size={16} color={colors.secondary} />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>About Company</Text>
          <Text style={styles.description}>
            {profile.description || 'Add a description to tell candidates about your company and culture.'}
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
        </Card>
        
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Team Size</Text>
          <Text style={styles.size}>
            {profile.size || 'Add team size'}
          </Text>
        </Card>
        
        <Button
          title="Log Out"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
          icon={<LogOut size={18} color={colors.secondary} />}
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
    color: colors.secondary,
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
  size: {
    fontSize: 14,
    color: colors.text,
  },
  logoutButton: {
    marginTop: 8,
    marginBottom: 24,
  },
});