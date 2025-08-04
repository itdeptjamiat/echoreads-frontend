import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { FormProvider, TextField, useFormContext } from '../../src/form';
import { CustomButton } from '../../src/components/CustomButton';
import { signupSchema, SignupFormData } from '../../src/form/schemas/authSchema';
import { signupUser } from '../../src/redux/actions/authActions';
import { selectAuthLoading, selectAuthError } from '../../src/redux/slices/selectState';
import { AppDispatch } from '../../src/redux/store';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  FadeIn,
  SlideInLeft,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence
} from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

// Component to access form context
function SubmitButton({ isLoading }: { isLoading: boolean }) {
  const { handleSubmit } = useFormContext();
  const { colors } = useTheme();

  return (
    <Animated.View 
      style={{ marginTop: 24 }}
      entering={FadeInUp.delay(1000).duration(600)}
    >
      <CustomButton
        label={isLoading ? "Creating Account..." : "Create Account"}
        onPress={handleSubmit}
        disabled={isLoading}
        variant="gradient"
        gradientColors={colors.gradientSecondary}
        accessibilityLabel="Create account button"
        accessible={true}
      />
    </Animated.View>
  );
}

export default function SignupScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useTheme();
  const isLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const shakeAnimation = useSharedValue(0);

  const shakeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeAnimation.value }],
    };
  });

  const handleSubmit = async (data: SignupFormData) => {
    try {
      await dispatch(signupUser({
        email: data.email.trim(),
        username: data.email.trim().split('@')[0],
        password: data.password,
        name: data.email.trim().split('@')[0],
      })).unwrap();
      
      // Navigate to subscription page after successful signup
      router.push('/(onboarding)/choosePlan');
    } catch (error: any) {
      // Shake animation on error
      shakeAnimation.value = withSequence(
        withSpring(-10, { duration: 100 }),
        withSpring(10, { duration: 100 }),
        withSpring(-5, { duration: 100 }),
        withSpring(0, { duration: 100 })
      );
      
      Alert.alert('Signup Failed', error || 'An error occurred during signup');
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
    scrollContainer: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
      paddingVertical: 40,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 40,
    },
    logoCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      elevation: 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    title: {
      textAlign: 'center',
      marginBottom: 8,
      color: colors.text,
      fontSize: 32,
      fontWeight: '700',
    },
    subtitle: {
      textAlign: 'center',
      color: colors.textSecondary,
      fontSize: 16,
      lineHeight: 24,
    },
    formContainer: {
      marginBottom: 32,
    },
    inputSpacing: {
      marginBottom: 20,
    },
    termsContainer: {
      marginTop: 16,
      paddingHorizontal: 16,
    },
    termsText: {
      color: colors.textSecondary,
      fontSize: 12,
      textAlign: 'center',
      lineHeight: 18,
    },
    termsLink: {
      color: colors.primary,
      fontWeight: '500',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 32,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      marginHorizontal: 16,
      color: colors.textSecondary,
      fontSize: 14,
    },
    signinContainer: {
      alignItems: 'center',
    },
    signinText: {
      color: colors.textSecondary,
      fontSize: 14,
      marginBottom: 16,
    },
    errorContainer: {
      marginTop: 16,
      padding: 12,
      backgroundColor: colors.destructive + '20',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.destructive + '40',
    },
    errorText: {
      color: colors.destructive,
      fontSize: 14,
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={colors.gradientSecondary}
        style={styles.gradientOverlay}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <KeyboardAvoidingView 
        style={styles.scrollContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View 
            style={styles.logoContainer}
            entering={FadeIn.delay(200).duration(800)}
          >
            <Animated.View 
              style={styles.logoCircle}
              entering={FadeInDown.delay(400).duration(600)}
            >
              <Ionicons 
                name="person-add-outline" 
                size={40} 
                color={colors.accent} 
              />
            </Animated.View>
            
            <Animated.View entering={SlideInLeft.delay(600).duration(600)}>
              <H1 style={styles.title}>Join EchoReads</H1>
            </Animated.View>
            
            <Animated.View entering={SlideInRight.delay(700).duration(600)}>
              <Body style={styles.subtitle}>
                Create your account and start exploring premium content
              </Body>
            </Animated.View>
          </Animated.View>

          <Animated.View 
            style={[styles.formContainer, shakeStyle]}
            entering={FadeInUp.delay(500).duration(600)}
          >
            <FormProvider
              schema={signupSchema}
              defaultValues={{ email: '', password: '', confirmPassword: '' }}
              onSubmit={handleSubmit}
            >
              <Animated.View 
                style={styles.inputSpacing}
                entering={FadeInUp.delay(600).duration(600)}
              >
                <TextField
                  name="email"
                  placeholder="Email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  accessibilityLabel="Email input field"
                  accessible={true}
                />
              </Animated.View>

              <Animated.View 
                style={styles.inputSpacing}
                entering={FadeInUp.delay(700).duration(600)}
              >
                <TextField
                  name="password"
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="new-password"
                  accessibilityLabel="Password input field"
                  accessible={true}
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
              </Animated.View>

              <Animated.View 
                style={styles.inputSpacing}
                entering={FadeInUp.delay(800).duration(600)}
              >
                <TextField
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="new-password"
                  accessibilityLabel="Confirm password input field"
                  accessible={true}
                  rightIcon={(
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <Ionicons 
                        name={showConfirmPassword ? 'eye-off' : 'eye'} 
                        size={24} 
                        color={colors.textSecondary} 
                      />
                    </TouchableOpacity>
                  )}
                />
              </Animated.View>

              {authError && (
                <Animated.View 
                  style={styles.errorContainer}
                  entering={FadeInDown.duration(400)}
                >
                  <Body style={styles.errorText}>{authError}</Body>
                </Animated.View>
              )}

              <SubmitButton isLoading={isLoading} />

              <Animated.View 
                style={styles.termsContainer}
                entering={FadeInUp.delay(1100).duration(600)}
              >
                <Body style={styles.termsText}>
                  By creating an account, you agree to our{' '}
                  <Body style={styles.termsLink}>Terms of Service</Body>
                  {' '}and{' '}
                  <Body style={styles.termsLink}>Privacy Policy</Body>
                </Body>
              </Animated.View>
            </FormProvider>
          </Animated.View>

          <Animated.View 
            style={styles.dividerContainer}
            entering={FadeIn.delay(1200).duration(600)}
          >
            <View style={styles.dividerLine} />
            <Body style={styles.dividerText}>or</Body>
            <View style={styles.dividerLine} />
          </Animated.View>

          <Animated.View 
            style={styles.signinContainer}
            entering={FadeInUp.delay(1300).duration(600)}
          >
            <Body style={styles.signinText}>
              Already have an account?
            </Body>
            <CustomButton
              label="Sign In"
              variant="ghost"
              onPress={() => router.push('/(auth)/')}
              accessibilityLabel="Sign in button"
              accessible={true}
            />
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}