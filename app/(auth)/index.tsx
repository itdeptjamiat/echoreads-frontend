import React, { useState } from "react";
import { ScrollView, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import {
  CView,
  CText,
  CButton,
  CIcon,
  CScrollView,
} from "../../src/components/core";
import { Spacing, Radius, Shadow } from "../../src/constants/layout";
import { useTheme } from "../../src/hooks/useTheme";
import { FormProvider, TextField, useFormContext } from "../../src/form";
import { ScreenWrapper } from "../../src/components/ScreenWrapper";
import { loginSchema, LoginFormData } from "../../src/form/schemas/authSchema";
import { loginUser } from "../../src/redux/actions/authActions";
import {
  selectAuthLoading,
  selectAuthError,
} from "../../src/redux/slices/selectState";
import { AppDispatch } from "../../src/redux/store";
import { router } from "expo-router";
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInDown,
} from "react-native-reanimated";

// Component to access form context
function SubmitButton({ isLoading }: { isLoading: boolean }) {
  const { handleSubmit } = useFormContext();
  const { colors } = useTheme();

  const onPress = () => {
    console.log("Submit button pressed");
    handleSubmit();
  };

  return (
    <CView mt="xl">
      <CButton
        title={isLoading ? "Signing In..." : "Sign In"}
        onPress={onPress}
        loading={isLoading}
        disabled={isLoading}
        variant="gradient"
        gradientColors={colors.gradientPrimary}
        size="large"
        fullWidth
        accessibilityLabel="Sign in button"
      />
    </CView>
  );
}

// Component to render form fields with access to form methods
function FormFields({
  showPassword,
  setShowPassword,
}: {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}) {
  const { methods } = useFormContext();

  return (
    <CView>
      <TextField
        name="email"
        control={methods.control}
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        leftIcon="mail"
        required
      />

      <TextField
        name="password"
        control={methods.control}
        label="Password"
        placeholder="Enter your password"
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="password"
        leftIcon="lock-closed"
        rightIcon={showPassword ? "eye-off" : "eye"}
        onRightIconPress={() => setShowPassword(!showPassword)}
        required
      />

      <CView align="flex-end" mt="sm">
        <CButton
          title="Forgot Password?"
          variant="ghost"
          size="small"
          onPress={() => router.push("/(auth)/forgotPassword")}
        />
      </CView>
    </CView>
  );
}

export default function LoginScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useTheme();
  const isLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (data: LoginFormData) => {
    console.log("Form submitted with data:", data);
    console.log("Email:", data.email);
    console.log("Password:", data.password);

    // Test with hardcoded credentials for debugging
    if (data.email === "test@test.com" && data.password === "password") {
      console.log("Test login successful");
      Alert.alert("Success", "Test login successful!");
      return;
    }

    try {
      const result = await dispatch(
        loginUser({
          email: data.email.trim(),
          password: data.password,
        })
      ).unwrap();

      console.log("Login successful:", result);
      
      // Navigate based on user's plan
      if (result.user?.plan === 'free') {
        // User has free plan, go directly to main app
        router.push("/(tabs)/");
      } else if (result.user?.plan && result.user.plan !== 'free') {
        // User has a paid plan, go to main app
        router.push("/(tabs)/");
      } else {
        // No plan or new user, go to plan selection
        router.push("/(onboarding)/choosePlan");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert("Login Failed", error || "An error occurred during login");
    }
  };

  return (
    <ScreenWrapper safeArea={true} keyboardAvoiding={true}>
      {/* Gradient Background */}
      <LinearGradient
        colors={colors.gradientPrimary}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 300,
          opacity: 0.1,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <CScrollView px="lg" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <CView mt="xxl" mb="xl">
            <CText variant="h1" bold mb="sm" center>
              Welcome Back!
            </CText>
            <CText variant="bodyLarge" color="textSecondary" center>
              Sign in to continue reading
            </CText>
          </CView>
        </Animated.View>

        {/* Form Section */}
        <Animated.View entering={FadeInUp.delay(400).springify()}>
          <CView bg="card" p="xl" borderRadius="xl" shadow="lg" mb="lg">
            <FormProvider
              schema={loginSchema}
              defaultValues={{
                email: "",
                password: "",
              }}
              onSubmit={handleSubmit}
            >
              <FormFields
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <SubmitButton isLoading={isLoading} />
            </FormProvider>
          </CView>
        </Animated.View>

        {/* Footer Section */}
        <Animated.View entering={SlideInDown.delay(600).springify()}>
          <CView center pb="xl">
            <CView row align="center" center>
              <CText variant="body" color="textSecondary">
                Don't have an account?
              </CText>
              <CView ml="xs">
                <CButton
                  title="Sign Up"
                  variant="ghost"
                  size="small"
                  onPress={() => router.push("/(auth)/signup")}
                />
              </CView>
            </CView>
          </CView>
        </Animated.View>
      </CScrollView>
    </ScreenWrapper>
  );
}
