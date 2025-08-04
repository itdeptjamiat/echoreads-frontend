import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { useTheme } from '../hooks/useTheme';
import { Body } from '../theme/Typo';

interface TextFieldProps extends Omit<TextInputProps, 'onChangeText' | 'onBlur' | 'value'> {
  name: string;
  label?: string;
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
  });

  return (
    <View style={styles.container}>
      {label && (
        <Body style={styles.label}>{label}</Body>
      )}
      
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            {...props}
            style={[styles.input, style]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor={colors.border}
          />
        )}
      />
      
      {error && (
        <Body style={styles.errorText}>{error}</Body>
      )}
    </View>
  );
} 