import React from 'react';
import { Alert } from 'react-native';
import { CView, CText, CButton, CIcon, CScrollView } from '../../src/components/core';
import { Spacing, Radius, Shadow } from '../../src/constants/layout';
import { useTheme } from '../../src/hooks/useTheme';
import { FormProvider, TextField, useFormContext } from '../../src/form';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { verifyEmailSchema, VerifyEmailFormData } from '../../src/form/schemas/authSchema';
import { useDispatch } from 'react-redux';
import { confirmEmail } from '../../src/redux/actions/authActions';
import { router } from 'expo-router';
import Animated, { 
  FadeInDown, 
  FadeInUp 
} from 'react-native-reanimated';

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
                  name="mail-check-outline" 
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
                Verify Your Email
              </CText>
              
              <CText 
                variant="bodyLarge" 
                color="textSecondary"
                center
                lines={2}
              >
                Enter the 6-digit code sent to your email address
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
                schema={verifyEmailSchema}
                defaultValues={{
                  email: '',
                  otpCode: '',
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

      <TextField
        name="otpCode"
        control={methods.control}
        label="OTP Code"
        placeholder="Enter 6-digit code"
        keyboardType="number-pad"
        maxLength={6}
        autoComplete="one-time-code"
        leftIcon="keypad"
        required
      />
    </CView>
  );
}

function SubmitButton() {
  const { handleSubmit } = useFormContext();
  return (
    <CButton
      title="Verify Email"
      variant="gradient"
      onPress={handleSubmit}
      size="large"
      fullWidth
      accessibilityLabel="Verify email button"
    />
  );
} 