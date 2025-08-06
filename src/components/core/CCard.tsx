import React from 'react';
import { View, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../hooks/useTheme';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  useSharedValue 
} from 'react-native-reanimated';

interface CCardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  
  // Card variants
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  
  // Size presets
  size?: 'small' | 'medium' | 'large';
  
  // Custom sizing
  width?: number;
  height?: number;
  widthPercent?: number;
  heightPercent?: number;
  
  // Layout
  fullWidth?: boolean;
  
  // Spacing
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  
  // Styling
  borderRadius?: number;
  backgroundColor?: string;
  
  // Gradient (for gradient variant)
  gradientColors?: string[];
  gradientDirection?: { x: number; y: number }[];
  
  // Interaction
  onPress?: () => void;
  pressable?: boolean;
  
  // Animation
  animatePress?: boolean;
  
  // Shadow and elevation
  shadow?: boolean;
  elevation?: number;
  
  // Border
  borderWidth?: number;
  borderColor?: string;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export function CCard({
  children,
  variant = 'default',
  size = 'medium',
  width,
  height,
  widthPercent,
  heightPercent,
  fullWidth,
  padding,
  paddingHorizontal,
  paddingVertical,
  margin,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  borderRadius,
  backgroundColor,
  gradientColors,
  gradientDirection,
  onPress,
  pressable = !!onPress,
  animatePress = true,
  shadow,
  elevation,
  borderWidth,
  borderColor,
  style,
  ...props
}: CCardProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    if (!pressable || !onPress) return;
    
    if (animatePress) {
      scale.value = withSpring(0.98, { duration: 100 }, () => {
        scale.value = withSpring(1, { duration: 150 });
      });
    }
    
    onPress();
  };

  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return {
          padding: wp(2),
          borderRadius: wp(2),
          elevation: 1,
        };
      case 'large':
        return {
          padding: wp(5),
          borderRadius: wp(4),
          elevation: 4,
        };
      default: // medium
        return {
          padding: wp(3),
          borderRadius: wp(3),
          elevation: 2,
        };
    }
  };

  const sizeConfig = getSizeConfig();

  const getCardStyles = () => {
    const baseStyle = {
      width: fullWidth ? '100%' : widthPercent ? wp(widthPercent) : width,
      height: heightPercent ? hp(heightPercent) : height,
      padding: padding !== undefined ? wp(padding) : paddingHorizontal || paddingVertical ? undefined : sizeConfig.padding,
      paddingHorizontal: paddingHorizontal !== undefined ? wp(paddingHorizontal) : undefined,
      paddingVertical: paddingVertical !== undefined ? hp(paddingVertical) : undefined,
      margin: margin !== undefined ? wp(margin) : undefined,
      marginHorizontal: marginHorizontal !== undefined ? wp(marginHorizontal) : undefined,
      marginVertical: marginVertical !== undefined ? hp(marginVertical) : undefined,
      marginTop: marginTop !== undefined ? hp(marginTop) : 0,
      marginBottom: marginBottom !== undefined ? hp(marginBottom) : 0,
      marginLeft: marginLeft !== undefined ? wp(marginLeft) : 0,
      marginRight: marginRight !== undefined ? wp(marginRight) : 0,
      borderRadius: borderRadius !== undefined ? wp(borderRadius) : sizeConfig.borderRadius,
      borderWidth: borderWidth,
      borderColor: borderColor || colors.border,
      overflow: 'hidden' as const,
    };

    switch (variant) {
      case 'elevated':
        return {
          ...baseStyle,
          backgroundColor: backgroundColor || colors.card,
          elevation: elevation !== undefined ? elevation : sizeConfig.elevation + 2,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
        };
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: backgroundColor || 'transparent',
          borderWidth: borderWidth || 1,
          borderColor: borderColor || colors.border,
          elevation: 0,
        };
      case 'gradient':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          elevation: elevation !== undefined ? elevation : sizeConfig.elevation,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        };
      default: // default
        return {
          ...baseStyle,
          backgroundColor: backgroundColor || colors.card,
          elevation: elevation !== undefined ? elevation : (shadow ? sizeConfig.elevation : 0),
          shadowColor: shadow ? colors.shadow : undefined,
          shadowOffset: shadow ? { width: 0, height: 2 } : undefined,
          shadowOpacity: shadow ? 0.1 : undefined,
          shadowRadius: shadow ? 4 : undefined,
        };
    }
  };

  const getGradientColors = () => {
    if (gradientColors) return gradientColors;
    return colors.gradientPrimary;
  };

  const getGradientDirection = () => {
    if (gradientDirection) return gradientDirection;
    return [{ x: 0, y: 0 }, { x: 1, y: 1 }];
  };

  const cardStyles = getCardStyles();

  const CardComponent = pressable ? AnimatedTouchableOpacity : View;
  const cardProps = pressable ? {
    onPress: handlePress,
    activeOpacity: 0.9,
    style: animatePress ? [cardStyles, style, animatedStyle] : [cardStyles, style],
    ...props
  } : {
    style: [cardStyles, style]
  };

  return (
    <CardComponent {...cardProps}>
      {variant === 'gradient' && (
        <LinearGradient
          colors={getGradientColors()}
          start={getGradientDirection()[0]}
          end={getGradientDirection()[1]}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}
      {children}
    </CardComponent>
  );
}