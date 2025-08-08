import React from 'react';
import { Alert } from 'react-native';
import { CView, CText, CButton, CIcon, CScrollView } from '../../src/components/core';
import { Spacing, Radius, Shadow } from '../../src/constants/layout';
import { useTheme } from '../../src/hooks/useTheme';
import { FormProvider, TextField, useFormContext } from '../../src/form';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { forgotPasswordSchema, ForgotPasswordFormData } from '../../src/form/schemas/authSchema';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../src/redux/store';
import { forgotPassword } from '../../src/redux/actions/authActions';
import { router } from 'expo-router';
import Animated, { 
  FadeInDown, 
  FadeInUp 
} from 'react-native-reanimated';

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await dispatch(forgotPassword(data)).unwrap();
      Alert.alert('Success', 'Password reset link sent to your email');
      router.push('/(auth)/verifyEmail'); // Assuming verification is needed
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send reset link';
      Alert.alert('Error', message);
    }
  };

  return (
    <ScreenWrapper
      safeArea={true}
      keyboardAvoiding={true}
    >
      <CScrollView 
        px="lg"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <CView center flex={1} py="xxl">
          {/* Header Section */}
          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <CView center mb="xl">
              <CView 
                width={80}
                height={80}
                borderRadius="full"
                bg="card"
                center
                shadow="lg"
                mb="lg"
              >
                <CIcon 
                  name="mail-unread-outline" 
                  size={8} 
                  color="primary"
                />
              </CView>
              
              <CText 
                variant="h1" 
                bold 
                center
                mb="md"
              >
                Forgot Password
              </CText>
              
              <CText 
                variant="bodyLarge" 
                color="textSecondary"
                center
                lines={3}
              >
                Enter your email address and we'll send you a link to reset your password
              </CText>
            </CView>
          </Animated.View>

          {/* Form Section */}
          <Animated.View entering={FadeInUp.delay(400).springify()}>
            <CView 
              bg="card" 
              p="xl" 
              borderRadius="xl"
              shadow="lg"
              mb="lg"
            >
              <FormProvider
                schema={forgotPasswordSchema}
                defaultValues={{
                  email: '',
                }}
                onSubmit={handleSubmit}
              >
                <CView>
                  <FormFields />

                  <CView mt="lg">
                    <SubmitButton />
                  </CView>
                </CView>
              </FormProvider>
            </CView>
          </Animated.View>

          {/* Footer Section */}
          <Animated.View entering={FadeInUp.delay(600).springify()}>
            <CView center>
              <CButton
                title="Back to Sign In"
                variant="ghost"
                onPress={() => router.push('/(auth)/')}
                accessibilityLabel="Back to sign in"
              />
            </CView>
          </Animated.View>
        </CView>
      </CScrollView>
    </ScreenWrapper>
  );
} 

function FormFields() {
  const { methods } = useFormContext();

  return (
    <CView>
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
    </CView>
  );
}

function SubmitButton() {
  const { handleSubmit } = useFormContext();
  return (
    <CButton
      title="Send Reset Link"
      variant="gradient"
      onPress={handleSubmit}
      size="large"
      fullWidth
      accessibilityLabel="Send reset link button"
    />
  );
} 