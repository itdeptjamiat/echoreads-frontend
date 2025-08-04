import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, FlatList } from 'react-native';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { CustomButton } from '../../src/components/CustomButton';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface IntroSlide {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
}

const introSlides: IntroSlide[] = [
  {
    id: '1',
    title: 'Welcome to EchoReads',
    subtitle: 'Your gateway to premium digital magazines and articles',
    emoji: '📚',
  },
  {
    id: '2',
    title: 'Discover Amazing Content',
    subtitle: 'Access thousands of magazines, articles, and digests',
    emoji: '🔍',
  },
  {
    id: '3',
    title: 'Read Anywhere, Anytime',
    subtitle: 'Download content for offline reading on the go',
    emoji: '📱',
  },
  {
    id: '4',
    title: 'Choose Your Plan',
    subtitle: 'Start with free content or unlock premium features',
    emoji: '⭐',
  },
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
      handleSkip();
    }
  };

  const handleSkip = () => {
    router.push('/(onboarding)/choosePlan');
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  const renderSlide = ({ item }: { item: IntroSlide }) => (
    <View style={[styles.slide, { width }]}>
      <View style={styles.emojiContainer}>
        <Body style={styles.emoji}>{item.emoji}</Body>
      </View>
      
      <H1 center b style={[styles.title, { color: colors.text }]}>
        {item.title}
      </H1>
      
      <Body center style={[styles.subtitle, { color: colors.textSecondary }]}>
        {item.subtitle}
      </Body>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {introSlides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: index === currentIndex ? colors.primary : colors.border,
            },
          ]}
        />
      ))}
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    emojiContainer: {
      marginBottom: 48,
    },
    emoji: {
      fontSize: 80,
      textAlign: 'center',
    },
    title: {
      marginBottom: 16,
      textAlign: 'center',
    },
    subtitle: {
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 48,
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 32,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 32,
      paddingBottom: 32,
    },
    skipButton: {
      minWidth: 80,
    },
    nextButton: {
      minWidth: 80,
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={introSlides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
      
      {renderDots()}
      
      <View style={styles.buttonContainer}>
        <CustomButton
          label="Skip"
          variant="ghost"
          onPress={handleSkip}
          style={styles.skipButton}
          accessibilityLabel="Skip onboarding"
          accessible={true}
        />
        
        <CustomButton
          label={currentIndex === introSlides.length - 1 ? "Get Started" : "Next"}
          variant="primary"
          onPress={handleNext}
          style={styles.nextButton}
          accessibilityLabel={currentIndex === introSlides.length - 1 ? "Get started" : "Next slide"}
          accessible={true}
        />
      </View>
    </View>
  );
} 