import React, { useState, useRef } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CView, CText, CButton, CIcon } from '../../src/components/core';
import { Spacing, Radius, Shadow } from '../../src/constants/layout';
import { useTheme } from '../../src/hooks/useTheme';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { markIntroSeen, completeIntro } from '../../src/redux/slices/onboardingSlice';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  SlideInLeft,
  SlideInRight 
} from 'react-native-reanimated';

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
  const dispatch = useDispatch();
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
    dispatch(markIntroSeen());
    dispatch(completeIntro());
    router.push('/(onboarding)/choosePlan');
  };

  const handleGetStarted = () => {
    dispatch(markIntroSeen());
    dispatch(completeIntro());
    router.push('/(onboarding)/choosePlan');
  };

  const renderSlide = ({ item, index }: { item: IntroSlide; index: number }) => {
    return (
      <CView 
        width={screenWidth}
        height={screenHeight}
        style={{ position: 'relative' }}
      >
        <LinearGradient
          colors={item.gradient}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: screenHeight * 0.4,
            opacity: 0.1,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        <CView 
          center
          px="xl"
          py="xxl"
        >
          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <CView 
              width={120}
              height={120}
              borderRadius="full"
              bg="card"
              center
              shadow="xl"
              mb="xl"
            >
              <CIcon 
                name={item.icon as any} 
                size={12} 
                color={item.gradient[0]}
              />
            </CView>
          </Animated.View>
          
          <Animated.View entering={SlideInLeft.delay(400).springify()}>
            <CView center style={{ maxWidth: 320 }}>
              <CText 
                variant="h1" 
                bold 
                center
                mb="md"
                lines={2}
              >
                {item.title}
              </CText>
              
              <CText 
                variant="h3" 
                color={item.gradient[0]}
                center
                mb="lg"
                bold
              >
                {item.subtitle}
              </CText>
              
              <CText 
                variant="bodyLarge" 
                color="textSecondary"
                center
                lines={4}
              >
                {item.description}
              </CText>
            </CView>
          </Animated.View>
        </CView>
      </CView>
    );
  };

  const renderDots = () => {
    return (
      <CView 
        row 
        center 
        mb="xl"
      >
        {introSlides.map((_, index) => (
          <CView
            key={index}
            width={12}
            height={12}
            borderRadius="full"
            bg={index === currentIndex ? 'primary' : 'border'}
            mx="xs"
            style={{
              opacity: index === currentIndex ? 1 : 0.5,
              transform: [{ scale: index === currentIndex ? 1.2 : 1 }],
            }}
          />
        ))}
      </CView>
    );
  };

  return (
    <ScreenWrapper
      safeArea={true}
      topSafeArea={true}
      bottomSafeArea={true}
      keyboardAvoiding={false}
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
      
              <CView 
          style={{ 
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
          px="xl"
          pb="xl"
          bg="background"
        >
        <Animated.View entering={FadeInUp.delay(600).springify()}>
          {renderDots()}
          
          <CView 
            row 
            justify="between" 
            align="center"
            style={{ gap: Spacing.md }}
          >
            <CView flex={1}>
              <CButton
                title="Skip"
                variant="ghost"
                onPress={handleSkip}
                accessibilityLabel="Skip intro"
              />
            </CView>
            
            <CView flex={1}>
              <CButton
                title={currentIndex === introSlides.length - 1 ? "Get Started" : "Next"}
                variant="gradient"
                gradientColors={introSlides[currentIndex].gradient}
                onPress={handleNext}
                size="large"
                accessibilityLabel={currentIndex === introSlides.length - 1 ? "Get started" : "Next slide"}
              />
            </CView>
          </CView>
        </Animated.View>
      </CView>
    </ScreenWrapper>
  );
}