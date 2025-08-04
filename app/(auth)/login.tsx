import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { FormProvider, TextField } from '../../src/form';
import { CustomButton } from '../../src/components/CustomButton';
import { loginSchema, LoginFormData } from '../../src/form/schemas/authSchema';
import { loginUser } from '../../src/redux/actions/authActions';
import { selectAuthLoading, selectAuthError } from '../../src/redux/slices/selectState';
import { AppDispatch } from '../../src/redux/store';

export default function LoginScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useTheme();
  const isLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  const handleSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(loginUser({
        email: data.email.trim(),
        password: data.password
      })).unwrap();
    } catch (error: any) {
      Alert.alert('Login Failed', error || 'An error occurred during login');
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
    headerContainer: {
      alignItems: 'center',
      marginBottom: 48,
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: 24,
      borderRadius: 16,
    },
    title: {
      marginBottom: 12,
      color: colors.text,
    },
    subtitle: {
      marginBottom: 32,
      textAlign: 'center',
      color: colors.textSecondary,
    },
    formContainer: {
      marginBottom: 32,
    },
    errorContainer: {
      backgroundColor: colors.danger + '10',
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.danger + '30',
    },
    errorText: {
      color: colors.danger,
      textAlign: 'center',
    },
    buttonContainer: {
      marginTop: 24,
    },
    footerContainer: {
      marginTop: 32,
      alignItems: 'center',
    },
    footerText: {
      color: colors.textSecondary,
      marginBottom: 8,
    },
    linkText: {
      color: colors.primary,
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
        accessibilityLabel="Login form scroll view"
      >
        <View style={styles.headerContainer}>
          <H1 center b style={styles.title}>
            Welcome Back
          </H1>
          
          <Body center style={styles.subtitle}>
            Sign in to your EchoReads account
          </Body>
        </View>

        <View style={styles.formContainer}>
          {authError && (
            <View style={styles.errorContainer} accessibilityLabel="Error message">
              <Body center style={styles.errorText}>
                {authError}
              </Body>
            </View>
          )}

          <FormProvider
            schema={loginSchema}
            defaultValues={{
              email: '',
              password: '',
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
              accessibilityLabel="Email input field"
              accessible={true}
            />

            <TextField
              name="password"
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              accessibilityLabel="Password input field"
              accessible={true}
            />

            <View style={styles.buttonContainer}>
              <CustomButton
                label={isLoading ? "Signing In..." : "Sign In"}
                onPress={() => {
                  // Form submission is handled by FormProvider
                }}
                disabled={isLoading}
                accessibilityLabel="Sign in button"
                accessible={true}
              />
            </View>
          </FormProvider>
        </View>

        <View style={styles.footerContainer}>
          <Body center style={styles.footerText}>
            Don't have an account?
          </Body>
          <CustomButton
            label="Create Account"
            variant="ghost"
            onPress={() => {
              // TODO: Navigate to signup
              console.log('Navigate to signup');
            }}
            accessibilityLabel="Create account button"
            accessible={true}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 