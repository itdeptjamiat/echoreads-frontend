import React, { useCallback } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CView, CText, CIcon } from '../core';
import { Spacing, Radius, Shadow, Duration } from '../../constants/layout';
import { useTheme } from '../../hooks/useTheme';
import { setActivePostType } from '../../redux/slices/uiSlice';
import { selectActivePostType } from '../../redux/selectors/homeSelectors';
import { AppDispatch } from '../../redux/store';
import Animated, { 
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';

type PostType = 'magazines' | 'articles' | 'digests';

interface TabOption {
  key: PostType;
  label: string;
  icon: string;
  description: string;
}

const TAB_OPTIONS: TabOption[] = [
  {
    key: 'magazines',
    label: 'Magazines',
    icon: 'library-outline',
    description: 'Curated magazine content',
  },
  {
    key: 'articles',
    label: 'Articles',
    icon: 'document-text-outline',
    description: 'In-depth articles and stories',
  },
  {
    key: 'digests',
    label: 'Digests',
    icon: 'flash-outline',
    description: 'Quick summaries and insights',
  },
];

interface PostTypeTabsProps {
  style?: ViewStyle;
  testID?: string;
}

export function PostTypeTabs({ 
  style,
  testID = 'post-type-tabs',
}: PostTypeTabsProps) {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const activePostType = useSelector(selectActivePostType);
  
  // Animation values
  const scaleValue = useSharedValue(1);
  const containerOpacity = useSharedValue(0);
  
  // Initialize container animation
  React.useEffect(() => {
    containerOpacity.value = withTiming(1, {
      duration: Duration.normal,
      easing: Easing.out(Easing.quad),
    });
  }, []);

  // Handle tab selection with animation and accessibility
  const handleTabPress = useCallback((postType: PostType) => {
    // Haptic feedback simulation via scale animation
    scaleValue.value = withSpring(0.96, { damping: 15 }, () => {
      scaleValue.value = withSpring(1, { damping: 12 });
    });

    // Dispatch action to change active post type
    dispatch(setActivePostType(postType));
  }, [dispatch, scaleValue]);

  // Render individual tab
  const renderTab = useCallback((option: TabOption, index: number) => {
    const isActive = activePostType === option.key;
    
    return (
      <Animated.View
        key={option.key}
        entering={FadeInDown.delay(index * 100).duration(600).easing(Easing.out(Easing.back(1.1)))}
        style={{
          flex: 1,
          marginHorizontal: Spacing.xs,
        }}
      >
        <TouchableOpacity
          onPress={() => handleTabPress(option.key)}
          accessible={true}
          accessibilityRole="tab"
          accessibilityLabel={`${option.label} tab`}
          accessibilityHint={`Double tap to view ${option.description}`}
          accessibilityState={{ selected: isActive }}
          testID={`${testID}-${option.key}`}
          style={{
            borderRadius: Radius.lg,
            borderWidth: 2,
            minHeight: 56, // Minimum touch target
            backgroundColor: isActive ? colors.primary + '15' : colors.card,
            borderColor: isActive ? colors.primary : colors.border,
            ...Shadow.sm,
          }}
        >
          <CView
            center
            py="md"
            px="sm"
            style={{ minHeight: 56 }} // Ensure consistent height
          >
            {/* Tab Icon */}
            <CView
              mb="xs"
              center
              style={{
                backgroundColor: isActive ? colors.primary + '20' : colors.muted,
                borderRadius: Radius.md,
                padding: Spacing.xs,
                width: 32,
                height: 32,
              }}
            >
              <CIcon 
                name={option.icon as any}
                size={4}
                color={isActive ? 'primary' : 'textSecondary'}
              />
            </CView>

            {/* Tab Label */}
            <CText 
              variant="bodySmall"
              color={isActive ? 'primary' : 'textSecondary'}
              bold={isActive}
              center
              lines={1}
              accessible={false} // Handled by parent TouchableOpacity
            >
              {option.label}
            </CText>
          </CView>
        </TouchableOpacity>
      </Animated.View>
    );
  }, [activePostType, colors, handleTabPress, testID]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  return (
    <Animated.View 
      style={[animatedContainerStyle, style]}
      testID={testID}
      accessible={true}
      accessibilityRole="tablist"
      accessibilityLabel="Post type selection tabs"
    >
      <CView 
        row 
        px="lg"
        py="md"
        style={{ gap: Spacing.xs }}
      >
        {TAB_OPTIONS.map((option, index) => 
          renderTab(option, index)
        )}
      </CView>
    </Animated.View>
  );
}