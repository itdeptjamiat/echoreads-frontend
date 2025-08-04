import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { CustomButton } from '../../src/components/CustomButton';
import { router } from 'expo-router';

export default function ConfirmationScreen() {
  const { colors } = useTheme();

  const handleStartReading = () => {
    router.push('/(tabs)/');
  };

  const handleViewAccount = () => {
    // Navigate to account/profile screen
    router.push('/(tabs)/profile');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    successContainer: {
      alignItems: 'center',
      marginBottom: 48,
    },
    successIcon: {
      width: 120,
      height: 120,
      marginBottom: 32,
      tintColor: colors.success,
    },
    title: {
      marginBottom: 16,
      textAlign: 'center',
    },
    subtitle: {
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 8,
    },
    planInfo: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 24,
      marginBottom: 32,
      width: '100%',
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    planTitle: {
      marginBottom: 8,
      textAlign: 'center',
    },
    planDetails: {
      textAlign: 'center',
      color: colors.textSecondary,
      marginBottom: 16,
    },
    featuresList: {
      marginTop: 16,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    featureIcon: {
      marginRight: 12,
      color: colors.success,
    },
    featureText: {
      color: colors.textSecondary,
      flex: 1,
    },
    buttonContainer: {
      width: '100%',
      gap: 16,
    },
    primaryButton: {
      marginBottom: 8,
    },
    secondaryButton: {
      marginBottom: 8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.successContainer}>
        {/* Success checkmark icon */}
        <View style={[styles.successIcon, { backgroundColor: colors.success + '20', borderRadius: 60, justifyContent: 'center', alignItems: 'center' }]}>
          <Body style={[styles.successIcon, { fontSize: 60, color: colors.success }]}>✓</Body>
        </View>
        
        <H1 center b style={[styles.title, { color: colors.text }]}>
          Welcome to EchoReads!
        </H1>
        
        <Body center style={[styles.subtitle, { color: colors.textSecondary }]}>
          Your subscription has been activated successfully. You now have access to all premium features.
        </Body>
      </View>

      <View style={styles.planInfo}>
        <H1 center style={[styles.planTitle, { color: colors.text }]}>
          Echo Plus Plan
        </H1>
        
        <Body center style={styles.planDetails}>
          $9.99/month • Billed monthly
        </Body>
        
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Body style={styles.featureIcon}>✓</Body>
            <Body style={styles.featureText}>Unlimited article access</Body>
          </View>
          <View style={styles.featureItem}>
            <Body style={styles.featureIcon}>✓</Body>
            <Body style={styles.featureText}>Premium magazine library</Body>
          </View>
          <View style={styles.featureItem}>
            <Body style={styles.featureIcon}>✓</Body>
            <Body style={styles.featureText}>Offline downloads</Body>
          </View>
          <View style={styles.featureItem}>
            <Body style={styles.featureIcon}>✓</Body>
            <Body style={styles.featureText}>Priority support</Body>
          </View>
          <View style={styles.featureItem}>
            <Body style={styles.featureIcon}>✓</Body>
            <Body style={styles.featureText}>Ad-free experience</Body>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          label="Start Reading"
          variant="primary"
          onPress={handleStartReading}
          style={styles.primaryButton}
          accessibilityLabel="Start reading with premium access"
          accessible={true}
        />
        
        <CustomButton
          label="View Account"
          variant="ghost"
          onPress={handleViewAccount}
          style={styles.secondaryButton}
          accessibilityLabel="View account settings"
          accessible={true}
        />
      </View>
    </View>
  );
} 