import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { CustomButton } from '../../src/components/CustomButton';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  FadeIn,
  SlideInLeft,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor
} from 'react-native-reanimated';

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
    period: 'per month',
    description: 'For avid readers who want more',
    features: [
      'Unlimited articles and magazines',
      'Premium content library',
      'Offline reading',
      'Ad-free experience',
      'Priority customer support'
    ],
    icon: 'star-outline',
    gradient: ['#3b82f6', '#1d4ed8'],
    popular: true
  },
  {
    id: 'pro',
    name: 'Echo Pro',
    price: '$19.99',
    period: 'per month',
    description: 'The ultimate reading experience',
    features: [
      'Everything in Echo Plus',
      'Exclusive premium content',
      'Early access to new releases',
      'Personal reading assistant',
      'Advanced analytics',
      'Family sharing (up to 5 members)'
    ],
    icon: 'diamond-outline',
    gradient: ['#8b5cf6', '#7c3aed']
  }
];

export default function ChoosePlanScreen() {
  const { colors } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<string>('plus');
  const scaleValues = planOptions.reduce((acc, plan) => {
    acc[plan.id] = useSharedValue(1);
    return acc;
  }, {} as Record<string, any>);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    
    // Animate the selected card
    scaleValues[planId].value = withSpring(1.05, { duration: 200 }, () => {
      scaleValues[planId].value = withSpring(1);
    });
  };

  const handleContinue = () => {
    if (selectedPlan === 'free') {
      router.push('/(tabs)/');
    } else {
      router.push('/(onboarding)/checkout');
    }
  };

  const renderPlanCard = (plan: PlanOption, index: number) => {
    const isSelected = selectedPlan === plan.id;
    
    const animatedStyle = useAnimatedStyle(() => {
      const scale = scaleValues[plan.id]?.value || 1;
      return {
        transform: [{ scale }],
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
      };
    });

    return (
      <AnimatedTouchableOpacity
        key={plan.id}
        style={[animatedStyle]}
        entering={FadeInUp.delay(300 + index * 150).duration(600)}
        onPress={() => handlePlanSelect(plan.id)}
        activeOpacity={0.9}
        accessibilityLabel={`${plan.name} plan`}
        accessible={true}
      >
        <Animated.View style={[styles.planCard, cardStyle, { backgroundColor: colors.card }]}>
          {plan.popular && (
            <View style={[styles.popularBadge, { backgroundColor: plan.gradient[0] }]}>
              <Body style={styles.popularText}>Most Popular</Body>
            </View>
          )}
          
          <LinearGradient
            colors={[...plan.gradient, 'transparent']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: colors.muted }]}>
              <Ionicons 
                name={plan.icon as any} 
                size={32} 
                color={plan.gradient[0]} 
              />
            </View>
            
            <View style={styles.planInfo}>
              <H1 style={[styles.planName, { color: colors.text }]}>
                {plan.name}
              </H1>
              <Body style={[styles.planDescription, { color: colors.textSecondary }]}>
                {plan.description}
              </Body>
            </View>
            
            <View style={styles.priceContainer}>
              <H1 style={[styles.price, { color: plan.gradient[0] }]}>
                {plan.price}
              </H1>
              <Body style={[styles.period, { color: colors.textSecondary }]}>
                {plan.period}
              </Body>
            </View>
          </View>
          
          <View style={styles.featuresContainer}>
            {plan.features.map((feature, featureIndex) => (
              <View key={featureIndex} style={styles.feature}>
                <Ionicons 
                  name="checkmark-circle" 
                  size={16} 
                  color={colors.success} 
                  style={styles.featureIcon}
                />
                <Body style={[styles.featureText, { color: colors.text }]}>
                  {feature}
                </Body>
              </View>
            ))}
          </View>
          
          {isSelected && (
            <Animated.View 
              style={[styles.selectedIndicator, { backgroundColor: plan.gradient[0] }]}
              entering={FadeIn.duration(300)}
            >
              <Ionicons name="checkmark" size={24} color="#ffffff" />
            </Animated.View>
          )}
        </Animated.View>
      </AnimatedTouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingVertical: 40,
    },
    header: {
      alignItems: 'center',
      paddingHorizontal: 32,
      marginBottom: 40,
    },
    title: {
      textAlign: 'center',
      marginBottom: 12,
      color: colors.text,
      fontSize: 32,
      fontWeight: '700',
    },
    subtitle: {
      textAlign: 'center',
      color: colors.textSecondary,
      fontSize: 16,
      lineHeight: 24,
    },
    plansContainer: {
      paddingHorizontal: 20,
      gap: 20,
      marginBottom: 40,
    },
    planCard: {
      borderRadius: 20,
      padding: 24,
      position: 'relative',
      overflow: 'hidden',
      elevation: 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
    },
    popularBadge: {
      position: 'absolute',
      top: 0,
      right: 0,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderBottomLeftRadius: 12,
      zIndex: 2,
    },
    popularText: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: '600',
    },
    cardGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.05,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 24,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    planInfo: {
      flex: 1,
    },
    planName: {
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 4,
    },
    planDescription: {
      fontSize: 14,
      lineHeight: 20,
    },
    priceContainer: {
      alignItems: 'flex-end',
    },
    price: {
      fontSize: 28,
      fontWeight: '700',
    },
    period: {
      fontSize: 12,
    },
    featuresContainer: {
      gap: 12,
    },
    feature: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    featureIcon: {
      marginRight: 12,
    },
    featureText: {
      flex: 1,
      fontSize: 14,
      lineHeight: 20,
    },
    selectedIndicator: {
      position: 'absolute',
      top: 16,
      left: 16,
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
    bottomContainer: {
      paddingHorizontal: 32,
      paddingBottom: 40,
    },
    continueButton: {
      marginBottom: 16,
    },
    backButton: {
      alignItems: 'center',
    },
    backText: {
      color: colors.textSecondary,
      fontSize: 14,
    },
  });

  const selectedPlanData = planOptions.find(plan => plan.id === selectedPlan);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={styles.header}
          entering={FadeInDown.delay(200).duration(800)}
        >
          <H1 style={styles.title}>Choose Your Plan</H1>
          <Body style={styles.subtitle}>
            Select the perfect plan for your reading journey. You can change or cancel anytime.
          </Body>
        </Animated.View>

        <View style={styles.plansContainer}>
          {planOptions.map((plan, index) => renderPlanCard(plan, index))}
        </View>

        <Animated.View 
          style={styles.bottomContainer}
          entering={FadeInUp.delay(800).duration(600)}
        >
          <View style={styles.continueButton}>
            <CustomButton
              label={selectedPlan === 'free' ? 'Start Reading Free' : `Continue with ${selectedPlanData?.name}`}
              variant="gradient"
              gradientColors={selectedPlanData?.gradient || colors.gradientPrimary}
              onPress={handleContinue}
              accessibilityLabel="Continue with selected plan"
              accessible={true}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityLabel="Go back"
            accessible={true}
          >
            <Body style={styles.backText}>
              Back to intro
            </Body>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}