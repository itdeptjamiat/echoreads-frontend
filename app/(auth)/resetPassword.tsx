import React, { useState } from 'react';
import { Alert } from 'react-native';
import { CView, CText, CButton, CIcon, CScrollView } from '../../src/components/core';
import { Spacing, Radius, Shadow } from '../../src/constants/layout';
import { useTheme } from '../../src/hooks/useTheme';
import { FormProvider, TextField, useFormContext } from '../../src/form';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { resetPasswordSchema, ResetPasswordFormData } from '../../src/form/schemas/authSchema';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../src/redux/store';
import { resetPassword } from '../../src/redux/actions/authActions';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { 
  FadeInDown, 
  FadeInUp 
} from 'react-native-reanimated';

export default function ResetPasswordScreen() {
  const { colors } = useTheme();

  const dispatch = useDispatch<AppDispatch>();
  const { email = '', otp = '' } = useLocalSearchParams<{
    email?: string;
    otp?: string;
  }>();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Update handleSubmit to map data
  const handleSubmit = async (data: ResetPasswordFormData) => {
    try {
      const payload = {
        email: String(email),
        otp: String(otp),
        newPassword: data.newPassword,
        confirmPassword: data.confirmNewPassword
      };
      await dispatch(resetPassword(payload)).unwrap();
      Alert.alert('Success', 'Password reset successful');
      router.push('/(auth)/');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to reset password';
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
                  name="key-outline" 
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
                Reset Password
              </CText>
              
              <CText 
                variant="bodyLarge" 
                color="textSecondary"
                center
                lines={2}
              >
                Enter your new password below
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
                schema={resetPasswordSchema}
                defaultValues={{
                  newPassword: '',
                  confirmNewPassword: '',
                }}
                onSubmit={handleSubmit}
              >
                <CView>
                  <FormFields
                    showNewPassword={showNewPassword}
                    setShowNewPassword={setShowNewPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                  />

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

function FormFields({
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: {
  showNewPassword: boolean;
  setShowNewPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
}) {
  const { methods } = useFormContext();

  return (
    <CView>
      <TextField
        name="newPassword"
        control={methods.control}
        label="New Password"
        placeholder="Enter your new password"
        secureTextEntry={!showNewPassword}
        leftIcon="lock-closed"
        rightIcon={showNewPassword ? 'eye-off' : 'eye'}
        onRightIconPress={() => setShowNewPassword(!showNewPassword)}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="new-password"
        required
      />

      <TextField
        name="confirmNewPassword"
        control={methods.control}
        label="Confirm New Password"
        placeholder="Confirm your new password"
        secureTextEntry={!showConfirmPassword}
        leftIcon="shield-checkmark"
        rightIcon={showConfirmPassword ? 'eye-off' : 'eye'}
        onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="new-password"
        required
      />
    </CView>
  );
}

function SubmitButton() {
  const { handleSubmit } = useFormContext();
  return (
    <CButton
      title="Reset Password"
      variant="gradient"
      onPress={handleSubmit}
      size="large"
      fullWidth
      accessibilityLabel="Reset password button"
    />
  );
} 