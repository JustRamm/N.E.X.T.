import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Search, Users, Briefcase } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/Button';
import LogoIcon from '@/components/LogoIcon';
import { useAuthStore } from '@/store/auth-store';
import colors from '@/constants/colors';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { isAuthenticated, userType } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      if (userType === 'individual') {
        router.replace({ pathname: '/(individual)' });
      } else if (userType === 'company') {
        router.replace({ pathname: '/(company)' });
      } else if (userType === 'startup') {
        router.replace({ pathname: '/(startup)' });
      }
    }
  }, [isAuthenticated, userType]);

  const handleLogin = () => {
    router.push({ pathname: '/login' });
  };

  const handleGetStarted = () => {
    router.push({ pathname: '/user-type' });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <LogoIcon size={40} />
            <Text style={styles.logoText}>N.E.X.T</Text>
          </View>
          
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.heroSection}>
          <Text style={styles.title}>Nurturing Entrepreneurs and eXceptional Talents</Text>
          
          <Text style={styles.subtitle}>
            Connect with top companies and exceptional talent to build your future together
          </Text>
          
          <View style={styles.imageContainer}>
            <View style={styles.heroImageContainer}>
              <LogoIcon size={200} style={styles.heroLogo} />
              <LinearGradient
                colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.9)', '#FFFFFF']}
                style={styles.imageGradient}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why choose N.E.X.T?</Text>
          
          <View style={styles.featureCard}>
            <View style={[styles.featureIconContainer, { backgroundColor: `${colors.primary}15` }]}>
              <Search size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Find Opportunities</Text>
              <Text style={styles.featureDescription}>
                Discover jobs that match your skills and goals with our smart matching algorithm
              </Text>
            </View>
          </View>
          
          <View style={styles.featureCard}>
            <View style={[styles.featureIconContainer, { backgroundColor: `${colors.secondary}15` }]}>
              <Users size={24} color={colors.secondary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Connect & Network</Text>
              <Text style={styles.featureDescription}>
                Build meaningful professional relationships with industry leaders and peers
              </Text>
            </View>
          </View>
          
          <View style={styles.featureCard}>
            <View style={[styles.featureIconContainer, { backgroundColor: '#E9745115' }]}>
              <Briefcase size={24} color="#E97451" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Grow Your Business</Text>
              <Text style={styles.featureDescription}>
                Find exceptional talent to help your company or startup thrive and scale
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.testimonialsSection}>
          <Text style={styles.sectionTitle}>Success Stories</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.testimonialsList}
            decelerationRate="fast"
            snapToInterval={width - 80}
            snapToAlignment="center"
          >
            <View style={styles.testimonialCard}>
              <View style={styles.testimonialImageContainer}>
                <LogoIcon size={64} style={styles.testimonialLogo} />
              </View>
              <Text style={styles.testimonialText}>
                "N.E.X.T helped me find my dream job at a startup that perfectly aligns with my values and career goals."
              </Text>
              <Text style={styles.testimonialName}>Sarah J.</Text>
              <Text style={styles.testimonialRole}>Senior Developer</Text>
            </View>
            
            <View style={styles.testimonialCard}>
              <View style={styles.testimonialImageContainer}>
                <LogoIcon size={64} style={styles.testimonialLogo} />
              </View>
              <Text style={styles.testimonialText}>
                "As a startup founder, I found exceptional talent through N.E.X.T that helped us scale our business rapidly."
              </Text>
              <Text style={styles.testimonialName}>Michael T.</Text>
              <Text style={styles.testimonialRole}>Founder & CEO</Text>
            </View>
            
            <View style={styles.testimonialCard}>
              <View style={styles.testimonialImageContainer}>
                <LogoIcon size={64} style={styles.testimonialLogo} />
              </View>
              <Text style={styles.testimonialText}>
                "The quality of candidates we found through N.E.X.T was outstanding. Our hiring process has never been easier."
              </Text>
              <Text style={styles.testimonialName}>Lisa R.</Text>
              <Text style={styles.testimonialRole}>HR Director</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Get Started" 
          onPress={handleGetStarted} 
          style={styles.getStartedButton}
          size="large"
          icon={<ArrowRight size={20} color={colors.background} />}
        />
        
        <TouchableOpacity style={styles.loginLink} onPress={handleLogin}>
          <Text style={styles.loginLinkText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 8,
  },
  loginButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  loginButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
    backgroundColor: `${colors.primary}10`,
  },
  heroImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLogo: {
    opacity: 0.8,
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  testimonialsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  testimonialsList: {
    paddingRight: 20,
  },
  testimonialCard: {
    width: width - 80,
    marginRight: 16,
    padding: 20,
    backgroundColor: colors.card,
    borderRadius: 12,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  testimonialImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.primary,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  testimonialLogo: {
    transform: [{ scale: 0.8 }],
  },
  testimonialText: {
    fontSize: 15,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  testimonialRole: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  getStartedButton: {
    marginBottom: 16,
  },
  loginLink: {
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
});