import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { CView, CText, CButton, CIcon } from '../../src/components/core';
import { Spacing, Radius, Shadow } from '../../src/constants/layout';
import { useTheme } from '../../src/hooks/useTheme';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { processPayment, completePayment } from '../../src/redux/actions/onboardingActions';
import { selectAuthData } from '../../src/redux/slices/selectState';
import { selectSelectedPlan, selectPaymentInProgress, selectPaymentError } from '../../src/redux/selectors/onboardingSelectors';
import { AppDispatch } from '../../src/redux/store';
import Animated, { 
  FadeInDown, 
  FadeInUp 
} from 'react-native-reanimated';

export default function CheckoutScreen() {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const authData = useSelector(selectAuthData);
  const selectedPlan = useSelector(selectSelectedPlan);
  const paymentInProgress = useSelector(selectPaymentInProgress);
  const paymentError = useSelector(selectPaymentError);
  
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

  const handleWebViewMessage = async (event: any) => {
    const data = event.nativeEvent.data;
    
    try {
      const message = JSON.parse(data);
      
      if (message.type === 'payment_success') {
        // Process payment success
        if (authData?.user?._id && selectedPlan) {
          try {
            await dispatch(processPayment({
              planId: selectedPlan,
              userId: authData.user._id,
              paymentMethod: message.paymentMethod || 'stripe',
              amount: message.amount || 0,
            })).unwrap();
            
            dispatch(completePayment());
            router.push('/(onboarding)/confirmation');
          } catch (error: any) {
            Alert.alert('Payment Error', error || 'Failed to process payment');
          }
        }
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

  return (
    <ScreenWrapper
      safeArea={true}
      keyboardAvoiding={false}
    >
      {/* Header */}
      <Animated.View entering={FadeInDown.duration(600)}>
        <CView 
          row 
          justify="between" 
          align="center"
          px="lg"
          py="md"
          borderBottomWidth={1}
          borderBottomColor="border"
        >
          <CText 
            variant="h2" 
            bold
          >
            Checkout
          </CText>
          <CView 
            row 
            style={{ gap: Spacing.md }}
          >
            <CButton
              title="Back"
              variant="ghost"
              size="small"
              onPress={handleBack}
              accessibilityLabel="Go back to plan selection"
            />
            <CButton
              title="Refresh"
              variant="ghost"
              size="small"
              onPress={handleRefresh}
              accessibilityLabel="Refresh checkout page"
            />
          </CView>
        </CView>
      </Animated.View>

      {/* WebView Container */}
      <CView flex={1}>
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
        />
        
        {isLoading && (
          <Animated.View 
            entering={FadeInUp.duration(400)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.background,
            }}
          >
            <CView center>
              <CIcon 
                name="card-outline" 
                size={12} 
                color="primary"
                mb="md"
              />
              <CText 
                variant="bodyLarge" 
                color="textSecondary"
              >
                Loading checkout...
              </CText>
            </CView>
          </Animated.View>
        )}
      </CView>

      {/* Footer */}
      <Animated.View entering={FadeInUp.delay(200).duration(600)}>
        <CView 
          px="lg"
          py="md"
          borderTopWidth={1}
          borderTopColor="border"
          bg="card"
        >
          <CText 
            variant="bodySmall" 
            color="textSecondary"
            center
            mb="xs"
          >
            Secure checkout powered by Stripe
          </CText>
          <CText 
            variant="bodySmall" 
            color="textSecondary"
            center
          >
            Your payment information is encrypted and secure
          </CText>
        </CView>
      </Animated.View>
    </ScreenWrapper>
  );
} 