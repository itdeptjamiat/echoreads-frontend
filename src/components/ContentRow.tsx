import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CView, CText, CFlatList, CIcon } from './core';
import { PostCard } from './PostCard';
import { EmptyState } from './EmptyState';
import { Spacing, Radius, Shadow, Duration } from '../constants/layout';
import { useTheme } from '../hooks/useTheme';
import { Post } from '../redux/slices/magazinesSlice';
import Animated, { 
  FadeInDown,
  FadeInRight,
  FadeInLeft,
  SlideInLeft,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  interpolateColor,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

const CARD_WIDTH = wp(72); // Slightly wider for better content display
const CARD_SPACING = Spacing.md; // Use spacing constant
const CARD_HEIGHT = hp(22); // Fixed height for consistency

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedCView = Animated.createAnimatedComponent(CView);

interface ContentRowProps {
  title: string;
  data: Post[];
  loading?: boolean;
  error?: string | null;
  onPressItem?: (item: Post) => void;
  onPressSeeAll?: () => void;
  showSeeAll?: boolean;
  emptyMessage?: string;
  variant?: 'default' | 'compact';
  icon?: string; // Optional icon for the section
}

export function ContentRow({
  title,
  data,
  loading = false,
  error = null,
  onPressItem,
  onPressSeeAll,
  showSeeAll = true,
  emptyMessage,
  variant = 'default',
}: ContentRowProps) {
  const { colors } = useTheme();

  // Enhanced animation values
  const scaleValue = useSharedValue(1);
  const headerOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  
  // Initialize animations
  React.useEffect(() => {
    headerOpacity.value = withTiming(1, {
      duration: Duration.normal,
      easing: Easing.out(Easing.quad),
    });
    
    contentOpacity.value = withTiming(1, {
      duration: Duration.slow,
      easing: Easing.out(Easing.quad),
    });
  }, []);

  // Enhanced item press with premium animation
  const handleItemPress = useCallback((item: Post) => {
    scaleValue.value = withSpring(0.96, {
      damping: 15,
      stiffness: 200,
    }, () => {
      scaleValue.value = withSpring(1, {
        damping: 12,
        stiffness: 150,
      });
    });
    
    const callback = () => {
      if (onPressItem) {
        onPressItem(item);
      } else {
        console.log('Navigate to post:', item.id);
      }
    };
    
    setTimeout(callback, Duration.fast);
  }, [onPressItem, scaleValue]);

  // Enhanced post item rendering with premium animations
  const renderPostItem: ListRenderItem<Post> = useCallback(({ item, index }) => {
    const animatedCardStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        scaleValue.value,
        [0.96, 1],
        [0.96, 1],
        'clamp'
      );
      
      return {
        transform: [{ scale }],
      };
    });

    return (
      <AnimatedCView
        entering={FadeInRight.delay(index * 120).duration(700).easing(Easing.out(Easing.back(1.1)))}
        style={[animatedCardStyle, { width: CARD_WIDTH }]}
      >
        <AnimatedTouchableOpacity
          onPress={() => handleItemPress(item)}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`${item.title}`}
          accessibilityHint={`By ${item.author || 'Unknown author'}. ${item.readTime || 'Reading time unknown'}. Double tap to read full content`}
          testID={`content-item-${item.id}`}
        >
          <CView
            borderRadius="xl"
            style={{
              ...Shadow.md,
              backgroundColor: colors.card,
              height: variant === 'compact' ? CARD_HEIGHT * 0.9 : CARD_HEIGHT,
              overflow: 'hidden',
            }}
          >
            <PostCard
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              category={item.category as any}
              readTime={item.readTime}
              author={item.author}
              variant={variant === 'compact' ? 'default' : 'default'}
              onPress={() => handleItemPress(item)}
            />
          </CView>
        </AnimatedTouchableOpacity>
      </AnimatedCView>
    );
  }, [handleItemPress, scaleValue, variant, colors.card]);

  // Enhanced loading skeleton with staggered animations
  const renderLoadingSkeleton = useCallback(() => {
    return (
      <CView row>
        {[1, 2, 3].map((i) => (
          <AnimatedCView
            key={i}
            entering={FadeInRight.delay(i * 150).duration(500)}
            style={{
              width: CARD_WIDTH,
              marginRight: i === 3 ? Spacing.lg : CARD_SPACING,
            }}
          >
            <CView
              height={variant === 'compact' ? CARD_HEIGHT * 0.9 : CARD_HEIGHT}
              borderRadius="xl"
              style={{
                ...Shadow.sm,
                backgroundColor: colors.muted,
                opacity: 0.7,
              }}
            >
              {/* Enhanced skeleton content */}
              <CView p="md" flex={1}>
                {/* Image placeholder */}
                <CView
                  height={hp(8)}
                  borderRadius="lg"
                  mb="md"
                  style={{ 
                    backgroundColor: colors.border,
                    opacity: 0.5,
                  }}
                />
                {/* Title placeholder */}
                <CView
                  height={hp(2.5)}
                  borderRadius="sm"
                  mb="sm"
                  style={{ 
                    backgroundColor: colors.border,
                    opacity: 0.4,
                  }}
                />
                {/* Description placeholder */}
                <CView
                  height={hp(2)}
                  borderRadius="sm"
                  width="85%"
                  mb="sm"
                  style={{ 
                    backgroundColor: colors.border,
                    opacity: 0.3,
                  }}
                />
                {/* Meta placeholder */}
                <CView row justify="space-between" align="center">
                  <CView
                    height={hp(1.5)}
                    width="30%"
                    borderRadius="sm"
                    style={{ 
                      backgroundColor: colors.border,
                      opacity: 0.2,
                    }}
                  />
                  <CView
                    height={hp(1.5)}
                    width="25%"
                    borderRadius="sm"
                    style={{ 
                      backgroundColor: colors.border,
                      opacity: 0.2,
                    }}
                  />
                </CView>
              </CView>
            </CView>
          </AnimatedCView>
        ))}
      </CView>
    );
  }, [variant, colors.muted, colors.border]);

  // Enhanced empty state using EmptyState component
  const renderEmptyState = useCallback(() => {
    if (loading || data.length > 0) return null;

    return (
      <EmptyState
        title="No Content Yet"
        description={emptyMessage || `${title} will appear here once available.`}
        icon="document-text-outline"
        variant="compact"
        testID={`${title.toLowerCase().replace(/\s+/g, '-')}-empty-state`}
      />
    );
  }, [loading, data.length, emptyMessage, title]);

  // Enhanced error state with retry functionality
  const renderErrorState = useCallback(() => {
    if (!error) return null;

    return (
      <AnimatedCView
        entering={FadeInDown.duration(600).easing(Easing.out(Easing.quad))}
      >
        <CView 
          center 
          py="xl"
          px="lg"
          bg="card"
          borderRadius="xl"
          style={{
            ...Shadow.md,
            minHeight: hp(16),
            borderWidth: 2,
            borderColor: colors.danger + '30',
          }}
        >
          <CView 
            mb="md"
            style={{
              backgroundColor: colors.danger + '20',
              borderRadius: Radius.full,
              padding: Spacing.md,
            }}
          >
            <CIcon 
              name="alert-circle" 
              size={6} 
              color="danger"
            />
          </CView>
          <CText 
            variant="body" 
            color="danger"
            center
            bold
            mb="sm"
          >
            Failed to Load
          </CText>
          <CText 
            variant="bodySmall" 
            color="textSecondary"
            center
            mb="md"
            lines={2}
          >
            {error || `Unable to load ${title.toLowerCase()}`}
          </CText>
          <TouchableOpacity
            onPress={() => {
              // TODO: Implement retry logic
              console.log('Retry loading', title);
            }}
            accessibilityLabel={`Retry loading ${title}`}
            accessibilityRole="button"
            style={{
              backgroundColor: colors.danger + '10',
              borderRadius: Radius.lg,
              paddingHorizontal: Spacing.lg,
              paddingVertical: Spacing.sm,
              ...Shadow.sm,
            }}
          >
            <CView row align="center">
              <CView mr="xs">
                <CIcon 
                  name="refresh" 
                  size={4} 
                  color="danger"
                />
              </CView>
              <CText 
                variant="bodySmall" 
                color="danger"
                bold
              >
                Retry
              </CText>
            </CView>
          </TouchableOpacity>
        </CView>
      </AnimatedCView>
    );
  }, [error, title, colors.danger]);

  // Don't render if no data and not loading
  if (!loading && data.length === 0 && !error) {
    return null;
  }

  // Animated header and content styles
  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [
        {
          translateX: interpolate(
            headerOpacity.value,
            [0, 1],
            [-30, 0],
            'clamp'
          ),
        },
      ],
    };
  });
  
  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
      transform: [
        {
          translateY: interpolate(
            contentOpacity.value,
            [0, 1],
            [20, 0],
            'clamp'
          ),
        },
      ],
    };
  });

  return (
    <Animated.View 
      entering={FadeInDown.duration(800).easing(Easing.out(Easing.quad))}
    >
      <CView mb="xxl">
        {/* Enhanced Section Header */}
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
                  name="list" 
                  size={5} 
                  color="primary" 
                />
              </CView>
              <CView>
                <CText 
                  variant="h2" 
                  bold 
                  color="text"
                >
                  {title}
                </CText>
                <CText 
                  variant="caption" 
                  color="textSecondary"
                  mt="xs"
                >
                  {data.length} {data.length === 1 ? 'item' : 'items'}
                </CText>
              </CView>
            </CView>
            
            {/* Enhanced See All Button */}
            {showSeeAll && data.length > 2 && !loading && !error && (
              <TouchableOpacity
                onPress={onPressSeeAll}
                accessibilityLabel={`View all ${title.toLowerCase()}`}
                accessibilityRole="button"
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
                    See All
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

        {/* Enhanced Content */}
        <Animated.View style={animatedContentStyle}>
          <CView px="lg">
            {loading ? (
              renderLoadingSkeleton()
            ) : error ? (
              renderErrorState()
            ) : data.length === 0 ? (
              renderEmptyState()
            ) : (
              <CFlatList
                data={data}
                renderItem={renderPostItem}
                keyExtractor={(item) => `${title}-${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingRight: Spacing.lg,
                }}
                ItemSeparatorComponent={() => <CView width={CARD_SPACING} />}
                accessible={true}
                accessibilityRole="list"
                accessibilityLabel={`${title} content list with ${data.length} items`}
                accessibilityHint="Swipe left or right to browse content"
                decelerationRate="fast"
                snapToInterval={CARD_WIDTH + CARD_SPACING}
                snapToAlignment="start"
                style={{
                  backgroundColor: 'transparent',
                }}
              />
            )}
          </CView>
        </Animated.View>
      </CView>
    </Animated.View>
  );
}