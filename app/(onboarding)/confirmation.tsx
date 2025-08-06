import React, { useEffect } from 'react';
import { CView, CText, CButton, CIcon } from '../../src/components/core';
import { Spacing, Radius, Shadow } from '../../src/constants/layout';
import { useTheme } from '../../src/hooks/useTheme';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { completeOnboarding } from '../../src/redux/actions/onboardingActions';
import { selectAuthData } from '../../src/redux/slices/selectState';
import { selectSelectedPlan } from '../../src/redux/selectors/onboardingSelectors';
import { AppDispatch } from '../../src/redux/store';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  SlideInUp 
} from 'react-native-reanimated';

export default function ConfirmationScreen() {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const authData = useSelector(selectAuthData);
  const selectedPlan = useSelector(selectSelectedPlan);

  useEffect(() => {
    // Complete onboarding when component mounts
    if (authData?.user?._id) {
      dispatch(completeOnboarding(authData.user._id));
    }
  }, [dispatch, authData?.user?._id]);

  const handleStartReading = () => {
    router.push('/(tabs)/');
  };

  const handleViewAccount = () => {
    // Navigate to account/profile screen
    router.push('/(tabs)/profile');
  };

  const features = [
    'Unlimited article access',
    'Premium magazine library',
    'Offline downloads',
    'Priority support',
    'Ad-free experience'
  ];

  return (
    <ScreenWrapper
      safeArea={true}
      keyboardAvoiding={false}
    >
      <CView 
        center
        px="xl"
        flex={1}
      >
        {/* Success Section */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <CView center mb="xl">
            <CView 
              width={120}
              height={120}
              borderRadius="full"
              bg="success"
              center
              mb="lg"
              style={{ backgroundColor: colors.success + '20' }}
            >
              <CIcon 
                name="checkmark" 
                size={12} 
                color="success"
              />
            </CView>
            
            <CText 
              variant="h1" 
              bold 
              center
              mb="md"
            >
              Welcome to EchoReads!
            </CText>
            
            <CText 
              variant="bodyLarge" 
              color="textSecondary"
              center
              lines={3}
            >
              Your subscription has been activated successfully. You now have access to all premium features.
            </CText>
          </CView>
        </Animated.View>

        {/* Plan Info Section */}
        <Animated.View entering={FadeInUp.delay(400).springify()}>
          <CView 
            bg="card"
            p="xl"
            borderRadius="xl"
            shadow="lg"
            mb="xl"
            width="100%"
          >
            <CText 
              variant="h2" 
              bold 
              center
              mb="sm"
            >
              Echo Plus Plan
            </CText>
            
            <CText 
              variant="body" 
              color="textSecondary"
              center
              mb="lg"
            >
              $9.99/month • Billed monthly
            </CText>
            
            <CView style={{ gap: Spacing.sm }}>
              {features.map((feature, index) => (
                <CView 
                  key={index}
                  row 
                  align="center"
                >
                  <CIcon 
                    name="checkmark-circle" 
                    size={4} 
                    color="success"
                    mr="md"
                  />
                  <CText 
                    variant="bodySmall" 
                    color="textSecondary"
                    flex={1}
                  >
                    {feature}
                  </CText>
                </CView>
              ))}
            </CView>
          </CView>
        </Animated.View>

        {/* Buttons Section */}
        <Animated.View entering={SlideInUp.delay(600).springify()}>
          <CView width="100%" style={{ gap: Spacing.md }}>
            <CButton
              title="Start Reading"
              variant="gradient"
              gradientColors={colors.gradientPrimary}
              onPress={handleStartReading}
              size="large"
              fullWidth
              accessibilityLabel="Start reading with premium access"
            />
            
            <CButton
              title="View Account"
              variant="ghost"
              onPress={handleViewAccount}
              size="large"
              fullWidth
              accessibilityLabel="View account settings"
            />
          </CView>
        </Animated.View>
      </CView>
    </ScreenWrapper>
  );
} 