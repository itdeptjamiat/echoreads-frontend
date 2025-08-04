import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { CustomButton } from '../../src/components/CustomButton';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface IntroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string[];
}

const introSlides: IntroSlide[] = [
  {
    id: '1',
    title: 'Welcome to EchoReads',
    subtitle: 'Your Digital Reading Companion',
    description: 'Discover thousands of magazines, articles, and daily digests curated just for you. Experience reading like never before.',
    icon: 'book-outline',
    gradient: ['#3b82f6', '#1d4ed8']
  },
  {
    id: '2',
    title: 'Personalized Content',
    subtitle: 'Tailored to Your Interests',
    description: 'Our AI learns what you love to read and suggests content that matches your preferences and reading habits.',
    icon: 'heart-outline',
    gradient: ['#8b5cf6', '#7c3aed']
  },
  {
    id: '3',
    title: 'Read Anywhere, Anytime',
    subtitle: 'Offline Reading Made Simple',
    description: 'Download your favorite content and read offline. Perfect for commutes, flights, or anywhere without internet.',
    icon: 'download-outline',
    gradient: ['#06b6d4', '#0891b2']
  },
  {
    id: '4',
    title: 'Start Your Journey',
    subtitle: 'Join Millions of Readers',
    description: 'Ready to explore the world of premium digital content? Create your account and begin your reading adventure.',
    icon: 'rocket-outline',
    gradient: ['#10b981', '#059669']
  }
];

export default function IntroScreen() {
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < introSlides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    router.push('/(auth)/');
  };

  const handleGetStarted = () => {
    router.push('/(auth)/');
  };

  const renderSlide = ({ item, index }: { item: IntroSlide; index: number }) => {
    return (
      <View style={styles.slide}>
        <LinearGradient
          colors={item.gradient}
          style={styles.slideGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        <View style={styles.slideContent}>
          <View style={styles.iconContainer}>
            <View style={[styles.iconCircle, { backgroundColor: colors.card }]}>
              <Ionicons 
                name={item.icon as any} 
                size={60} 
                color={item.gradient[0]} 
              />
            </View>
          </View>
          
          <View style={styles.textContainer}>
            <H1 style={[styles.title, { color: colors.text }]}>
              {item.title}
            </H1>
            
            <Body style={[styles.subtitle, { color: item.gradient[0] }]}>
              {item.subtitle}
            </Body>
            
            <Body style={[styles.description, { color: colors.textSecondary }]}>
              {item.description}
            </Body>
          </View>
        </View>
      </View>
    );
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {introSlides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === currentIndex ? colors.primary : colors.border,
                opacity: index === currentIndex ? 1 : 0.5,
                transform: [{ scale: index === currentIndex ? 1.2 : 1 }],
              }
            ]}
          />
        ))}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    slide: {
      width: screenWidth,
      height: screenHeight,
      position: 'relative',
    },
    slideGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: screenHeight * 0.4,
      opacity: 0.1,
    },
    slideContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
      paddingVertical: 60,
    },
    iconContainer: {
      marginBottom: 60,
    },
    iconCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 8,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
    },
    textContainer: {
      alignItems: 'center',
      maxWidth: 320,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 16,
      lineHeight: 40,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 26,
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 24,
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 32,
      paddingBottom: 50,
      backgroundColor: colors.background,
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginHorizontal: 6,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
    },
    skipButton: {
      flex: 1,
    },
    nextButton: {
      flex: 1,
    },
  });

  return (
    <ScreenWrapper
      safeArea={true}
      topSafeArea={true}
      bottomSafeArea={true}
      keyboardAvoiding={false} // Since this screen doesn't have inputs
      style={styles.container}
    >
      <FlatList
        ref={flatListRef}
        data={introSlides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
          setCurrentIndex(newIndex);
        }}
        scrollEventThrottle={16}
      />
      
      <View style={styles.bottomContainer}>
        {renderDots()}
        
        <View style={styles.buttonsContainer}>
          <View style={styles.skipButton}>
            <CustomButton
              label="Skip"
              variant="ghost"
              onPress={handleSkip}
              accessibilityLabel="Skip intro"
              accessible={true}
            />
          </View>
          
          <View style={styles.nextButton}>
            <CustomButton
              label={currentIndex === introSlides.length - 1 ? "Get Started" : "Next"}
              variant="gradient"
              gradientColors={introSlides[currentIndex].gradient}
              onPress={handleNext}
              accessibilityLabel={currentIndex === introSlides.length - 1 ? "Get started" : "Next slide"}
              accessible={true}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}