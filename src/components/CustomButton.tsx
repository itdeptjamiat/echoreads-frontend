import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import { Body } from '../theme/Typo';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  useSharedValue 
} from 'react-native-reanimated';

interface CustomButtonProps extends TouchableOpacityProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'gradient';
  gradientColors?: string[];
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export function CustomButton({ 
  label, 
  onPress, 
  variant = 'primary', 
  gradientColors,
  style, 
  disabled,
  ...props 
}: CustomButtonProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    scale.value = withSpring(0.95, { duration: 100 }, () => {
      scale.value = withSpring(1);
    });
    onPress();
  };

  const getButtonStyle = () => {
    const baseStyle = {
      padding: 16,
      borderRadius: 16,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      opacity: disabled ? 0.6 : 1,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: variant === 'gradient' ? 6 : 4,
      overflow: 'hidden' as const,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
        };
      case 'gradient':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'ghost':
        return { color: colors.text, fontWeight: '600' as const };
      case 'gradient':
        return { color: '#ffffff', fontWeight: '700' as const };
      default:
        return { color: '#ffffff', fontWeight: '600' as const };
    }
  };

  const getGradientColors = () => {
    if (gradientColors) return gradientColors;
    return colors.gradientPrimary;
  };

  const buttonContent = (
    <Body style={getTextStyle()}>
      {label}
    </Body>
  );

  return (
    <AnimatedTouchableOpacity
      style={[getButtonStyle(), style, animatedStyle]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      {variant === 'gradient' && (
        <LinearGradient
          colors={getGradientColors()}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      )}
      {buttonContent}
    </AnimatedTouchableOpacity>
  );
} 