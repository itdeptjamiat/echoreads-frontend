import React, { useEffect, useCallback, useState } from 'react';
import { Dimensions, Alert, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CView, CText, CButton, CIcon, CScrollView } from '../../src/components/core';
import { Spacing, Radius, Shadow } from '../../src/constants/layout';
import { useTheme } from '../../src/hooks/useTheme';
import { PostCard } from '../../src/components/PostCard';
import { ContentRow } from '../../src/components/ContentRow';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { FeaturedCarousel, CategoryGrid, PostTypeTabs } from '../../src/components/home';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../src/redux/store';
import { setActivePostType } from '../../src/redux/slices/uiSlice';
import {
  selectActivePostType,
  selectCurrentFeatured,
  selectCurrentTrending,
  selectCurrentRecommended,
  selectCurrentNew,
  selectCurrentLoading,
  selectCurrentError,
} from '../../src/redux/selectors/homeSelectors';
import {
  fetchMagazinesFeatured,
  fetchMagazinesTrending,
  fetchMagazinesRecommended,
  fetchMagazinesNew,
} from '../../src/redux/slices/magazinesSlice';
import {
  fetchArticlesFeatured,
  fetchArticlesTrending,
  fetchArticlesRecommended,
  fetchArticlesNew,
} from '../../src/redux/slices/articlesSlice';
import {
  fetchDigestsFeatured,
  fetchDigestsTrending,
  fetchDigestsRecommended,
  fetchDigestsNew,
} from '../../src/redux/slices/digestsSlice';
import Animated, { 
  useAnimatedScrollHandler, 
  useSharedValue, 
  useAnimatedStyle,
  interpolate,
  FadeInDown,
} from 'react-native-reanimated';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { colors, theme, toggleTheme } = useTheme();
  const scrollY = useSharedValue(0);

  // Redux selectors
  const activePostType = useSelector(selectActivePostType);
  const featured = useSelector(selectCurrentFeatured);
  const trending = useSelector(selectCurrentTrending);
  const recommended = useSelector(selectCurrentRecommended);
  const newContent = useSelector(selectCurrentNew);
  const loading = useSelector(selectCurrentLoading);
  const error = useSelector(selectCurrentError);

  // Pull to refresh state
  const [refreshing, setRefreshing] = useState(false);

  // Fetch data when component mounts or post type changes
  useEffect(() => {
    fetchDataForPostType(activePostType);
  }, [activePostType]);

  const fetchDataForPostType = useCallback((postType: string) => {
    switch (postType) {
      case 'magazines':
        dispatch(fetchMagazinesFeatured());
        dispatch(fetchMagazinesTrending());
        dispatch(fetchMagazinesRecommended());
        dispatch(fetchMagazinesNew());
        break;
      case 'articles':
        dispatch(fetchArticlesFeatured());
        dispatch(fetchArticlesTrending());
        dispatch(fetchArticlesRecommended());
        dispatch(fetchArticlesNew());
        break;
      case 'digests':
        dispatch(fetchDigestsFeatured());
        dispatch(fetchDigestsTrending());
        dispatch(fetchDigestsRecommended());
        dispatch(fetchDigestsNew());
        break;
    }
  }, [dispatch]);

  const handlePostTypeChange = useCallback((postType: 'magazines' | 'articles' | 'digests') => {
    dispatch(setActivePostType(postType));
  }, [dispatch]);

  const handleRetry = useCallback(() => {
    fetchDataForPostType(activePostType);
  }, [activePostType, fetchDataForPostType]);

  // Pull to refresh handler
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Fetch data based on active post type
      const thunks = {
        magazines: [
          fetchMagazinesFeatured(),
          fetchMagazinesTrending(),
          fetchMagazinesRecommended(),
          fetchMagazinesNew(),
        ],
        articles: [
          fetchArticlesFeatured(),
          fetchArticlesTrending(),
          fetchArticlesRecommended(),
          fetchArticlesNew(),
        ],
        digests: [
          fetchDigestsFeatured(),
          fetchDigestsTrending(),
          fetchDigestsRecommended(),
          fetchDigestsNew(),
        ],
      };
      
      await Promise.all(
        thunks[activePostType as keyof typeof thunks].map(thunk => dispatch(thunk))
      );
    } catch (error) {
      console.error('Failed to refresh content:', error);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch, activePostType]);

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

  // Tab buttons configuration
  const tabButtons = [
    {
      id: 'magazines' as const,
      title: 'Magazines',
      icon: 'library-outline',
      gradient: colors.gradientPrimary,
    },
    {
      id: 'articles' as const,
      title: 'Articles',
      icon: 'document-text-outline',
      gradient: colors.gradientSecondary,
    },
    {
      id: 'digests' as const,
      title: 'Digests',
      icon: 'flash-outline',
      gradient: colors.gradientAccent,
    },
  ];





  // Loading skeleton
  const LoadingSkeleton = () => (
    <CView>
      {[1, 2, 3].map((i) => (
        <CView
          key={i}
          height={120}
          bg="card"
          borderRadius="lg"
          mb="md"
          style={{ opacity: 0.6 }}
        />
      ))}
    </CView>
  );

  // Error state
  const ErrorState = () => (
    <CView center py="xl">
      <CView mb="md">
        <CIcon 
          name="alert-circle-outline" 
          size={12} 
          color="danger"
        />
      </CView>
      <CText 
        variant="body" 
        color="textSecondary"
        center
        mb="lg"
        lines={2}
      >
        {error || 'Something went wrong while loading content.'}
      </CText>
      <CButton
        title="Try Again"
        variant="primary"
        onPress={handleRetry}
        accessibilityLabel="Retry loading content"
      />
    </CView>
  );

  return (
    <ScreenWrapper
      safeArea={true}
      keyboardAvoiding={false}
    >
      <AnimatedScrollView
        style={{ backgroundColor: colors.background, flex: 1 }}
        contentContainerStyle={{ 
          paddingHorizontal: Spacing.lg,
          flexGrow: 1 
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
            progressBackgroundColor={colors.card}
            title="Pull to refresh"
            titleColor={colors.textSecondary}
          />
        }
        accessible={true}
        accessibilityRole="scrollbar"
        accessibilityLabel="Home screen content"
        accessibilityHint="Scroll to browse content or pull down to refresh"
      >
        {/* Header Section */}
        <Animated.View style={headerAnimatedStyle}>
          <CView 
            pt="lg" 
            pb="md"
          >
            <CView 
              row 
              justify="space-between" 
              align="center" 
              mb="lg"
            >
              <CView flex={1} mr="md">
                <CText 
                  variant="h1" 
                  bold 
                  mb="xs"
                >
                  Good morning! 👋
                </CText>
                <CText 
                  variant="bodyLarge" 
                  color="textSecondary"
                >
                  What would you like to read today?
                </CText>
              </CView>
              <CButton
                variant="ghost"
                size="small"
                onPress={toggleTheme}
                accessibilityLabel="Toggle theme"
                leftIcon={<CIcon name={theme === 'dark' ? 'sunny' : 'moon'} size={5} color="primary" />}
              />
            </CView>
          </CView>
        </Animated.View>

        {/* Post Type Tabs */}
        <PostTypeTabs testID="home-post-type-tabs" />

        {/* Content Sections */}
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState />
        ) : (
          <>
            {/* Featured Carousel */}
            <FeaturedCarousel />

            {/* Category Grid */}
            <CategoryGrid 
              maxCategories={6}
              onSelectCategory={(category) => {
                console.log('Selected category:', category.name);
                // TODO: Filter content by category or navigate to category view
              }}
            />

            {/* New Content */}
            <ContentRow
              title="New for You"
              data={newContent}
              loading={loading}
              error={error}
              onPressItem={(item) => console.log('Navigate to new post:', item.id)}
              onPressSeeAll={() => console.log('View all new content')}
            />

            {/* Trending */}
            <ContentRow
              title="Trending Now"
              data={trending}
              loading={loading}
              error={error}
              onPressItem={(item) => console.log('Navigate to trending post:', item.id)}
              onPressSeeAll={() => console.log('View all trending')}
            />

            {/* Recommended */}
            <ContentRow
              title="Recommended for You"
              data={recommended}
              loading={loading}
              error={error}
              onPressItem={(item) => console.log('Navigate to recommended post:', item.id)}
              onPressSeeAll={() => console.log('View all recommended')}
            />
          </>
        )}

        <CView height={40} />
              </AnimatedScrollView>
    </ScreenWrapper>
  );
}