import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserRound, Building2, Rocket, ArrowRight } from 'lucide-react-native';
import LogoIcon from '@/components/LogoIcon';
import { useAuthStore } from '@/store/auth-store';
import colors from '@/constants/colors';

export default function UserTypeScreen() {
  const router = useRouter();
  const { setUserType, isAuthenticated } = useAuthStore();

  const handleIndividual = () => {
    setUserType('individual');
    if (isAuthenticated) {
      router.replace('/(individual)');
    } else {
      router.push('/signup');
    }
  };

  const handleCompany = () => {
    setUserType('company');
    if (isAuthenticated) {
      router.replace('/(company)');
    } else {
      router.push('/signup');
    }
  };

  const handleStartup = () => {
    setUserType('startup');
    if (isAuthenticated) {
      router.replace('/(startup)');
    } else {
      router.push('/signup');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <LogoIcon size={60} />
          <Text style={styles.logoText}>N.E.X.T</Text>
        </View>
        
        <View style={styles.header}>
          <Text style={styles.title}>I am a...</Text>
          <Text style={styles.subtitle}>Select your role to get started</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.option} 
          onPress={handleIndividual}
          activeOpacity={0.9}
        >
          <View style={styles.optionContent}>
            <View style={[styles.iconContainer, styles.individualIconContainer]}>
              <UserRound size={32} color={colors.primary} />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Job Seeker</Text>
              <Text style={styles.optionDescription}>
                Looking for job opportunities and connections
              </Text>
            </View>
            <ArrowRight size={20} color={colors.primary} />
          </View>
          
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>You'll be able to:</Text>
            <View style={styles.featureItem}>
              <View style={styles.featureBullet} />
              <Text style={styles.featureText}>Discover job opportunities</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureBullet} />
              <Text style={styles.featureText}>Connect with companies</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureBullet} />
              <Text style={styles.featureText}>Showcase your skills and experience</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.option} 
          onPress={handleCompany}
          activeOpacity={0.9}
        >
          <View style={styles.optionContent}>
            <View style={[styles.iconContainer, styles.companyIconContainer]}>
              <Building2 size={32} color={colors.secondary} />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={[styles.optionTitle, { color: colors.secondary }]}>Established Company</Text>
              <Text style={styles.optionDescription}>
                Looking to hire talent and grow your team
              </Text>
            </View>
            <ArrowRight size={20} color={colors.secondary} />
          </View>
          
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>You'll be able to:</Text>
            <View style={styles.featureItem}>
              <View style={[styles.featureBullet, styles.companyFeatureBullet]} />
              <Text style={styles.featureText}>Find exceptional talent</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.featureBullet, styles.companyFeatureBullet]} />
              <Text style={styles.featureText}>Post job opportunities</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.featureBullet, styles.companyFeatureBullet]} />
              <Text style={styles.featureText}>Schedule interviews with candidates</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.option} 
          onPress={handleStartup}
          activeOpacity={0.9}
        >
          <View style={styles.optionContent}>
            <View style={[styles.iconContainer, styles.startupIconContainer]}>
              <Rocket size={32} color="#E97451" />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={[styles.optionTitle, { color: "#E97451" }]}>Startup Founder</Text>
              <Text style={styles.optionDescription}>
                Looking to build your founding team and grow fast
              </Text>
            </View>
            <ArrowRight size={20} color="#E97451" />
          </View>
          
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>You'll be able to:</Text>
            <View style={styles.featureItem}>
              <View style={[styles.featureBullet, styles.startupFeatureBullet]} />
              <Text style={styles.featureText}>Find co-founders and early employees</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.featureBullet, styles.startupFeatureBullet]} />
              <Text style={styles.featureText}>Connect with investors and mentors</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.featureBullet, styles.startupFeatureBullet]} />
              <Text style={styles.featureText}>Access resources for early-stage growth</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => router.push('/login')}
        >
          <Text style={styles.loginButtonText}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 12,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  option: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  individualIconContainer: {
    backgroundColor: `${colors.primary}15`,
  },
  companyIconContainer: {
    backgroundColor: `${colors.secondary}15`,
  },
  startupIconContainer: {
    backgroundColor: 'rgba(233, 116, 81, 0.15)',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  featuresContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 12,
  },
  companyFeatureBullet: {
    backgroundColor: colors.secondary,
  },
  startupFeatureBullet: {
    backgroundColor: "#E97451",
  },
  featureText: {
    fontSize: 14,
    color: colors.text,
  },
  loginButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  loginButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
});