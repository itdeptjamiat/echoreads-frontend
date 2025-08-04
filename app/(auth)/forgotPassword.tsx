import React from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { FormProvider, TextField } from '../../src/form';
import { CustomButton } from '../../src/components/CustomButton';
import { forgotPasswordSchema, ForgotPasswordFormData } from '../../src/form/schemas/authSchema';

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    try {
      console.log('Forgot password request:', data.email);
      // TODO: Implement forgot password logic with Redux
      // await dispatch(forgotPassword(data)).unwrap();
    } catch (error) {
      console.error('Forgot password failed:', error);
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
          Forgot Password
        </H1>
        
        <Body center style={styles.subtitle}>
          Enter your email address and we'll send you a link to reset your password
        </Body>

        <View style={styles.formContainer}>
          <FormProvider
            schema={forgotPasswordSchema}
            defaultValues={{
              email: '',
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
            />

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Send Reset Link"
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