import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { CButton, CIcon } from './core';
import { Spacing } from '../constants/layout';

interface CustomButtonProps extends TouchableOpacityProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'gradient';
  gradientColors?: string[];
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export function CustomButton({ 
  label, 
  onPress, 
  variant = 'primary', 
  gradientColors,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  size = 'medium',
  fullWidth = false,
  style, 
  ...props 
}: CustomButtonProps) {
  
  // Map old variants to new core component variants
  const getVariant = () => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'ghost':
        return 'ghost';
      case 'gradient':
        return 'gradient';
      default:
        return 'primary';
    }
  };

  return (
    <CButton
      title={label}
      variant={getVariant()}
      size={size}
      fullWidth={fullWidth}
      loading={loading}
      disabled={disabled}
      gradientColors={gradientColors}
      leftIcon={leftIcon ? <CIcon name={leftIcon} size={4} color="text" /> : undefined}
      rightIcon={rightIcon ? <CIcon name={rightIcon} size={4} color="text" /> : undefined}
      onPress={onPress}
      style={style}
      {...props}
    />
  );
} 