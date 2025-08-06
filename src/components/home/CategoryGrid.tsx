import React, { useCallback, useState } from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CView, CText, CIcon } from '../core';
import { Spacing, Radius, Shadow, Duration } from '../../constants/layout';
import { useTheme } from '../../hooks/useTheme';
import { selectCurrentCategories } from '../../redux/selectors/homeSelectors';
import { Category } from '../../redux/slices/magazinesSlice';
import Animated, { 
  ZoomIn,
  SlideInUp,
  SlideInLeft,
  FadeIn,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
  interpolate,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');
const GRID_COLUMNS = screenWidth > 400 ? 3 : 2;
const CARD_WIDTH = screenWidth > 400 ? wp(30) : wp(44); // Slightly adjusted for better spacing
const CARD_HEIGHT = hp(13); // Increased for better proportion
const CARD_SPACING = Spacing.md;

interface CategoryGridProps {
  onSelectCategory?: (category: Category) => void;
  showTitle?: boolean;
  maxCategories?: number;
  variant?: 'default' | 'compact';
}

export function CategoryGrid({
  onSelectCategory,
  showTitle = true,
  maxCategories,
  variant = 'default',
}: CategoryGridProps) {
  const { colors } = useTheme();
  const categories = useSelector(selectCurrentCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Enhanced animation values
  const scaleValue = useSharedValue(1);
  const headerOpacity = useSharedValue(0);
  const gridOpacity = useSharedValue(0);
  
  // Initialize animations
  React.useEffect(() => {
    headerOpacity.value = withTiming(1, {
      duration: Duration.normal,
      easing: Easing.out(Easing.quad),
    });
    
    gridOpacity.value = withTiming(1, {
      duration: Duration.slow,
      easing: Easing.out(Easing.quad),
    });
  }, []);

  // Handle category selection with enhanced animations
  const handleCategoryPress = useCallback((category: Category) => {
    // Enhanced press animation
    scaleValue.value = withSpring(0.95, { damping: 15 }, () => {
      scaleValue.value = withSpring(1, { damping: 12 });
    });

    // Update selected category
    setSelectedCategory(selectedCategory === category.id ? null : category.id);

    // Call parent callback
    onSelectCategory?.(category);
  }, [onSelectCategory, scaleValue, selectedCategory]);

  // Enhanced category tile with premium animations and theming
  const renderCategoryTile = useCallback((category: Category, index: number) => {
    const isSelected = selectedCategory === category.id;
    
    return (
      <Animated.View
        key={category.id}
        entering={
          variant === 'compact'
            ? FadeIn.delay(index * 80).duration(500).easing(Easing.out(Easing.quad))
            : ZoomIn.delay(index * 120).duration(700).easing(Easing.out(Easing.back(1.1)))
        }
        style={{
          width: CARD_WIDTH,
          height: variant === 'compact' ? CARD_HEIGHT * 0.85 : CARD_HEIGHT,
          marginBottom: Spacing.md,
          marginHorizontal: Spacing.xs,
        }}
      >
        <TouchableOpacity
          onPress={() => handleCategoryPress(category)}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`${category.name} category`}
          accessibilityHint={`${category.count} ${category.count === 1 ? 'post' : 'posts'} available. Double tap to filter by this category`}
          accessibilityState={{ selected: isSelected }}
          testID={`category-tile-${category.id}`}
          style={{ flex: 1 }}
        >
          <CView
            flex={1}
            center
            borderRadius="xl"
            p="md"
            style={{
              ...Shadow.lg,
              borderWidth: isSelected ? 2 : 0.5,
              borderColor: isSelected ? colors.primary : colors.border,
              backgroundColor: isSelected ? colors.primary + '25' : colors.card,
            }}
          >
            {/* Enhanced Category Icon */}
            <CView 
              mb="sm"
              style={{
                backgroundColor: category.color + '25',
                borderRadius: Radius.full,
                width: wp(9),
                height: wp(9),
                justifyContent: 'center',
                alignItems: 'center',
                ...Shadow.sm,
              }}
            >
              <CIcon 
                name={category.icon as any} 
                size={variant === 'compact' ? 4 : 5} 
                color="textSecondary"
              />
            </CView>

            {/* Category Name */}
            <CText 
              variant={variant === 'compact' ? 'bodySmall' : 'body'}
              bold
              center
              color={isSelected ? 'primary' : 'text'}
              lines={1}
              mb="xs"
            >
              {category.name}
            </CText>

            {/* Enhanced Post Count */}
            <CView
              style={{
                backgroundColor: isSelected ? colors.primary + '20' : colors.muted,
                borderRadius: Radius.lg,
                paddingHorizontal: Spacing.sm,
                paddingVertical: Spacing.xs,
              }}
            >
              <CText 
                variant="caption" 
                color={isSelected ? 'primary' : 'textSecondary'}
                center
                bold={isSelected}
              >
                {category.count} posts
              </CText>
            </CView>
          </CView>
        </TouchableOpacity>
      </Animated.View>
    );
  }, [selectedCategory, colors, variant, handleCategoryPress]);

  // Enhanced loading skeleton with animations
  const renderLoadingSkeleton = useCallback(() => {
    return (
      <CView 
        row 
        px="lg"
        style={{ 
          flexWrap: 'wrap',
          justifyContent: GRID_COLUMNS === 3 ? 'space-around' : 'space-between',
          gap: Spacing.sm 
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Animated.View
            key={index}
            entering={FadeInDown.delay(index * 100).duration(600).easing(Easing.out(Easing.quad))}
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

  // Enhanced empty state
  if (!categories || categories.length === 0) {
    return (
      <CView 
        mb="xl"
        accessible={true}
        accessibilityRole="text"
        accessibilityLabel="No categories available"
        testID="category-grid-empty"
      >
        <CView px="lg">
          <CText 
            variant="bodySmall" 
            color="textSecondary"
            center
            style={{ fontStyle: 'italic' }}
          >
            No categories available at the moment.
          </CText>
        </CView>
      </CView>
    );
  }

  // Filter categories if maxCategories is specified
  const displayCategories = maxCategories 
    ? categories.slice(0, maxCategories)
    : categories;

  // Enhanced header animation
  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [
        {
          translateY: interpolate(
            headerOpacity.value,
            [0, 1],
            [-20, 0],
            'clamp'
          ),
        },
      ],
    };
  });

  // Enhanced grid animation
  const animatedGridStyle = useAnimatedStyle(() => {
    return {
      opacity: gridOpacity.value,
      transform: [
        {
          translateY: interpolate(
            gridOpacity.value,
            [0, 1],
            [30, 0],
            'clamp'
          ),
        },
      ],
    };
  });

  return (
    <Animated.View 
      entering={SlideInUp.delay(600).duration(900).easing(Easing.out(Easing.quad))}
    >
      <CView mb="xxl">
        {/* Enhanced Section Title */}
        {showTitle && (
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
                    backgroundColor: colors.accent + '20',
                    borderRadius: Radius.md,
                    padding: Spacing.sm,
                    marginRight: Spacing.sm,
                  }}
                >
                  <CIcon 
                    name="grid" 
                    size={5} 
                    color="accent" 
                  />
                </CView>
                <CView>
                  <CText 
                    variant="h2" 
                    bold 
                    color="text"
                  >
                    Categories
                  </CText>
                  <CText 
                    variant="caption" 
                    color="textSecondary"
                    mt="xs"
                  >
                    Explore by topic
                  </CText>
                </CView>
              </CView>
              
              {maxCategories && categories.length > maxCategories && (
                <TouchableOpacity
                  onPress={() => console.log('View all categories')}
                  accessibilityLabel="View all categories"
                  accessibilityRole="button"
                  style={{
                    backgroundColor: colors.accent + '10',
                    borderRadius: Radius.lg,
                    paddingHorizontal: Spacing.md,
                    paddingVertical: Spacing.sm,
                    ...Shadow.sm,
                  }}
                >
                  <CView row align="center">
                    <CText 
                      variant="bodySmall" 
                      color="accent" 
                      bold
                      mr="xs"
                    >
                      View All
                    </CText>
                    <CIcon 
                      name="chevron-forward" 
                      size={3} 
                      color="accent" 
                    />
                  </CView>
                </TouchableOpacity>
              )}
            </CView>
          </Animated.View>
        )}

        {/* Enhanced Categories Grid */}
        <Animated.View style={animatedGridStyle}>
          <CView 
            row 
            px="lg"
            style={{ 
              flexWrap: 'wrap',
              justifyContent: GRID_COLUMNS === 3 ? 'space-around' : 'space-between',
              gap: Spacing.sm 
            }}
          >
            {displayCategories.map((category, index) => (
              <Animated.View key={category.id}>
                {renderCategoryTile(category, index)}
              </Animated.View>
            ))}
          </CView>
        </Animated.View>
      </CView>
    </Animated.View>
  );
}