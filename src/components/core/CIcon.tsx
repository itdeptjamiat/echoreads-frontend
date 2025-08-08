import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Spacing } from '../../constants/layout';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { CView } from './CView';

export interface CIconProps extends TouchableOpacityProps {
  // Icon name (Ionicons)
  name: keyof typeof Ionicons.glyphMap | string;
  
  // Size
  size?: number; // Will use wp() for responsive sizing
  sizePreset?: 'small' | 'medium' | 'large' | 'xlarge';
  
  // Colors
  color?: 'primary' | 'secondary' | 'text' | 'textSecondary' | 'success' | 'warning' | 'danger' | 'white' | 'black' | string;
  
  // Background (creates a circular background)
  bg?: 'primary' | 'secondary' | 'card' | 'background' | 'surface' | 'transparent' | string;
  bgSize?: number; // Background circle size, will use wp()
  
  // Spacing
  marginTop?: keyof typeof Spacing | number;
  marginBottom?: keyof typeof Spacing | number;
  marginLeft?: keyof typeof Spacing | number;
  marginRight?: keyof typeof Spacing | number;
  mt?: keyof typeof Spacing | number;
  mb?: keyof typeof Spacing | number;
  ml?: keyof typeof Spacing | number;
  mr?: keyof typeof Spacing | number;
  
  // Interaction
  onPress?: () => void;
  pressable?: boolean;
  
  // Shadow (for background icons)
  shadow?: boolean;
  
  // Border (for background icons)
  borderWidth?: number;
  borderColor?: string;
}

export function CIcon({
  name,
  size,
  sizePreset = 'medium',
  color = 'text',
  bg,
  bgSize,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  mt,
  mb,
  ml,
  mr,
  onPress,
  pressable = !!onPress,
  shadow,
  borderWidth,
  borderColor,
  style,
  ...props
}: CIconProps) {
  const { colors } = useTheme();

  const getSizeFromPreset = () => {
    switch (sizePreset) {
      case 'small':
        return wp(4); // ~16px on most devices
      case 'large':
        return wp(7); // ~28px on most devices
      case 'xlarge':
        return wp(10); // ~40px on most devices
      default: // medium
        return wp(5.5); // ~22px on most devices
    }
  };

  const getIconSize = () => {
    return size ? wp(size) : getSizeFromPreset();
  };

  const getIconColor = () => {
    if (color && (color.startsWith('#') || color.startsWith('rgb'))) {
      return color; // Custom color
    }
    
    switch (color) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'text':
        return colors.text;
      case 'textSecondary':
        return colors.textSecondary;
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'danger':
        return colors.danger;
      case 'white':
        return '#ffffff';
      case 'black':
        return '#000000';
      default:
        return colors.text;
    }
  };

  const getBackgroundColor = () => {
    if (!bg) return undefined;
    
    if (bg && (bg.startsWith('#') || bg.startsWith('rgb'))) {
      return bg; // Custom color
    }
    
    switch (bg) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'card':
        return colors.card;
      case 'background':
        return colors.background;
      case 'surface':
        return colors.muted;
      case 'transparent':
        return 'transparent';
      default:
        return bg;
    }
  };

  const getBackgroundSize = () => {
    if (bgSize) return wp(bgSize);
    // Default background size is 1.8x the icon size
    return getIconSize() * 1.8;
  };

  const getSpacingValue = (value: keyof typeof Spacing | number | undefined, horizontal = false) => {
    if (value === undefined) return 0;
    if (typeof value === 'number') return horizontal ? wp(value) : hp(value);
    return Spacing[value];
  };

  const containerStyles = {
    marginTop: getSpacingValue(marginTop ?? mt),
    marginBottom: getSpacingValue(marginBottom ?? mb),
    marginLeft: getSpacingValue(marginLeft ?? ml, true),
    marginRight: getSpacingValue(marginRight ?? mr, true),
  };

  const backgroundStyles = bg ? {
    width: getBackgroundSize(),
    height: getBackgroundSize(),
    borderRadius: getBackgroundSize() / 2,
    backgroundColor: getBackgroundColor(),
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderWidth: borderWidth,
    borderColor: borderColor || colors.border,
    elevation: shadow ? 2 : 0,
    shadowColor: shadow ? colors.shadow : undefined,
    shadowOffset: shadow ? { width: 0, height: 2 } : undefined,
    shadowOpacity: shadow ? 0.1 : undefined,
    shadowRadius: shadow ? 4 : undefined,
  } : {};

  const iconElement = (
    <Ionicons
      name={name as any}
      size={getIconSize()}
      color={getIconColor()}
    />
  );

  if (pressable && onPress) {
    return (
      <TouchableOpacity
        style={[containerStyles, backgroundStyles, style]}
        onPress={onPress}
        activeOpacity={0.7}
        {...props}
      >
        {iconElement}
      </TouchableOpacity>
    );
  }

  return (
    <CView style={[containerStyles, bg ? backgroundStyles : {}, style as any]}>
      {iconElement}
    </CView>
  );
}