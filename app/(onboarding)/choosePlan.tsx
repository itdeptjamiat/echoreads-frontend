import React, { useState, useCallback, useMemo } from 'react';
import { TouchableOpacity, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CView, CText, CButton, CIcon, CScrollView } from '../../src/components/core';
import { Spacing, Radius, Shadow } from '../../src/constants/layout';
import { useTheme } from '../../src/hooks/useTheme';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectPlan } from '../../src/redux/actions/onboardingActions';
import { selectAuthData } from '../../src/redux/slices/selectState';
import { selectSelectedPlan, selectPaymentInProgress } from '../../src/redux/selectors/onboardingSelectors';
import { AppDispatch } from '../../src/redux/store';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  FadeIn,
  SlideInLeft,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolateColor,
  runOnJS,
  Easing,
  FadeInLeft,
  FadeInRight
} from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface PlanOption {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  icon: string;
  gradient: string[];
  popular?: boolean;
  savings?: string;
  originalPrice?: string;
}

const planOptions: PlanOption[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'Forever',
    description: 'Perfect for casual readers',
    features: [
      'Access to 10 articles per month',
      'Basic reading experience',
      'Standard content library',
      'Community features'
    ],
    icon: 'book-outline',
    gradient: ['#64748b', '#475569']
  },
  {
    id: 'plus',
    name: 'Echo Plus',
    price: '$9.99',
    originalPrice: '$19.99',
    savings: '50% off',
    period: 'per month',
    description: 'For avid readers who want more',
    features: [
      'Unlimited articles and magazines',
      'Premium content library',
      'Offline reading',
      'Ad-free experience',
      'Priority customer support',
      'Advanced search & filters'
    ],
    icon: 'star-outline',
    gradient: ['#3b82f6', '#1d4ed8'],
    popular: true
  },
  {
    id: 'pro',
    name: 'Echo Pro',
    price: '$19.99',
    originalPrice: '$39.99',
    savings: '50% off',
    period: 'per month',
    description: 'The ultimate reading experience',
    features: [
      'Everything in Echo Plus',
      'Exclusive premium content',
      'Early access to new releases',
      'Personal reading assistant',
      'Advanced analytics',
      'Family sharing (up to 5 members)',
      'Custom reading lists',
      'Priority feature requests'
    ],
    icon: 'diamond-outline',
    gradient: ['#8b5cf6', '#7c3aed']
  }
];

