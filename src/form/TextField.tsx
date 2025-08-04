import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { useTheme } from '../hooks/useTheme';
import { Body } from '../theme/Typo';

interface TextFieldProps extends TextInputProps {
  name: string;
  placeholder: string;
  rightIcon?: React.ReactNode; // New prop for right icon
}

export function TextField({ name, label, style, ...props }: TextFieldProps) {
  const { colors } = useTheme();
  const { control, formState: { errors } } = useFormContext();
  
  const error = errors[name]?.message as string;

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    label: {
      marginBottom: 8,
    },
    input: {
      backgroundColor: colors.card,
      color: colors.text,
      borderColor: error ? colors.danger : colors.border,
      borderWidth: error ? 2 : 1,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
    },
    errorText: {
      color: colors.danger,
      marginTop: 4,
      fontSize: 14,
    },
    inputContainer: {
      position: 'relative',
    },
    inputError: {
      borderColor: colors.danger,
      borderWidth: 2,
    },
    rightIcon: {
      position: 'absolute',
      right: 16,
      top: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {label && (
        <Body style={styles.label}>{label}</Body>
      )}
      
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View style={styles.container}>
            <View style={[styles.inputContainer, error ? styles.inputError : null]}>
              <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={colors.textSecondary}
                {...props}
              />
              {props.rightIcon && <View style={styles.rightIcon}>{props.rightIcon}</View>}
            </View>
            {error && (
              <Body style={styles.errorText}>{error.message}</Body>
            )}
          </View>
        )}
      />
      
      {error && (
        <Body style={styles.errorText}>{error}</Body>
      )}
    </View>
  );
} 