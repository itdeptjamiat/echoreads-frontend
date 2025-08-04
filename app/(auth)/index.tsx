import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { FormProvider, TextField, useFormContext } from '../../src/form';
import { CustomButton } from '../../src/components/CustomButton';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { loginSchema, LoginFormData } from '../../src/form/schemas/authSchema';
import { loginUser } from '../../src/redux/actions/authActions';
import { selectAuthLoading, selectAuthError } from '../../src/redux/slices/selectState';
import { AppDispatch } from '../../src/redux/store';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Component to access form context
function SubmitButton({ isLoading }: { isLoading: boolean }) {
  const { handleSubmit } = useFormContext();
  const { colors } = useTheme();

  return (
    <View style={{ marginTop: 24 }}>
      <CustomButton
        label={isLoading ? "Signing In..." : "Sign In"}
        onPress={handleSubmit}
        disabled={isLoading}
        variant="gradient"
        gradientColors={colors.gradientPrimary}
        accessibilityLabel="Sign in button"
        accessible={true}
      />
    </View>
  );
}

export default function LoginScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useTheme();
  const isLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(loginUser({
        email: data.email.trim(),
        password: data.password
      })).unwrap();
      
      // Navigate to subscription page after successful login
      router.push('/(onboarding)/choosePlan');
    } catch (error: any) {
      Alert.alert('Login Failed', error || 'An error occurred during login');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    gradientOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 200,
      opacity: 0.1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
    },
    header: {
      marginTop: 40,
      marginBottom: 32,
    },
    title: {
      marginBottom: 12,
    },
    form: {
      marginTop: 24,
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginTop: 12,
      marginBottom: 24,
    },
    forgotPasswordText: {
      color: colors.primary,
    },
    footer: {
      marginTop: 'auto',
      paddingBottom: 24,
      alignItems: 'center',
    },
    signupPrompt: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
    },
    signupButton: {
      marginLeft: 4,
    },
    signupText: {
      color: colors.primary,
      fontWeight: '600',
    }
  });

  return (
    <ScreenWrapper
      safeArea={true}
      keyboardAvoiding={true}
      style={styles.container}
    >
      <LinearGradient
        colors={colors.gradientPrimary}
        style={styles.gradientOverlay}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <H1 style={styles.title}>Welcome Back!</H1>
          <Body>Sign in to continue reading</Body>
        </View>

        <FormProvider
          schema={loginSchema}
          defaultValues={{
            email: '',
            password: '',
          }}
          onSubmit={handleSubmit}
        >
          <View style={styles.form}>
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
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              rightIcon={(
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={24} 
                    color={colors.textSecondary} 
                  />
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={() => router.push('/(auth)/forgotPassword')}
            >
              <Body style={styles.forgotPasswordText}>
                Forgot Password?
              </Body>
            </TouchableOpacity>

            <SubmitButton isLoading={isLoading} />
          </View>
        </FormProvider>

        <View style={styles.footer}>
          <View style={styles.signupPrompt}>
            <Body>Don't have an account?</Body>
            <TouchableOpacity 
              style={styles.signupButton}
              onPress={() => router.push('/(auth)/signup')}
            >
              <Body style={styles.signupText}>Sign Up</Body>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}