export default function ChoosePlanScreen() {
  const { colors } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const authData = useSelector(selectAuthData);
  const reduxSelectedPlan = useSelector(selectSelectedPlan);
  const paymentInProgress = useSelector(selectPaymentInProgress);
  
  const [selectedPlan, setSelectedPlan] = useState<string>(reduxSelectedPlan || 'plus');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  
  // Memoize animations to prevent recreation on every render
  const scaleValues = useMemo(() => 
    planOptions.reduce((acc, plan) => {
      acc[plan.id] = useSharedValue(1);
      return acc;
    }, {} as Record<string, any>), []
  );

  const opacityValues = useMemo(() => 
    planOptions.reduce((acc, plan) => {
      acc[plan.id] = useSharedValue(selectedPlan === plan.id ? 1 : 0.8);
      return acc;
    }, {} as Record<string, any>), [selectedPlan]
  );

  const handlePlanSelect = useCallback((planId: string) => {
    setSelectedPlan(planId);
    
    // Enhanced animation for selected card
    scaleValues[planId].value = withSpring(1.02, { 
      damping: 15, 
      stiffness: 150 
    }, () => {
      scaleValues[planId].value = withSpring(1, { 
        damping: 15, 
        stiffness: 150 
      });
    });

    // Update opacity for all cards
    planOptions.forEach(plan => {
      opacityValues[plan.id].value = withTiming(
        plan.id === planId ? 1 : 0.8,
        { duration: 300, easing: Easing.out(Easing.cubic) }
      );
    });
  }, [scaleValues, opacityValues]);

  const handlePlanStart = useCallback(async (planId: string) => {
    if (!authData?.user?._id) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    setLoadingPlan(planId);
    
    try {
      // Call API to select plan
      await dispatch(selectPlan({
        planId,
        userId: authData.user._id,
      })).unwrap();

      if (planId === 'free') {
        // For free plan, go directly to main app
        router.push('/(tabs)/');
      } else {
        // For paid plans, go to checkout
        router.push('/(onboarding)/checkout');
      }
    } catch (error: any) {
      Alert.alert('Error', error || 'Failed to select plan');
    } finally {
      setLoadingPlan(null);
    }
  }, [dispatch, authData?.user?._id]);

  const renderPlanCard = (plan: PlanOption, index: number) => {
    const isSelected = selectedPlan === plan.id;
    const isLoading = loadingPlan === plan.id;
    
    const animatedStyle = useAnimatedStyle(() => {
      const scale = scaleValues[plan.id]?.value || 1;
      const opacity = opacityValues[plan.id]?.value || 1;
      return {
        transform: [{ scale }],
        opacity,
      };
    });

    const cardStyle = useAnimatedStyle(() => {
      const borderColor = interpolateColor(
        isSelected ? 1 : 0,
        [0, 1],
        [colors.border, plan.gradient[0]]
      );
      
      return {
        borderColor,
        borderWidth: isSelected ? 2 : 1,
        shadowOpacity: isSelected ? 0.2 : 0.1,
        shadowRadius: isSelected ? 12 : 8,
        elevation: isSelected ? 8 : 4,
      };
    });

    return (
      <AnimatedTouchableOpacity
        key={plan.id}
        style={animatedStyle}
        onPress={() => handlePlanSelect(plan.id)}
        activeOpacity={0.9}
        accessibilityLabel={`${plan.name} plan`}
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected }}
      >
        <Animated.View 
          entering={FadeInUp.delay(200 + index * 100).duration(800).springify()}
        >
          <CView 
            bg="card"
            p="xl"
            borderRadius="xl"
            shadow="xl"
            style={cardStyle}
            mb="md"
          >
            {/* Popular Badge */}
            {plan.popular && (
              <Animated.View
                entering={SlideInRight.delay(400).duration(600)}
                style={{
                  position: 'absolute',
                  top: -8,
                  right: 16,
                  zIndex: 10,
                }}
              >
                <LinearGradient
                  colors={[plan.gradient[0], plan.gradient[1]]}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    shadowColor: plan.gradient[0],
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 8,
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <CText 
                    variant="caption" 
                    color="white" 
                    bold
                    center
                  >
                    ⭐ Most Popular
                  </CText>
                </LinearGradient>
              </Animated.View>
            )}

            {/* Savings Badge */}
            {plan.savings && (
              <Animated.View
                entering={SlideInLeft.delay(500).duration(600)}
                style={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  zIndex: 10,
                }}
              >
                <CView
                  style={{ backgroundColor: colors.success }}
                  px="sm"
                  py="xs"
                  borderRadius="md"
                >
                  <CText 
                    variant="caption" 
                    color="white" 
                    bold
                    center
                  >
                    {plan.savings}
                  </CText>
                </CView>
              </Animated.View>
            )}
            
            {/* Background Gradient */}
            <LinearGradient
              colors={[plan.gradient[0], plan.gradient[1], 'transparent']}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.08,
                borderRadius: 24,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            
            {/* Header Section */}
            <CView 
              row 
              align="flex-start" 
              mb="lg"
            >
              <CView 
                width={64}
                height={64}
                borderRadius="full"
                bg="surface"
                center
                mr="lg"
                style={{
                  shadowColor: plan.gradient[0],
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 4,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <CIcon 
                  name={plan.icon as any} 
                  size={7} 
                  color={plan.gradient[0]}
                />
              </CView>
              
              <CView flex={1}>
                <CText 
                  variant="h2" 
                  bold 
                  mb="xs"
                  color={isSelected ? plan.gradient[0] : undefined}
                >
                  {plan.name}
                </CText>
                <CText 
                  variant="body" 
                  color="textSecondary"
                  lines={2}
                  mb="sm"
                >
                  {plan.description}
                </CText>
              </CView>
              
              <CView align="flex-end">
                <CView row align="center" mb="xs">
                  {plan.originalPrice && (
                    <CText 
                      variant="bodySmall" 
                      color="textSecondary"
                      style={{ textDecorationLine: 'line-through' }}
                      mr="xs"
                    >
                      {plan.originalPrice}
                    </CText>
                  )}
                  <CText 
                    variant="h1" 
                    color={plan.gradient[0]}
                    bold
                  >
                    {plan.price}
                  </CText>
                </CView>
                <CText 
                  variant="caption" 
                  color="textSecondary"
                  center
                >
                  {plan.period}
                </CText>
              </CView>
            </CView>
            
            {/* Features Section */}
            <CView style={{ gap: Spacing.md }} mb="lg">
              {plan.features.map((feature, featureIndex) => (
                <Animated.View
                  key={featureIndex}
                  entering={FadeInLeft.delay(600 + featureIndex * 50).duration(400)}
                >
                  <CView 
                    row 
                    align="center"
                  >
                    <CView 
                      mr="md"
                      width={24}
                      height={24}
                      borderRadius="full"
                      style={{ 
                        backgroundColor: colors.success,
                        opacity: 0.9,
                        borderWidth: 1,
                        borderColor: colors.border,
                      }}
                      center
                    >
                      <CIcon 
                        name="checkmark" 
                        size={3} 
                        color="white"
                      />
                    </CView>
                    <CView flex={1}>
                      <CText 
                        variant="bodySmall" 
                        lines={2}
                      >
                        {feature}
                      </CText>
                    </CView>
                  </CView>
                </Animated.View>
              ))}
            </CView>

            {/* Plan Action Button */}
            <CView 
              style={{
                borderTopWidth: 1,
                borderTopColor: colors.border,
                paddingTop: 16,
              }}
            >
              <CButton
                title={isLoading ? "Starting..." : (plan.id === 'free' ? 'Start Free' : `Get ${plan.name}`)}
                variant="gradient"
                gradientColors={plan.gradient}
                onPress={() => handlePlanStart(plan.id)}
                loading={isLoading}
                disabled={loadingPlan !== null}
                size="medium"
                fullWidth
                accessibilityLabel={`Start ${plan.name} plan`}
              />
            </CView>

            {/* Selection Indicator */}
            {isSelected && (
              <Animated.View 
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: plan.gradient[0],
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 5,
                  shadowColor: plan.gradient[0],
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                  borderWidth: 2,
                  borderColor: colors.background,
                }}
                entering={FadeIn.duration(400).springify()}
              >
                <CIcon name="checkmark" size={6} color="white" />
              </Animated.View>
            )}
          </CView>
        </Animated.View>
      </AnimatedTouchableOpacity>
    );
  };

  return (
    <ScreenWrapper
      safeArea={true}
      keyboardAvoiding={false}
    >
      <LinearGradient
        colors={['transparent', colors.background]}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          zIndex: 1,
        }}
      />
      
      <CScrollView 
        px="lg"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header Section */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(1000).springify()}
        >
          <CView center pt="xxl" pb="xl">
            <CView 
              width={80}
              height={80}
              borderRadius="full"
              bg="surface"
              center
              mb="lg"
              style={{
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.1,
                shadowRadius: 16,
                elevation: 8,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <CIcon name="card" size={8} color="primary" />
            </CView>
            
            <CText 
              variant="h1" 
              bold 
              center
              mb="md"
            >
              Choose Your Plan
            </CText>
            <CText 
              variant="bodyLarge" 
              color="textSecondary"
              center
              lines={3}
              mb="lg"
            >
              Select the perfect plan for your reading journey. 
              Start free or unlock premium features.
            </CText>
          </CView>
        </Animated.View>

        {/* Plans Section */}
        <CView style={{ gap: Spacing.md }} mb="xl">
          {planOptions.map((plan, index) => renderPlanCard(plan, index))}
        </CView>

        {/* Bottom Section */}
        <Animated.View 
          entering={FadeInUp.delay(800).duration(800).springify()}
          style={{ zIndex: 2 }}
        >
          <CView pb="xl">
            <CView center>
              <CButton
                title="Back to intro"
                variant="ghost"
                size="small"
                onPress={() => router.back()}
                accessibilityLabel="Go back"
              />
            </CView>

            {/* Terms */}
            <CView center mt="lg">
              <CText 
                variant="caption" 
                color="textSecondary"
                center
                lines={2}
              >
                By continuing, you agree to our Terms of Service and Privacy Policy. 
                Cancel anytime.
              </CText>
            </CView>
          </CView>
        </Animated.View>
      </CScrollView>
    </ScreenWrapper>
  );
}