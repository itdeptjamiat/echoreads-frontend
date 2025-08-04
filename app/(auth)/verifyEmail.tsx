import React from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { FormProvider, TextField } from '../../src/form';
import { CustomButton } from '../../src/components/CustomButton';
import { verifyEmailSchema, VerifyEmailFormData } from '../../src/form/schemas/authSchema';

export default function VerifyEmailScreen() {
  const { colors } = useTheme();

  const handleSubmit = async (data: VerifyEmailFormData) => {
    try {
      console.log('Email verification attempt:', data.email);
      // TODO: Implement email verification logic with Redux
      // await dispatch(verifyEmail(data)).unwrap();
    } catch (error) {
      console.error('Email verification failed:', error);
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
          Verify Your Email
        </H1>
        
        <Body center style={styles.subtitle}>
          Enter the 6-digit code sent to your email address
        </Body>

        <View style={styles.formContainer}>
          <FormProvider
            schema={verifyEmailSchema}
            defaultValues={{
              email: '',
              otpCode: '',
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

            <TextField
              name="otpCode"
              placeholder="Enter 6-digit code"
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={6}
            />

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Verify Email"
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