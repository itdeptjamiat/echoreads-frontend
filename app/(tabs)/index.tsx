import React, { useEffect } from 'react';
import { CView, CText, CScrollView } from '../../src/components/core';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { useTheme } from '../../src/hooks/useTheme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../src/redux/store';
import { 
  PostTypeTabs, 
  FeaturedCarousel, 
  CategoryGrid 
} from '../../src/components/home';
import { 
  selectCurrentLoading, 
  selectCurrentError,
  selectActivePostType 
} from '../../src/redux/selectors/homeSelectors';
import { 
  fetchMagazinesFeatured,
  fetchMagazinesTrending,
  fetchMagazinesRecommended 
} from '../../src/redux/slices/magazinesSlice';
import { 
  fetchArticlesFeatured,
  fetchArticlesTrending,
  fetchArticlesRecommended 
} from '../../src/redux/slices/articlesSlice';
import { 
  fetchDigestsFeatured,
  fetchDigestsTrending,
  fetchDigestsRecommended 
} from '../../src/redux/slices/digestsSlice';
import Animated, { 
  FadeInDown,
  FadeInUp,
  SlideInDown,
} from 'react-native-reanimated';

export default function HomeScreen() {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectCurrentLoading);
  const error = useSelector(selectCurrentError);
  const activePostType = useSelector(selectActivePostType);

  // Load data based on active post type
  useEffect(() => {
    const loadData = async () => {
      try {
        switch (activePostType) {
          case 'magazines':
            await Promise.all([
              dispatch(fetchMagazinesFeatured()),
              dispatch(fetchMagazinesTrending()),
              dispatch(fetchMagazinesRecommended()),
            ]);
            break;
          case 'articles':
            await Promise.all([
              dispatch(fetchArticlesFeatured()),
              dispatch(fetchArticlesTrending()),
              dispatch(fetchArticlesRecommended()),
            ]);
            break;
          case 'digests':
            await Promise.all([
              dispatch(fetchDigestsFeatured()),
              dispatch(fetchDigestsTrending()),
              dispatch(fetchDigestsRecommended()),
            ]);
            break;
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [activePostType, dispatch]);

  const handleCategorySelect = (category: any) => {
    console.log('Category selected:', category.name);
    // TODO: Navigate to category view or filter content
  };

  return (
    <ScreenWrapper
      safeArea={true}
      keyboardAvoiding={false}
    >
      <CScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header Section */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <CView 
            px="lg" 
            pt="lg" 
            pb="md"
          >
            <CText 
              variant="h1" 
              bold 
              mb="xs"
            >
              EchoReads
            </CText>
            <CText 
              variant="bodyLarge" 
              color="textSecondary"
            >
              Discover amazing content tailored for you
            </CText>
          </CView>
        </Animated.View>

        {/* Post Type Tabs */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <CView px="lg" mb="lg">
            <PostTypeTabs />
          </CView>
        </Animated.View>

        {/* Featured Carousel */}
        <Animated.View entering={FadeInUp.delay(400).springify()}>
          <CView mb="xl">
            <FeaturedCarousel />
          </CView>
        </Animated.View>

        {/* Categories Grid */}
        <Animated.View entering={FadeInUp.delay(500).springify()}>
          <CView px="lg" mb="lg">
            <CText 
              variant="h2" 
              bold 
              mb="md"
            >
              Browse Categories
            </CText>
            <CategoryGrid 
              onSelectCategory={handleCategorySelect}
              showTitle={false}
              variant="default"
            />
          </CView>
        </Animated.View>

        {/* Loading State */}
        {loading && (
          <Animated.View entering={FadeInUp.delay(600).springify()}>
            <CView center py="xl">
              <CText 
                variant="body" 
                color="textSecondary"
              >
                Loading content...
              </CText>
            </CView>
          </Animated.View>
        )}

        {/* Error State */}
        {error && (
          <Animated.View entering={FadeInUp.delay(600).springify()}>
            <CView 
              center 
              py="xl"
              px="lg"
            >
              <CText 
                variant="body" 
                color="danger"
                center
              >
                {error}
              </CText>
            </CView>
          </Animated.View>
        )}

        {/* Bottom Spacing */}
        <CView pb="xxl" />
      </CScrollView>
    </ScreenWrapper>
  );
}