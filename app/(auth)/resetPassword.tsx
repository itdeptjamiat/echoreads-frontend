import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from 'react-native';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { FormProvider, TextField, useFormContext } from '../../src/form';
import { CustomButton } from '../../src/components/CustomButton';
import { resetPasswordSchema, ResetPasswordFormData } from '../../src/form/schemas/authSchema';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../src/redux/actions/authActions';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ResetPasswordScreen() {
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Update handleSubmit to map data
  const handleSubmit = async (data) => {
    try {
      const payload = {
        email: data.email, // Assume email is in form or from params
        otp: data.otp,
        newPassword: data.newPassword,
        confirmPassword: data.confirmNewPassword
      };
      await dispatch(resetPassword(payload)).unwrap();
      Alert.alert('Success', 'Password reset successful');
      router.push('/(auth)/');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to reset password');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      padding: 24,
      justifyContent: 'center',
    },
    title: {
      marginBottom: 32,
    },
    subtitle: {
      marginBottom: 32,
      textAlign: 'center',
    },
    formContainer: {
      marginBottom: 24,
    },
    buttonContainer: {
      marginTop: 16,
    },
  });

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <H1 center b style={styles.title}>
          Reset Password
        </H1>
        
        <Body center style={styles.subtitle}>
          Enter your new password below
        </Body>

        <View style={styles.formContainer}>
          <FormProvider
            schema={resetPasswordSchema}
            defaultValues={{
              newPassword: '',
              confirmNewPassword: '',
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              name="newPassword"
              placeholder="New Password"
              secureTextEntry={!showNewPassword}
              rightIcon={(
                <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                  <Ionicons name={showNewPassword ? 'eye-off' : 'eye'} size={24} color={colors.textSecondary} />
                </TouchableOpacity>
              )}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
            />

            <TextField
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              secureTextEntry={!showConfirmPassword}
              rightIcon={(
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color={colors.textSecondary} />
                </TouchableOpacity>
              )}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
            />

            <View style={styles.buttonContainer}>
              <SubmitButton />
            </View>
          </FormProvider>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 

function SubmitButton() {
  const { handleSubmit } = useFormContext();
  return (
    <CustomButton
      label="Reset Password"
      onPress={handleSubmit}
      accessibilityLabel="Reset password button"
      accessible={true}
    />
  );
} 