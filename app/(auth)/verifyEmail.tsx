import React from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { FormProvider, TextField, useFormContext } from '../../src/form';
import { CustomButton } from '../../src/components/CustomButton';
import { verifyEmailSchema, VerifyEmailFormData } from '../../src/form/schemas/authSchema';
import { useDispatch } from 'react-redux';
import { confirmEmail } from '../../src/redux/actions/authActions';
import { router } from 'expo-router';

export default function VerifyEmailScreen() {
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const handleSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        otp: data.otpCode
      };
      await dispatch(confirmEmail(payload)).unwrap();
      Alert.alert('Success', 'Email verified successfully');
      router.push('/(auth)/');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to verify email');
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
              placeholder="OTP Code"
              keyboardType="number-pad"
              maxLength={6}
              autoComplete="one-time-code"
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
      label="Verify Email"
      onPress={handleSubmit}
      accessibilityLabel="Verify email button"
      accessible={true}
    />
  );
} 