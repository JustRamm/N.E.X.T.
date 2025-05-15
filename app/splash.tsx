import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '@/store/auth-store';
import { useOnboardingStore } from '@/store/onboarding-store';
import LogoIcon from '@/components/LogoIcon';
import colors from '@/constants/colors';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, userType } = useAuthStore();
  const { hasSeenOnboarding, markSplashComplete } = useOnboardingStore();
  const [showGetStarted, setShowGetStarted] = useState(false);
  
  // Animation values
  const backgroundAnim = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const nameOpacity = useRef(new Animated.Value(0)).current;
  const nameTranslateY = useRef(new Animated.Value(20)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineTranslateY = useRef(new Animated.Value(20)).current;
  const highlightAnim = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Create circular highlight animation
  const highlightInterpolation = highlightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });
  
  // Create rotation animation
  const rotateInterpolation = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Pulse animation for the button
  useEffect(() => {
    if (showGetStarted) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start();
    }
  }, [showGetStarted]);

  // Run animations
  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // Initial background animation
      Animated.timing(backgroundAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }),
      
      // Logo animation with rotation and scale
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(logoRotate, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.out(Easing.elastic(1)),
        }),
        Animated.timing(highlightAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
          easing: Easing.out(Easing.ease),
        }),
      ]),
      
      // Name animation
      Animated.parallel([
        Animated.timing(nameOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(nameTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.5)),
        }),
      ]),
      
      // Tagline animation
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(taglineTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.5)),
        }),
      ]),
      
      // Delay for reading the tagline
      Animated.delay(500),
    ]).start(() => {
      markSplashComplete();
      if (!isAuthenticated && !hasSeenOnboarding) {
        // Show get started button if not authenticated and hasn't seen onboarding
        setShowGetStarted(true);
        
        // Animate the button
        Animated.parallel([
          Animated.timing(buttonOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }),
          Animated.timing(buttonTranslateY, {
            toValue: 0,
            duration: 500, 
            useNativeDriver: true,
            easing: Easing.out(Easing.back(1.5)),
          })
        ]).start();
      } else {
        // Navigate based on authentication status
        setTimeout(() => {
          navigateToNextScreen();
        }, 500);
      }
    });
  }, []);

  const navigateToNextScreen = () => {
    if (isAuthenticated) {
      // If user is authenticated, navigate to their specific section
      if (userType === 'individual') {
        router.replace('/(individual)');
      } else if (userType === 'company') {
        router.replace('/(company)');
      } else if (userType === 'startup') {
        router.replace('/(startup)');
      } else {
        router.replace('/user-type');
      }
    } else {
      // If user is not authenticated, always go through onboarding first
      router.replace('/onboarding');
    }
  };

  // Handle get started button press
  const handleGetStarted = () => {
    navigateToNextScreen();
  };

  // Background gradient colors interpolation
  const backgroundColorTop = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.background, colors.primaryLight]
  });
  
  const backgroundColorBottom = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.background, colors.primaryDark]
  });

  return (
    <Animated.View style={styles.container}>
      <StatusBar style="light" />
      
      <Animated.View style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: backgroundColorTop,
          opacity: backgroundAnim
        }
      ]}>
        <LinearGradient
          colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
      
      <Animated.View style={[
        styles.logoWrapper,
        {
          opacity: logoOpacity,
        }
      ]}>
        <Animated.View style={[
          styles.logoHighlight,
          {
            width: highlightInterpolation,
            height: highlightInterpolation,
            opacity: highlightAnim.interpolate({
              inputRange: [0, 0.2, 0.8, 1],
              outputRange: [0, 0.7, 0.3, 0]
            })
          }
        ]} />
        
        <Animated.View style={[
          styles.logoContainer,
          {
            transform: [
              { scale: logoScale },
              { rotate: rotateInterpolation }
            ]
          }
        ]}>
          <LogoIcon size={160} />
        </Animated.View>
      </Animated.View>
      
      <Animated.Text style={[
        styles.name,
        {
          opacity: nameOpacity,
          transform: [{ translateY: nameTranslateY }]
        }
      ]}>
        N.E.X.T
      </Animated.Text>
      
      <Animated.Text style={[
        styles.tagline,
        {
          opacity: taglineOpacity,
          transform: [{ translateY: taglineTranslateY }]
        }
      ]}>
        Nurturing Entrepreneurs and eXceptional Talents
      </Animated.Text>
      
      {showGetStarted && (
        <Animated.View 
          style={[
            styles.buttonContainer,
            {
              opacity: buttonOpacity,
              transform: [
                { translateY: buttonTranslateY },
                { scale: pulseAnim }
              ]
            }
          ]}
        >
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  logoHighlight: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 200,
    zIndex: 0,
  },
  logoContainer: {
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  name: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: '80%',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 64,
    borderRadius: 30,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  getStartedText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});