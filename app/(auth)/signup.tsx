import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { CView, CText, CButton, CIcon, CScrollView } from '../../src/components/core';
import { Spacing, Radius, Shadow } from '../../src/constants/layout';
import { useTheme } from '../../src/hooks/useTheme';
import { FormProvider, TextField, useFormContext } from '../../src/form';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { signupSchema, SignupFormData } from '../../src/form/schemas/authSchema';
import { signupUser } from '../../src/redux/actions/authActions';
import { selectAuthLoading, selectAuthError } from '../../src/redux/slices/selectState';
import { AppDispatch } from '../../src/redux/store';
import { router } from 'expo-router';
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

// Component to access form context
function FormFields({
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
}) {
  const { methods } = useFormContext();

  return (
    <CView>
      <Animated.View entering={FadeInUp.delay(600).duration(600)}>
        <TextField
          name="email"
          control={methods.control}
          label="Email"
          placeholder="Enter your email address"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          leftIcon="mail"
          required
        />
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(700).duration(600)}>
        <TextField
          name="password"
          control={methods.control}
          label="Password"
          placeholder="Create a password"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="new-password"
          leftIcon="lock-closed"
          rightIcon={showPassword ? 'eye-off' : 'eye'}
          onRightIconPress={() => setShowPassword(!showPassword)}
          required
        />
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(800).duration(600)}>
        <TextField
          name="confirmPassword"
          control={methods.control}
          label="Confirm Password"
          placeholder="Confirm your password"
          secureTextEntry={!showConfirmPassword}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="new-password"
          leftIcon="shield-checkmark"
          rightIcon={showConfirmPassword ? 'eye-off' : 'eye'}
          onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          required
        />
      </Animated.View>
    </CView>
  );
}

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  const { handleSubmit } = useFormContext();
  const { colors } = useTheme();

  return (
    <Animated.View 
      entering={FadeInUp.delay(1000).duration(600)}
    >
      <CView mt="xl">
        <CButton
          title={isLoading ? "Creating Account..." : "Create Account"}
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
          variant="gradient"
          gradientColors={colors.gradientSecondary}
          size="large"
          fullWidth
          accessibilityLabel="Create account button"
        />
      </CView>
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
      
      // Navigate to main app after successful signup
      router.push('/(tabs)/');
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

  return (
    <ScreenWrapper
      safeArea={true}
      keyboardAvoiding={true}
    >
      {/* Gradient Background */}
      <LinearGradient
        colors={colors.gradientSecondary}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 300,
          opacity: 0.1,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <CScrollView 
        px="lg"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo and Header Section */}
        <Animated.View 
          entering={FadeIn.delay(200).duration(800)}
        >
          <CView center mt="xxl" mb="xl">
            <Animated.View 
              entering={FadeInDown.delay(400).duration(600)}
            >
              <CView 
                width={80}
                height={80}
                borderRadius="full"
                bg="card"
                center
                shadow="lg"
                mb="md"
              >
                <CIcon 
                  name="person-add-outline" 
                  size={8} 
                  color="accent"
                />
              </CView>
            </Animated.View>
            
            <Animated.View entering={SlideInLeft.delay(600).duration(600)}>
              <CText 
                variant="h1" 
                bold 
                center
                mb="sm"
              >
                Join EchoReads
              </CText>
            </Animated.View>
            
            <Animated.View entering={SlideInRight.delay(700).duration(600)}>
              <CText 
                variant="bodyLarge" 
                color="textSecondary"
                center
                lines={2}
              >
                Create your account and start exploring premium content
              </CText>
            </Animated.View>
          </CView>
        </Animated.View>

        {/* Form Section */}
        <Animated.View 
          style={shakeStyle}
          entering={FadeInUp.delay(500).duration(600)}
        >
          <CView 
            bg="card" 
            p="xl" 
            borderRadius="xl"
            shadow="lg"
            mb="lg"
          >
            <FormProvider
              schema={signupSchema}
              defaultValues={{ email: '', password: '', confirmPassword: '' }}
              onSubmit={handleSubmit}
            >
              <CView>
                <FormFields
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                />

                {authError && (
                  <Animated.View 
                    entering={FadeInDown.duration(400)}
                  >
                    <CView 
                      bg="danger"
                      p="md"
                      borderRadius="md"
                      mt="md"
                      style={{ 
                        backgroundColor: colors.danger + '20',
                        borderWidth: 1,
                        borderColor: colors.danger + '40',
                      }}
                    >
                      <CText 
                        variant="bodySmall" 
                        color="danger"
                        center
                      >
                        {authError}
                      </CText>
                    </CView>
                  </Animated.View>
                )}

                <SubmitButton isLoading={isLoading} />

                <Animated.View 
                  entering={FadeInUp.delay(1100).duration(600)}
                >
                  <CView center mt="lg">
                    <CText 
                      variant="caption" 
                      color="textSecondary"
                      center
                      lines={3}
                    >
                      By creating an account, you agree to our{' '}
                      <CText variant="caption" color="primary" bold>
                        Terms of Service
                      </CText>
                      {' '}and{' '}
                      <CText variant="caption" color="primary" bold>
                        Privacy Policy
                      </CText>
                    </CText>
                  </CView>
                </Animated.View>
              </CView>
            </FormProvider>
          </CView>
        </Animated.View>

        {/* Divider */}
        <Animated.View 
          entering={FadeIn.delay(1200).duration(600)}
        >
          <CView row align="center" my="lg">
            <CView flex={1} height={1} bg="border" />
            <CText 
              variant="bodySmall" 
              color="textSecondary"
              mx="md"
            >
              or
            </CText>
            <CView flex={1} height={1} bg="border" />
          </CView>
        </Animated.View>

        {/* Sign In Section */}
        <Animated.View 
          entering={FadeInUp.delay(1300).duration(600)}
        >
          <CView center pb="xl">
            <CText 
              variant="body" 
              color="textSecondary"
              mb="md"
            >
              Already have an account?
            </CText>
            <CButton
              title="Sign In"
              variant="ghost"
              onPress={() => router.push('/(auth)/')}
              accessibilityLabel="Sign in button"
            />
          </CView>
        </Animated.View>
      </CScrollView>
    </ScreenWrapper>
  );
}