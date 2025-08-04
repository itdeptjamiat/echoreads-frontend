import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { CustomButton } from '../../src/components/CustomButton';
import { router } from 'expo-router';

export default function CheckoutScreen() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [webViewKey, setWebViewKey] = useState(0);

  // Mock Stripe checkout URL - replace with actual Stripe checkout URL
  const stripeCheckoutUrl = 'https://checkout.stripe.com/pay/cs_test_a1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6#fidkdWxOYHwnPydUblJcbHh1TjE0PW1PTVdTPXZ1WmJZbWpxT2c9TjE0PWtDXUx0WE5LQXFyRl1aRUBpYGZ0WmdaRkg1TEs9T1E9PX13YjZAZWRmZ2ZgWm9ZdzZ5Qm5ya3Z1YzVUbEtvcDd5YTVfPyd2dnJgdWNXd2E9PT1aV1ZMeE1JN2E0Wm5tVmNyZ1l6NGo7YnN9PWN0PXBhY2s9T2hCblZrb3ZkZm1aWm1pd3dDbW1pY2F5ZD5sbXZ1Y2h2YzJzanF2cXx0Y2JpamFmPSUwJmN3PTg';

  const handleWebViewLoadStart = () => {
    setIsLoading(true);
  };

  const handleWebViewLoadEnd = () => {
    setIsLoading(false);
  };

  const handleWebViewMessage = (event: any) => {
    const data = event.nativeEvent.data;
    
    try {
      const message = JSON.parse(data);
      
      if (message.type === 'payment_success') {
        // Payment successful - navigate to confirmation
        router.push('/(onboarding)/confirmation');
      } else if (message.type === 'payment_cancelled') {
        // Payment cancelled - go back to plan selection
        router.back();
      }
    } catch (error) {
      console.log('WebView message:', data);
    }
  };

  const handleBack = () => {
    Alert.alert(
      'Cancel Checkout',
      'Are you sure you want to cancel the checkout process?',
      [
        {
          text: 'Continue Shopping',
          style: 'cancel',
          onPress: () => router.back(),
        },
        {
          text: 'Stay',
          style: 'default',
        },
      ]
    );
  };

  const handleRefresh = () => {
    setWebViewKey(prev => prev + 1);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      color: colors.text,
    },
    headerButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    webViewContainer: {
      flex: 1,
    },
    loadingContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    loadingText: {
      color: colors.textSecondary,
      marginTop: 16,
    },
    footer: {
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.card,
    },
    footerText: {
      textAlign: 'center',
      color: colors.textSecondary,
      marginBottom: 8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <H1 style={styles.headerTitle}>Checkout</H1>
        <View style={styles.headerButtons}>
          <CustomButton
            label="Back"
            variant="ghost"
            onPress={handleBack}
            accessibilityLabel="Go back to plan selection"
            accessible={true}
          />
          <CustomButton
            label="Refresh"
            variant="ghost"
            onPress={handleRefresh}
            accessibilityLabel="Refresh checkout page"
            accessible={true}
          />
        </View>
      </View>

      <View style={styles.webViewContainer}>
        <WebView
          key={webViewKey}
          source={{ uri: stripeCheckoutUrl }}
          onLoadStart={handleWebViewLoadStart}
          onLoadEnd={handleWebViewLoadEnd}
          onMessage={handleWebViewMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          accessibilityLabel="Stripe checkout form"
          accessible={true}
        />
        
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Body style={styles.loadingText}>Loading checkout...</Body>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Body style={styles.footerText}>
          Secure checkout powered by Stripe
        </Body>
        <Body style={styles.footerText}>
          Your payment information is encrypted and secure
        </Body>
      </View>
    </View>
  );
} 