import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { CustomButton } from '../../src/components/CustomButton';
import { ButtonSelectorGroup } from '../../src/components/ButtonSelectorGroup';
import { PostCard } from '../../src/components/PostCard';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { getPostsByCategory, getFeaturedPosts } from '../../src/data/demoData';
import Animated, { 
  useAnimatedScrollHandler, 
  useSharedValue, 
  useAnimatedStyle,
  interpolate,
  FadeInDown,
  FadeInUp 
} from 'react-native-reanimated';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function HomeScreen() {
  const { colors, theme, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<'magazines' | 'articles' | 'digests'>('magazines');
  const scrollY = useSharedValue(0);

  const featuredPosts = getFeaturedPosts();
  const categoryPosts = getPostsByCategory(
    selectedCategory === 'magazines' ? 'magazine' : 
    selectedCategory === 'articles' ? 'article' : 'digest'
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 100], [1, 0.8]);
    const translateY = interpolate(scrollY.value, [0, 100], [0, -10]);
    
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 10,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    welcomeText: {
      flex: 1,
      marginRight: 16,
    },
    welcomeTitle: {
      color: colors.text,
      fontSize: 28,
      marginBottom: 4,
    },
    welcomeSubtitle: {
      color: colors.textSecondary,
      fontSize: 16,
    },
    themeToggle: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    gradientButtonsContainer: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 24,
      paddingHorizontal: 20,
    },
    gradientButton: {
      flex: 1,
      height: 80,
      borderRadius: 16,
      overflow: 'hidden',
      elevation: 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    gradientButtonContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    gradientButtonText: {
      color: '#ffffff',
      fontWeight: '700',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 4,
    },
    gradientButtonSubtext: {
      color: '#ffffff',
      fontWeight: '700',
      fontSize: 11,
      textAlign: 'center',
      opacity: 0.8,
    },
    sectionTitle: {
      paddingHorizontal: 20,
      marginBottom: 16,
      color: colors.text,
      fontSize: 22,
    },
    featuredSection: {
      marginBottom: 32,
    },
    categorySection: {
      marginBottom: 32,
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
    emptyStateText: {
      textAlign: 'center',
      marginTop: 16,
      color: colors.textSecondary,
    },
  });

  const gradientButtons = [
    {
      title: 'Magazines',
      subtitle: 'In-depth reads',
      colors: colors.gradientPrimary,
      icon: 'library-outline',
      onPress: () => setSelectedCategory('magazines')
    },
    {
      title: 'Articles',
      subtitle: 'Quick insights',
      colors: colors.gradientSecondary,
      icon: 'document-text-outline',
      onPress: () => setSelectedCategory('articles')
    },
    {
      title: 'Digests',
      subtitle: 'Daily summaries',
      colors: colors.gradientAccent,
      icon: 'flash-outline',
      onPress: () => setSelectedCategory('digests')
    }
  ];

  return (
    <ScreenWrapper
      safeArea={true}
      keyboardAvoiding={false}
      style={styles.container}
    >
      <AnimatedScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <View style={styles.headerTop}>
            <View style={styles.welcomeText}>
              <H1 style={styles.welcomeTitle}>
                Good morning! 👋
              </H1>
              <Body style={styles.welcomeSubtitle}>
                What would you like to read today?
              </Body>
            </View>
            <TouchableOpacity 
              style={styles.themeToggle}
              onPress={toggleTheme}
              accessibilityLabel="Toggle theme"
              accessible={true}
            >
              <Ionicons 
                name={theme === 'dark' ? 'sunny' : 'moon'} 
                size={24} 
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View 
          style={styles.gradientButtonsContainer}
          entering={FadeInDown.delay(200).duration(600)}
        >
          {gradientButtons.map((button, index) => (
            <TouchableOpacity
              key={button.title}
              style={styles.gradientButton}
              onPress={button.onPress}
              activeOpacity={0.8}
              accessibilityLabel={`${button.title} section`}
              accessible={true}
            >
              <LinearGradient
                colors={button.colors}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <View style={styles.gradientButtonContent}>
                <Ionicons 
                  name={button.icon as any} 
                  size={24} 
                  color="#ffffff" 
                />
                <Body style={styles.gradientButtonText}>
                  {button.title}
                </Body>
                <Body style={styles.gradientButtonSubtext}>
                  {button.subtitle}
                </Body>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {featuredPosts.length > 0 && (
          <Animated.View 
            style={styles.featuredSection}
            entering={FadeInUp.delay(400).duration(600)}
          >
            <H1 style={styles.sectionTitle}>
              Featured Today
            </H1>
            {featuredPosts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                description={post.description}
                imageUrl={post.imageUrl}
                category={post.category}
                readTime={post.readTime}
                author={post.author}
                variant="featured"
                onPress={() => console.log('Navigate to post:', post.id)}
              />
            ))}
          </Animated.View>
        )}

        <Animated.View 
          style={styles.categorySection}
          entering={FadeInUp.delay(600).duration(600)}
        >
          <H1 style={styles.sectionTitle}>
            Browse by Category
          </H1>
          
          <ButtonSelectorGroup
            options={['Magazines', 'Articles', 'Digests']}
            selectedOption={selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            onSelect={(option) => setSelectedCategory(option.toLowerCase() as any)}
            variant="gradient"
          />

          {categoryPosts.length > 0 ? (
            categoryPosts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                description={post.description}
                imageUrl={post.imageUrl}
                category={post.category}
                readTime={post.readTime}
                author={post.author}
                onPress={() => console.log('Navigate to post:', post.id)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons 
                name="document-outline" 
                size={48} 
                color={colors.textSecondary} 
              />
              <Body style={styles.emptyStateText}>
                No {selectedCategory} available at the moment.{'\n'}
                Check back later for new content!
              </Body>
            </View>
          )}
        </Animated.View>

        <View style={{ height: 40 }} />
      </AnimatedScrollView>
    </ScreenWrapper>
  );
}