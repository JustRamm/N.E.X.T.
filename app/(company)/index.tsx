import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  PanResponder, 
  Dimensions, 
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, X } from 'lucide-react-native';
import CandidateCard from '@/components/CandidateCard';
import { useCompanyStore } from '@/store/company-store';
import colors from '@/constants/colors';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;

export default function CompanyHomeScreen() {
  const { candidates, fetchCandidates, likeCandidate, rejectCandidate, isLoading } = useCompanyStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const rotation = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });
  
  // For overlay animations
  const likeOpacity = position.x.interpolate({
    inputRange: [0, width / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  
  const nopeOpacity = position.x.interpolate({
    inputRange: [-width / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    fetchCandidates();
  }, []);

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 5,
      useNativeDriver: false,
    }).start();
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -width, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      if (candidates[currentIndex]) {
        rejectCandidate(candidates[currentIndex].id);
      }
      position.setValue({ x: 0, y: 0 });
      setCurrentIndex(currentIndex + 1);
    });
  };

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: width, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      if (candidates[currentIndex]) {
        likeCandidate(candidates[currentIndex].id);
      }
      position.setValue({ x: 0, y: 0 });
      setCurrentIndex(currentIndex + 1);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          swipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const renderCards = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      );
    }

    if (currentIndex >= candidates.length) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No more candidates</Text>
          <Text style={styles.emptySubtext}>Check back later for new talent</Text>
        </View>
      );
    }

    return candidates
      .map((candidate, index) => {
        if (index < currentIndex) {
          return null;
        }

        if (index === currentIndex) {
          return (
            <Animated.View
              key={candidate.id}
              style={[
                styles.cardContainer,
                {
                  transform: [
                    { translateX: position.x },
                    { rotate: rotation },
                  ],
                  zIndex: 1,
                },
              ]}
              {...panResponder.panHandlers}
            >
              <Animated.View style={[styles.likeOverlay, { opacity: likeOpacity }]}>
                <View style={styles.overlayContent}>
                  <Check size={80} color={colors.background} />
                  <Text style={styles.overlayText}>LIKE</Text>
                </View>
              </Animated.View>
              
              <Animated.View style={[styles.nopeOverlay, { opacity: nopeOpacity }]}>
                <View style={styles.overlayContent}>
                  <X size={80} color={colors.background} />
                  <Text style={styles.overlayText}>NOPE</Text>
                </View>
              </Animated.View>
              
              <CandidateCard candidate={candidate} />
            </Animated.View>
          );
        }

        // Next card in stack (for preview)
        return (
          <Animated.View
            key={candidate.id}
            style={[
              styles.cardContainer,
              {
                top: 10,
                zIndex: 0,
              },
            ]}
          >
            <CandidateCard candidate={candidate} />
          </Animated.View>
        );
      })
      .reverse();
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Find Talent</Text>
        <Text style={styles.subtitle}>Swipe right to like, left to pass</Text>
      </View>
      
      <View style={styles.cardsContainer}>{renderCards()}</View>
      
      {!isLoading && currentIndex < candidates.length && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.rejectButton]}
            onPress={swipeLeft}
            activeOpacity={0.7}
          >
            <X size={30} color={colors.error} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.likeButton]}
            onPress={swipeRight}
            activeOpacity={0.7}
          >
            <Check size={30} color={colors.success} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  cardContainer: {
    position: 'absolute',
    width: width,
  },
  likeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    backgroundColor: 'rgba(56, 161, 105, 0.7)',
    borderRadius: 12,
  },
  nopeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    backgroundColor: 'rgba(229, 62, 62, 0.7)',
    borderRadius: 12,
  },
  overlayContent: {
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.background,
    marginTop: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 24,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rejectButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.error,
  },
  likeButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.success,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});