import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Body } from '../theme/Typo';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
}

export function CustomButton({ 
  title, 
  variant = 'primary', 
  loading = false, 
  style, 
  disabled,
  ...props 
}: CustomButtonProps) {
  const { colors } = useTheme();

  const getButtonStyle = () => {
    const baseStyle = {
      padding: 16,
      borderRadius: 8,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      opacity: (disabled || loading) ? 0.6 : 1,
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
          backgroundColor: colors.secondary,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.border,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return { color: colors.text };
      default:
        return { color: colors.card };
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      disabled={disabled || loading}
      {...props}
    >
      <Body b center style={getTextStyle()}>
        {loading ? 'Loading...' : title}
      </Body>
    </TouchableOpacity>
  );
} 