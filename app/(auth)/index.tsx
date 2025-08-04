import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { loginUser } from '../../src/redux/actions/authActions';
import { 
  selectAuthLoading, 
  selectAuthError, 
  selectIsAuthenticated,
  selectUser,
  selectUserEmail,
  selectUserName 
} from '../../src/redux/selectors';
import { AppDispatch } from '../../src/redux/store';
import { FormProvider, TextField } from '../../src/form';

// Zod validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useTheme();
  
  // Redux selectors
  const isLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const userEmail = useSelector(selectUserEmail);
  const userName = useSelector(selectUserName);

  // Quick test function for provided credentials
  const handleQuickTest = () => {
    // This will be handled by the form system
    console.log('Test credentials available: devmuhammadiqbal@gmail.com / 12345@aA');
  };

  // Handle login submission
  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(loginUser({ 
        email: data.email.trim(), 
        password: data.password 
      })).unwrap();
      // Login success - navigation will be handled by auth state changes
    } catch (error: any) {
      Alert.alert('Login Failed', error || 'An error occurred during login');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 24,
      justifyContent: 'center',
    },
    button: {
      backgroundColor: isLoading ? colors.border : colors.primary,
      padding: 14,
      borderRadius: 8,
      opacity: isLoading ? 0.6 : 1,
      marginTop: 16,
    },
    buttonText: {
      color: colors.card,
    },
    errorText: {
      color: colors.danger,
      marginTop: 4,
      marginBottom: 8,
      fontSize: 14,
    },
    testButton: {
      backgroundColor: colors.card,
      padding: 10,
      borderRadius: 6,
      marginTop: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    testButtonText: {
      color: colors.text,
      fontSize: 14,
    },
    userInfoCard: {
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 12,
      marginTop: 24,
      borderWidth: 1,
      borderColor: colors.success,
    },
    userInfoTitle: {
      color: colors.success,
      marginBottom: 12,
    },
    userInfoItem: {
      marginBottom: 8,
    },
    userInfoLabel: {
      color: colors.text,
      opacity: 0.7,
    },
    userInfoValue: {
      color: colors.text,
      marginTop: 4,
    },
  });

  return (
    <View style={styles.container}>
      <H1 center b>Welcome Back</H1>
      <Body center style={{ marginBottom: 32, color: colors.text }}>
        Sign in to your EchoReads account
      </Body>

      <FormProvider
        schema={loginSchema}
        defaultValues={{
          email: '',
          password: '',
        }}
        onSubmit={onSubmit}
      >
        {/* Email Input */}
        <TextField
          name="email"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />

        {/* Password Input */}
        <TextField
          name="password"
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />

        {/* Redux Auth Error */}
        {authError && (
          <Body style={styles.errorText}>{authError}</Body>
        )}

        {/* Sign In Button */}
        <TouchableOpacity 
          style={styles.button} 
          disabled={isLoading}
        >
          <Body center b style={styles.buttonText}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Body>
        </TouchableOpacity>
      </FormProvider>

      {/* Quick test button for provided credentials */}
      <TouchableOpacity 
        style={styles.testButton} 
        onPress={handleQuickTest}
        disabled={isLoading}
      >
        <Body center style={styles.testButtonText}>
          Use Test Credentials
        </Body>
      </TouchableOpacity>

      {/* User Info Display - Shows after successful login */}
      {isAuthenticated && user && (
        <View style={styles.userInfoCard}>
          <Body b style={styles.userInfoTitle}>✅ Login Successful!</Body>
          
          <View style={styles.userInfoItem}>
            <Body style={styles.userInfoLabel}>Email:</Body>
            <Body b style={styles.userInfoValue}>{userEmail || 'N/A'}</Body>
          </View>
          
          <View style={styles.userInfoItem}>
            <Body style={styles.userInfoLabel}>Name:</Body>
            <Body b style={styles.userInfoValue}>{userName || 'N/A'}</Body>
          </View>
          
          <View style={styles.userInfoItem}>
            <Body style={styles.userInfoLabel}>User ID:</Body>
            <Body b style={styles.userInfoValue}>{user.id || 'N/A'}</Body>
          </View>
          
          {user.role && (
            <View style={styles.userInfoItem}>
              <Body style={styles.userInfoLabel}>Role:</Body>
              <Body b style={styles.userInfoValue}>{user.role}</Body>
            </View>
          )}
        </View>
      )}
    </View>
  );
}