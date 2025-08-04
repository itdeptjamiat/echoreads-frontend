import React from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { FormProvider, TextField } from '../../src/form';
import { CustomButton } from '../../src/components/CustomButton';
import { resetPasswordSchema, ResetPasswordFormData } from '../../src/form/schemas/authSchema';

export default function ResetPasswordScreen() {
  const { colors } = useTheme();

  const handleSubmit = async (data: ResetPasswordFormData) => {
    try {
      console.log('Password reset attempt');
      // TODO: Implement password reset logic with Redux
      // await dispatch(resetPassword(data)).unwrap();
    } catch (error) {
      console.error('Password reset failed:', error);
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
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
            />

            <TextField
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
            />

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Reset Password"
                onPress={() => {
                  // Form submission is handled by FormProvider
                }}
              />
            </View>
          </FormProvider>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 