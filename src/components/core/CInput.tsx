import React, { useState } from 'react';
import { TextInput, TextInputProps, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useTheme } from '../../hooks/useTheme';
import { CView } from './CView';
import { CText } from './CText';

export interface CInputProps extends TextInputProps {
  // Label and placeholder
  label?: string;
  placeholder?: string;
  
  // Validation
  error?: string;
  required?: boolean;
  
  // Styling variants
  variant?: 'default' | 'rounded' | 'underlined';
  
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
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  
  // Icons
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  
  // States
  disabled?: boolean;
  
  // Input type helpers
  isPassword?: boolean;
  showPasswordToggle?: boolean;
  
  // Background color
  bg?: 'card' | 'background' | 'surface' | 'transparent';
}

export function CInput({
  label,
  placeholder,
  error,
  required,
  variant = 'default',
  size = 'medium',
  width,
  height,
  widthPercent,
  heightPercent,
  fullWidth,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  leftIcon,
  rightIcon,
  disabled,
  isPassword,
  showPasswordToggle,
  bg = 'card',
  style,
  value,
  onChangeText,
  ...props
}: CInputProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return {
          fontSize: 3.5,
          paddingVertical: hp(1),
          paddingHorizontal: wp(3),
          borderRadius: wp(2.5),
          minHeight: hp(4),
        };
      case 'large':
        return {
          fontSize: 4.5,
          paddingVertical: hp(2),
          paddingHorizontal: wp(5),
          borderRadius: wp(4),
          minHeight: hp(6.5),
        };
      default: // medium
        return {
          fontSize: 4,
          paddingVertical: hp(1.5),
          paddingHorizontal: wp(4),
          borderRadius: wp(3),
          minHeight: hp(5),
        };
    }
  };

  const sizeConfig = getSizeConfig();

  const getBackgroundColor = () => {
    switch (bg) {
      case 'card':
        return colors.card;
      case 'background':
        return colors.background;
      case 'surface':
        return colors.muted;
      case 'transparent':
        return 'transparent';
      default:
        return colors.card;
    }
  };

  const getBorderColor = () => {
    if (error) return colors.danger;
    if (isFocused) return colors.primary;
    return colors.border;
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'rounded':
        return {
          borderRadius: wp(6),
          borderWidth: 1,
        };
      case 'underlined':
        return {
          borderRadius: 0,
          borderWidth: 0,
          borderBottomWidth: 1,
          backgroundColor: 'transparent',
        };
      default: // default
        return {
          borderRadius: sizeConfig.borderRadius,
          borderWidth: 1,
        };
    }
  };

  const variantStyles = getVariantStyles();

  const inputStyles = StyleSheet.create({
    container: {
      width: fullWidth ? '100%' : widthPercent ? wp(widthPercent) : width,
      marginTop: marginTop ? hp(marginTop) : 0,
      marginBottom: marginBottom ? hp(marginBottom) : 0,
      marginLeft: marginLeft ? wp(marginLeft) : 0,
      marginRight: marginRight ? wp(marginRight) : 0,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: variantStyles.backgroundColor || getBackgroundColor(),
      borderColor: getBorderColor(),
      borderWidth: variantStyles.borderWidth,
      borderBottomWidth: variantStyles.borderBottomWidth || variantStyles.borderWidth,
      borderRadius: variantStyles.borderRadius,
      minHeight: sizeConfig.minHeight,
      paddingHorizontal: leftIcon || rightIcon ? wp(2) : sizeConfig.paddingHorizontal,
    },
    input: {
      flex: 1,
      fontSize: wp(sizeConfig.fontSize),
      color: colors.text,
      paddingVertical: sizeConfig.paddingVertical,
      paddingHorizontal: leftIcon ? wp(2) : 0,
      paddingRight: rightIcon || (isPassword && showPasswordToggle) ? wp(2) : 0,
    },
    iconContainer: {
      paddingHorizontal: wp(2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      marginTop: hp(0.5),
    },
  });

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderPasswordToggle = () => {
    if (!isPassword || !showPasswordToggle) return null;
    
    return (
      <TouchableOpacity
        style={inputStyles.iconContainer}
        onPress={togglePasswordVisibility}
      >
        <CText variant="bodySmall" color="textSecondary">
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </CText>
      </TouchableOpacity>
    );
  };

  return (
    <CView style={inputStyles.container}>
      {label && (
        <CText
          variant="bodySmall"
          color="text"
          mb="xs"
          bold
        >
          {label}
          {required && (
            <CText color="danger">
              {' *'}
            </CText>
          )}
        </CText>
      )}
      
      <CView style={inputStyles.inputContainer}>
        {leftIcon && (
          <CView style={inputStyles.iconContainer}>
            {leftIcon}
          </CView>
        )}
        
        <TextInput
          style={[inputStyles.input, style]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={isPassword && !showPassword}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {rightIcon && (
          <CView style={inputStyles.iconContainer}>
            {rightIcon}
          </CView>
        )}
        
        {renderPasswordToggle()}
      </CView>
      
      {error && (
        <CView style={inputStyles.errorContainer}>
          <CText
            variant="caption"
            color="danger"
          >
            {error}
          </CText>
        </CView>
      )}
    </CView>
  );
}