import React from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { FormProvider, TextField } from '../../src/form';
import { CustomButton } from '../../src/components/CustomButton';
import { signupSchema, SignupFormData } from '../../src/form/schemas/authSchema';

export default function SignupScreen() {
  const { colors } = useTheme();

  const handleSubmit = async (data: SignupFormData) => {
    try {
      console.log('Signup attempt:', data.email);
      // TODO: Implement signup logic with Redux
      // await dispatch(signupUser(data)).unwrap();
    } catch (error) {
      console.error('Signup failed:', error);
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
          Create Account
        </H1>
        
        <Body center style={styles.subtitle}>
          Join EchoReads and start your reading journey
        </Body>

        <View style={styles.formContainer}>
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
            />

            <TextField
              name="password"
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
            />

            <TextField
              name="confirmPassword"
              placeholder="Confirm Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
            />

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Create Account"
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