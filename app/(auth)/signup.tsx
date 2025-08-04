import React from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { FormProvider, TextField } from '../../src/form';
import { CustomButton } from '../../src/components/CustomButton';
import { signupSchema, SignupFormData } from '../../src/form/schemas/authSchema';
import { signupUser } from '../../src/redux/actions/authActions';
import { selectAuthLoading, selectAuthError } from '../../src/redux/slices/selectState';
import { AppDispatch } from '../../src/redux/store';

export default function SignupScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useTheme();
  const isLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  const handleSubmit = async (data: SignupFormData) => {
    try {
      await dispatch(signupUser({
        email: data.email.trim(),
        username: data.email.trim().split('@')[0], // Use email prefix as username
        password: data.password,
        name: data.email.trim().split('@')[0], // Use email prefix as name
      })).unwrap();
    } catch (error: any) {
      Alert.alert('Signup Failed', error || 'An error occurred during signup');
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
        accessibilityLabel="Signup form scroll view"
      >
        <View style={styles.headerContainer}>
          <H1 center b style={styles.title}>
            Create Account
          </H1>
          
          <Body center style={styles.subtitle}>
            Join EchoReads and start your reading journey
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
            schema={signupSchema}
            defaultValues={{
              email: '',
              password: '',
              confirmPassword: '',
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
              autoComplete="new-password"
              accessibilityLabel="Password input field"
              accessible={true}
            />

            <TextField
              name="confirmPassword"
              placeholder="Confirm Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
              accessibilityLabel="Confirm password input field"
              accessible={true}
            />

            <View style={styles.buttonContainer}>
              <CustomButton
                label={isLoading ? "Creating Account..." : "Create Account"}
                onPress={() => {
                  // Form submission is handled by FormProvider
                }}
                disabled={isLoading}
                accessibilityLabel="Create account button"
                accessible={true}
              />
            </View>
          </FormProvider>
        </View>

        <View style={styles.footerContainer}>
          <Body center style={styles.footerText}>
            Already have an account?
          </Body>
          <CustomButton
            label="Sign In"
            variant="ghost"
            onPress={() => {
              // TODO: Navigate to login
              console.log('Navigate to login');
            }}
            accessibilityLabel="Sign in button"
            accessible={true}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 