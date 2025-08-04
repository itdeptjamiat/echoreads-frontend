import React from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { FormProvider, TextField, useFormContext } from '../../src/form';
import { CustomButton } from '../../src/components/CustomButton';
import { forgotPasswordSchema, ForgotPasswordFormData } from '../../src/form/schemas/authSchema';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../src/redux/actions/authActions';
import { router } from 'expo-router';

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const handleSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await dispatch(forgotPassword(data)).unwrap();
      Alert.alert('Success', 'Password reset link sent to your email');
      router.push('/(auth)/verifyEmail'); // Assuming verification is needed
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send reset link');
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
    footerContainer: {
      marginTop: 24,
      alignItems: 'center',
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
              <SubmitButton />
            </View>
          </FormProvider>
        </View>
        <View style={styles.footerContainer}>
          <CustomButton
            label="Back to Sign In"
            variant="ghost"
            onPress={() => router.push('/(auth)/')}
            accessibilityLabel="Back to sign in"
            accessible={true}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 

function SubmitButton() {
  const { handleSubmit } = useFormContext();
  return (
    <CustomButton
      label="Send Reset Link"
      onPress={handleSubmit}
      accessibilityLabel="Send reset link button"
      accessible={true}
    />
  );
} 