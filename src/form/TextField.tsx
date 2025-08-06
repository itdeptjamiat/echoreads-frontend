import React from 'react';
import { TextInputProps } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import { CInput, CText, CView, CIcon } from '../components/core';
import { Spacing } from '../constants/layout';

interface TextFieldProps extends TextInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  error?: string;
  required?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

export function TextField({
  name,
  control,
  label,
  error,
  required,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  ...props
}: TextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error: fieldError } }) => (
        <CView mb="md">
          {label && (
            <CText 
              variant="bodySmall" 
              color="textSecondary" 
              mb="xs"
              bold
            >
              {label}
              {required && <CText color="danger"> *</CText>}
            </CText>
          )}
          
          <CInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            leftIcon={leftIcon ? <CIcon name={leftIcon} size={4} color="textSecondary" /> : undefined}
            rightIcon={rightIcon ? <CIcon name={rightIcon} size={4} color="textSecondary" onPress={onRightIconPress} /> : undefined}
            error={fieldError?.message || error}
            style={style}
            {...props}
          />
          
          {/* {(fieldError?.message || error) && (
            <CText 
              variant="caption" 
              color="danger" 
              mt="xs"
            >
              {fieldError?.message || error}
            </CText>
          )} */}
        </CView>
      )}
    />
  );
} 