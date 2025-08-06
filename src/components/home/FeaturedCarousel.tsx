import React, { useCallback } from 'react';
import { Dimensions, ListRenderItem, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { CView, CText, CFlatList, CIcon } from '../core';
import { PostCard } from '../PostCard';
import { Spacing, Radius, Shadow, Duration } from '../../constants/layout';
import { useTheme } from '../../hooks/useTheme';
import {
  selectActivePostType,
  selectCurrentFeatured,
  selectCurrentLoading,
} from '../../redux/selectors/homeSelectors';
import { Post } from '../../redux/slices/magazinesSlice';
import Animated, { 
  FadeInDown,
  FadeInLeft,
  ZoomIn,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = wp(85);
const CARD_SPACING = Spacing.md;
const CARD_HEIGHT = hp(28);

const AnimatedView = Animated.View;

export function FeaturedCarousel() {
  const { colors } = useTheme();
  const activePostType = useSelector(selectActivePostType);
  const featured = useSelector(selectCurrentFeatured);
  const loading = useSelector(selectCurrentLoading);

  const scrollX = useSharedValue(0);
  const cardScale = useSharedValue(1);
  const headerOpacity = useSharedValue(0);
  
  React.useEffect(() => {
    headerOpacity.value = withTiming(1, {
      duration: Duration.normal,
      easing: Easing.out(Easing.quad),
    });
  }, []);

  const getPostTypeDisplayName = useCallback(() => {
    switch (activePostType) {
      case 'magazines':
        return 'Magazines';
      case 'articles':
        return 'Articles';
      case 'digests':
        return 'Digests';
      default:
        return 'Featured';
    }
  }, [activePostType]);

  const getFeaturedGradient = useCallback(() => {
    switch (activePostType) {
      case 'magazines':
        return colors.gradientPrimary;
      case 'articles':
        return colors.gradientSecondary;
      case 'digests':
        return colors.gradientAccent;
      default:
        return colors.gradientPrimary;
    }
  }, [activePostType, colors]);
  
  const handleCardPress = useCallback((item: Post) => {
    cardScale.value = withSpring(0.95, { damping: 10 }, () => {
      cardScale.value = withSpring(1, { damping: 10 });
    });
    console.log('Navigate to featured post:', item.id);
  }, [cardScale]);

  const renderFeaturedItem: ListRenderItem<Post> = useCallback(({ item, index }) => {
    return (
      <AnimatedView
        key={item.id}
        entering={ZoomIn.delay(index * 200).duration(600).easing(Easing.out(Easing.back(1.1)))}
        style={{ 
          width: CARD_WIDTH,
          marginRight: index === featured.length - 1 ? Spacing.lg : CARD_SPACING,
        }}
      >
        <TouchableOpacity
          onPress={() => handleCardPress(item)}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Featured ${getPostTypeDisplayName().toLowerCase().slice(0, -1)}: ${item.title}`}
          accessibilityHint={`By ${item.author}. ${item.readTime}. Double tap to read full content`}
          accessibilityState={{ busy: loading }}
          testID={`featured-card-${item.id}`}
        >
          <CView
            borderRadius="xl"
            style={{
               ...Shadow.lg,
               position: 'relative',
               height: CARD_HEIGHT,
               backgroundColor: colors.card,
               overflow: 'hidden',
             }}
          >
            <CView
              style={{
                position: 'absolute',
                top: Spacing.md,
                left: Spacing.md,
                zIndex: 10,
                borderRadius: Radius.lg,
                overflow: 'hidden',
                ...Shadow.md,
              }}
            >
              <LinearGradient
                colors={getFeaturedGradient() as any}
                style={{
                  paddingHorizontal: Spacing.md,
                  paddingVertical: Spacing.sm,
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <CView row align="center">
                  <CView mr="xs">
                    <CIcon 
                      name="star" 
                      size={3} 
                      color="white"
                    />
                  </CView>
                  <CText 
                    variant="bodySmall" 
                    color="white" 
                    bold
                    accessible={false}
                  >
                    Featured
                  </CText>
                </CView>
              </LinearGradient>
            </CView>

            <PostCard
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              category={
                activePostType === 'magazines' ? 'magazine' : 
                activePostType === 'articles' ? 'article' : 'digest'
              }
              readTime={item.readTime}
              author={item.author}
              variant="featured"
              onPress={() => handleCardPress(item)}
            />
          </CView>
        </TouchableOpacity>
      </AnimatedView>
    );
  }, [activePostType, featured.length, getFeaturedGradient, handleCardPress, colors.card]);

  const renderLoadingSkeleton = useCallback(() => {
    return (
      <CView 
        row 
        px="lg"
        style={{ gap: Spacing.md }}
      >
        {[1, 2, 3].map((index) => (
          <AnimatedView
            key={index}
            entering={FadeInLeft.delay(index * 200).duration(600).easing(Easing.out(Easing.quad))}
            style={{
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              backgroundColor: colors.muted,
              borderRadius: Radius.xl,
              ...Shadow.lg,
            }}
          />
        ))}
      </CView>
    );
  }, [colors.muted]);

  const renderPaginationDots = useCallback(() => {
    if (featured.length <= 1) return null;

    return (
      <CView 
        row 
        center 
        mt="lg"
        style={{ gap: Spacing.sm }}
      >
        {featured.map((_, index) => (
          <Animated.View
            key={index}
            style={{
              width: wp(2.5),
              height: wp(2.5),
              borderRadius: wp(1.25),
              backgroundColor: index === 0 ? colors.primary : colors.border,
              ...Shadow.sm,
            }}
          />
        ))}
      </CView>
    );
  }, [featured.length, colors.primary, colors.border]);

  const handleScroll = useCallback((event: any) => {
    'worklet';
    scrollX.value = event.nativeEvent.contentOffset.x;
  }, [scrollX]);

  if (!loading && featured.length === 0) {
    return (
      <CView 
        mb="xl"
        accessible={true}
        accessibilityRole="text"
        accessibilityLabel={`No featured ${getPostTypeDisplayName().toLowerCase()} available`}
        testID="featured-carousel-empty"
      >
        <CView px="lg">
          <CText 
            variant="bodySmall" 
            color="textSecondary"
            center
            style={{ fontStyle: 'italic' }}
          >
            No featured {getPostTypeDisplayName().toLowerCase()} available at the moment.
          </CText>
        </CView>
      </CView>
    );
  }

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [
        {
          translateX: interpolate(
            headerOpacity.value,
            [0, 1],
            [-50, 0],
            'clamp'
          ),
        },
      ],
    };
  });

  return (
    <Animated.View 
      entering={FadeInDown.delay(400).duration(800).easing(Easing.out(Easing.quad))}
    >
      <CView mb="xxl">
        <Animated.View style={animatedHeaderStyle}>
          <CView 
            row 
            align="center" 
            justify="space-between" 
            mb="lg"
            px="lg"
          >
            <CView row align="center">
              <CView
                style={{
                  backgroundColor: colors.primary + '20',
                  borderRadius: Radius.md,
                  padding: Spacing.sm,
                  marginRight: Spacing.sm,
                }}
              >
                <CIcon 
                  name="star" 
                  size={5} 
                  color="primary" 
                />
              </CView>
              <CView>
                <CText 
                  variant="h2" 
                  bold 
                  color="text"
                  accessible={true}
                  accessibilityRole="header"
                >
                  Featured {getPostTypeDisplayName()}
                </CText>
                <CText 
                  variant="caption" 
                  color="textSecondary"
                  mt="xs"
                  accessible={true}
                  accessibilityRole="text"
                >
                  Handpicked for you
                </CText>
              </CView>
            </CView>
            
            {featured.length > 3 && (
              <TouchableOpacity
                onPress={() => {
                  console.log('View all featured posts');
                }}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`View all featured ${getPostTypeDisplayName().toLowerCase()}`}
                accessibilityHint="Double tap to see complete list"
                testID="featured-view-all-button"
                style={{
                  backgroundColor: colors.primary + '10',
                  borderRadius: Radius.lg,
                  paddingHorizontal: Spacing.md,
                  paddingVertical: Spacing.sm,
                  ...Shadow.sm,
                }}
              >
                <CView row align="center">
                  <CText 
                    variant="bodySmall" 
                    color="primary" 
                    bold
                    mr="xs"
                  >
                    View All
                  </CText>
                  <CIcon 
                    name="chevron-forward" 
                    size={3} 
                    color="primary" 
                  />
                </CView>
              </TouchableOpacity>
            )}
          </CView>
        </Animated.View>

        {loading ? (
          <CView px="lg">
            {renderLoadingSkeleton()}
          </CView>
        ) : (
          <>
            <CFlatList
              data={featured}
              renderItem={renderFeaturedItem}
              keyExtractor={(item) => `featured-${item.id}`}
              horizontal
              pagingEnabled={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingLeft: Spacing.lg,
                paddingRight: Spacing.lg,
              }}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToInterval={CARD_WIDTH + CARD_SPACING}
              snapToAlignment="start"
              accessible={true}
              accessibilityRole="list"
              accessibilityLabel={`Featured ${getPostTypeDisplayName().toLowerCase()} carousel`}
              accessibilityHint="Swipe left or right to browse featured content"
            />
            
            {renderPaginationDots()}
          </>
        )}
      </CView>
    </Animated.View>
  );
} 