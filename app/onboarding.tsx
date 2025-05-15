import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Dimensions, 
  TouchableOpacity, 
  Animated,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Check, Search, Users, Briefcase } from 'lucide-react-native';
import Button from '@/components/Button';
import LogoIcon from '@/components/LogoIcon';
import { useOnboardingStore } from '@/store/onboarding-store';
import colors from '@/constants/colors';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Find Your Dream Job',
    description: 'Discover opportunities that match your skills and career goals.',
    icon: 'search'
  },
  {
    id: '2',
    title: 'Connect with Top Companies',
    description: 'Build relationships with leading companies and startups in your industry.',
    icon: 'users'
  },
  {
    id: '3',
    title: 'Grow Your Team',
    description: 'For companies, find exceptional talent to help your business thrive.',
    icon: 'briefcase'
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { markOnboardingComplete } = useOnboardingStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  const handleFinish = () => {
    markOnboardingComplete();
    router.replace('/user-type');
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'search':
        return <Search size={60} color={colors.primary} />;
      case 'users':
        return <Users size={60} color={colors.primary} />;
      case 'briefcase':
        return <Briefcase size={60} color={colors.primary} />;
      default:
        return null;
    }
  };

  const renderItem = ({ item }: { item: typeof onboardingData[0] }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          <LogoIcon size={100} style={styles.logoBackground} />
          <View style={styles.iconOverlay}>
            {renderIcon(item.icon)}
          </View>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {onboardingData.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          
          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { width: dotWidth, opacity },
                index === currentIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <LogoIcon size={40} />
      </View>
      
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
      
      {renderDots()}
      
      <View style={styles.footer}>
        {currentIndex < onboardingData.length - 1 ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
            <ArrowRight size={20} color={colors.background} />
          </TouchableOpacity>
        ) : (
          <Button
            title="Get Started"
            onPress={handleFinish}
            style={styles.getStartedButton}
            icon={<Check size={20} color={colors.background} />}
          />
        )}
      </View>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  slide: {
    width,
    alignItems: 'center',
    padding: 24,
  },
  imageContainer: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 20,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${colors.primary}10`,
    position: 'relative',
  },
  logoBackground: {
    opacity: 0.2,
    position: 'absolute',
    transform: [{ scale: 2 }],
  },
  iconOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    width: 120,
    height: 120,
    borderRadius: 60,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    backgroundColor: colors.border,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
  },
  nextButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  getStartedButton: {
    width: '100%',
  },
});