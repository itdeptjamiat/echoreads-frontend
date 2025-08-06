import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useTheme } from '../../hooks/useTheme';
import { FontSize, Spacing } from '../../constants/layout';

interface CTextProps extends TextProps {
  children: React.ReactNode;
  
  // Typography variants using layout constants
  variant?: keyof typeof FontSize;
  
  // Responsive font size (will override variant)
  size?: keyof typeof FontSize | number;
  
  // Font weight
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  bold?: boolean; // Shorthand for bold weight
  
  // Colors
  color?: 'primary' | 'secondary' | 'text' | 'textSecondary' | 'success' | 'warning' | 'danger' | string;
  
  // Alignment
  center?: boolean;
  right?: boolean;
  
  // Spacing using layout constants
  mt?: keyof typeof Spacing | number; // marginTop
  mb?: keyof typeof Spacing | number; // marginBottom
  ml?: keyof typeof Spacing | number; // marginLeft
  mr?: keyof typeof Spacing | number; // marginRight
  mx?: keyof typeof Spacing | number; // marginHorizontal
  my?: keyof typeof Spacing | number; // marginVertical
  
  // Text decoration
  underline?: boolean;
  italic?: boolean;
  
  // Line height
  lineHeight?: number;
  
  // Number of lines
  lines?: number;
  
  // Style override
  style?: TextStyle;
}

export function CText({
  children,
  variant = 'body',
  size,
  weight,
  bold,
  color = 'text',
  center,
  right,
  mt,
  mb,
  ml,
  mr,
  mx,
  my,
  underline,
  italic,
  lineHeight,
  lines,
  style,
  ...props
}: CTextProps) {
  const { colors } = useTheme();

  const getSpacingValue = (value: keyof typeof Spacing | number | undefined) => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return hp(value);
    return Spacing[value];
  };

  const getFontSize = () => {
    if (size) {
      if (typeof size === 'string' && size in FontSize) {
        return FontSize[size as keyof typeof FontSize];
      }
      if (typeof size === 'number') return wp(size);
      return FontSize.body;
    }
    return FontSize[variant] || FontSize.body;
  };

  const getFontWeight = () => {
    if (bold) return '700';
    if (weight) {
      switch (weight) {
        case 'medium':
          return '500';
        case 'semibold':
          return '600';
        case 'bold':
          return '700';
        default:
          return 'normal';
      }
    }
    
    // Default weights for variants
    switch (variant) {
      case 'h1':
      case 'h2':
        return '700';
      case 'h3':
        return '600';
      case 'caption':
        return '500';
      default:
        return 'normal';
    }
  };

  const getTextColor = () => {
    if (color.startsWith('#') || color.startsWith('rgb')) {
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
      default:
        return colors.text;
    }
  };

  const getTextAlign = () => {
    if (center) return 'center';
    if (right) return 'right';
    return 'left';
  };

  const dynamicStyles: TextStyle = {
    fontSize: getFontSize(),
    fontWeight: getFontWeight() as any,
    color: getTextColor(),
    textAlign: getTextAlign() as 'left' | 'center' | 'right',
    
    // Margins using layout constants
    marginTop: getSpacingValue(mt),
    marginBottom: getSpacingValue(mb),
    marginLeft: getSpacingValue(ml),
    marginRight: getSpacingValue(mr),
    marginHorizontal: getSpacingValue(mx),
    marginVertical: getSpacingValue(my),
    
    // Text decoration
    textDecorationLine: underline ? 'underline' : 'none',
    fontStyle: italic ? 'italic' : 'normal',
    lineHeight: lineHeight ? wp(lineHeight) : undefined,
  };

  return (
    <Text
      style={[dynamicStyles, style]}
      numberOfLines={lines}
      {...props}
    >
      {children}
    </Text>
  );
}