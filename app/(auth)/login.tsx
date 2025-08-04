import React from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { FormProvider, TextField } from '../../src/form';
import { CustomButton } from '../../src/components/CustomButton';
import { loginSchema, LoginFormData } from '../../src/form/schemas/authSchema';

export default function LoginScreen() {
  const { colors } = useTheme();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      console.log('Login attempt:', data.email);
      // TODO: Implement login logic with Redux
      // await dispatch(loginUser(data)).unwrap();
    } catch (error) {
      console.error('Login failed:', error);
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
          Welcome Back
        </H1>
        
        <Body center style={styles.subtitle}>
          Sign in to your EchoReads account
        </Body>

        <View style={styles.formContainer}>
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
            />

            <TextField
              name="password"
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
            />

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Sign In"
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