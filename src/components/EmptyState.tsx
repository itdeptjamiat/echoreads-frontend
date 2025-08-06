import React from 'react';
import { TouchableOpacity } from 'react-native';
import { CView, CText, CIcon } from './core';
import { Spacing, Radius, Shadow } from '../constants/layout';
import { useTheme } from '../hooks/useTheme';
import Animated, { 
  FadeIn,
  ZoomIn,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  Easing,
} from 'react-native-reanimated';

const AnimatedCView = Animated.createAnimatedComponent(CView);

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: string;
  actionText?: string;
  onAction?: () => void;
  variant?: 'default' | 'compact' | 'error';
  testID?: string;
}

export function EmptyState({
  title = "No Content Yet",
  description = "Content will appear here once available.",
  icon = "document-text-outline",
  actionText,
  onAction,
  variant = 'default',
  testID = 'empty-state',
}: EmptyStateProps) {
  const { colors } = useTheme();
  const buttonScale = useSharedValue(1);

  // Handle action button press with animation
  const handleActionPress = () => {
    buttonScale.value = withSpring(0.96, { damping: 15 }, () => {
      buttonScale.value = withSpring(1, { damping: 12 });
    });
    
    if (onAction) {
      setTimeout(onAction, 150);
    }
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  // Get styling based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'error':
        return {
          iconColor: 'danger' as const,
          iconBackground: colors.danger + '20',
          borderColor: colors.danger + '20',
        };
      case 'compact':
        return {
          iconColor: 'textSecondary' as const,
          iconBackground: colors.muted,
          borderColor: colors.border,
        };
      default:
        return {
          iconColor: 'textSecondary' as const,
          iconBackground: colors.muted,
          borderColor: colors.border,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <AnimatedCView
      entering={FadeIn.duration(800).easing(Easing.out(Easing.quad))}
      testID={testID}
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={`${title}. ${description}`}
    >
      <CView 
        center 
        py={variant === 'compact' ? 'lg' : 'xxl'}
        px="lg"
        bg="card"
        borderRadius="xl"
        style={{
          ...Shadow.md,
          borderWidth: 1,
          borderColor: variantStyles.borderColor,
        }}
      >
        {/* Icon */}
        <Animated.View 
          entering={ZoomIn.delay(400).duration(600)}
        >
          <CView 
            mb={variant === 'compact' ? 'md' : 'lg'}
            center
            style={{
              backgroundColor: variantStyles.iconBackground,
              borderRadius: Radius.full,
              padding: variant === 'compact' ? Spacing.md : Spacing.lg,
              width: variant === 'compact' ? 60 : 80,
              height: variant === 'compact' ? 60 : 80,
            }}
          >
            <CIcon 
              name={icon as any}
              size={variant === 'compact' ? 6 : 8} 
              color={variantStyles.iconColor}
            />
          </CView>
        </Animated.View>

        {/* Title */}
        <CText 
          variant={variant === 'compact' ? 'body' : 'h3'}
          color="text"
          center
          bold
          mb="sm"
          accessible={true}
          accessibilityRole="header"
        >
          {title}
        </CText>

        {/* Description */}
        <CText 
          variant="bodySmall" 
          color="textSecondary"
          center
          lines={3}
          mb={actionText ? 'lg' : undefined}
          style={{ 
            maxWidth: variant === 'compact' ? 250 : 300,
            lineHeight: variant === 'compact' ? 18 : 20,
          }}
          accessible={true}
          accessibilityRole="text"
        >
          {description}
        </CText>

        {/* Action Button */}
        {actionText && onAction && (
          <Animated.View style={animatedButtonStyle}>
            <TouchableOpacity
              onPress={handleActionPress}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={actionText}
              accessibilityHint="Double tap to perform this action"
              testID={`${testID}-action-button`}
              style={{
                backgroundColor: colors.primary + '15',
                borderRadius: Radius.lg,
                paddingHorizontal: Spacing.lg,
                paddingVertical: Spacing.md,
                ...Shadow.sm,
                minWidth: 120,
                minHeight: 44, // Minimum touch target size
              }}
            >
              <CView row align="center" justify="center">
                <CIcon 
                  name="refresh-outline" 
                  size={4} 
                  color="primary"
                  style={{ marginRight: Spacing.sm }}
                />
                <CText 
                  variant="bodySmall" 
                  color="primary"
                  bold
                >
                  {actionText}
                </CText>
              </CView>
            </TouchableOpacity>
          </Animated.View>
        )}
      </CView>
    </AnimatedCView>
  );
}