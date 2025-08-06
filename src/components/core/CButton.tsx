import React from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Radius, FontSize, Layout, Shadow } from '../../constants/layout';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  useSharedValue 
} from 'react-native-reanimated';

interface CButtonProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  title?: string;
  
  // Variants
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'danger';
  
  // Size presets
  size?: 'small' | 'medium' | 'large';
  
  // Custom sizing
  width?: number;
  height?: number;
  widthPercent?: number;
  heightPercent?: number;
  
  // Layout
  fullWidth?: boolean;
  
  // States
  loading?: boolean;
  disabled?: boolean;
  
  // Gradient colors (for gradient variant)
  gradientColors?: string[];
  
  // Spacing
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  
  // Custom styling
  borderRadius?: number;
  
  // Icon
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export function CButton({
  children,
  title,
  variant = 'primary',
  size = 'medium',
  width,
  height,
  widthPercent,
  heightPercent,
  fullWidth,
  loading,
  disabled,
  gradientColors,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  borderRadius,
  leftIcon,
  rightIcon,
  style,
  onPress,
  ...props
}: CButtonProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    if (disabled || loading) return;
    
    scale.value = withSpring(0.96, { duration: 100 }, () => {
      scale.value = withSpring(1, { duration: 150 });
    });
    
    onPress?.();
  };

  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: hp(1.2),
          paddingHorizontal: wp(4),
          borderRadius: wp(3),
          fontSize: 3.5,
          minHeight: hp(4.5),
        };
      case 'large':
        return {
          paddingVertical: hp(2),
          paddingHorizontal: wp(8),
          borderRadius: wp(4),
          fontSize: 4.5,
          minHeight: hp(6.5),
        };
      default: // medium
        return {
          paddingVertical: hp(1.5),
          paddingHorizontal: wp(6),
          borderRadius: wp(3.5),
          fontSize: 4,
          minHeight: hp(5.5),
        };
    }
  };

  const sizeConfig = getSizeConfig();

  const getButtonStyles = () => {
    const baseStyle = {
      paddingVertical: sizeConfig.paddingVertical,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      borderRadius: borderRadius ? wp(borderRadius) : sizeConfig.borderRadius,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      flexDirection: 'row' as const,
      minHeight: sizeConfig.minHeight,
      opacity: disabled || loading ? 0.6 : 1,
      width: fullWidth ? '100%' : widthPercent ? wp(widthPercent) : width,
      height: heightPercent ? hp(heightPercent) : height,
      marginTop: marginTop ? hp(marginTop) : 0,
      marginBottom: marginBottom ? hp(marginBottom) : 0,
      marginLeft: marginLeft ? wp(marginLeft) : 0,
      marginRight: marginRight ? wp(marginRight) : 0,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: variant === 'ghost' ? 0 : 3,
      overflow: 'hidden' as const,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
        };
      case 'gradient':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          elevation: 4,
          shadowOpacity: 0.15,
        };
      case 'danger':
        return {
          ...baseStyle,
          backgroundColor: colors.danger,
        };
      default:
        return baseStyle;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return '#1a1a1a'; // Dark text on lime background
      case 'secondary':
        return colors.text;
      case 'ghost':
        return colors.text;
      case 'gradient':
        return '#1a1a1a'; // Dark text on lime gradient
      case 'danger':
        return '#ffffff';
      default:
        return '#1a1a1a';
    }
  };

  const getGradientColors = () => {
    if (gradientColors) return gradientColors;
    return colors.gradientPrimary;
  };

  const buttonStyles = getButtonStyles();

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator 
          size="small" 
          color={getTextColor()} 
        />
      );
    }

    return (
      <>
        {leftIcon && (
          <View style={{ marginRight: wp(1.5) }}>
            {leftIcon}
          </View>
        )}
        
        {children || (
          <Text
            style={{
              fontSize: wp(sizeConfig.fontSize),
              fontWeight: '600',
              color: getTextColor(),
            }}
          >
            {title}
          </Text>
        )}
        
        {rightIcon && (
          <View style={{ marginLeft: wp(1.5) }}>
            {rightIcon}
          </View>
        )}
      </>
    );
  };

  return (
    <AnimatedTouchableOpacity
      style={[buttonStyles, style, animatedStyle]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.85}
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
      {renderContent()}
    </AnimatedTouchableOpacity>
  );
}