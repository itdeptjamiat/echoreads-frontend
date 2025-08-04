import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { CustomButton } from '../../src/components/CustomButton';
import { router } from 'expo-router';

interface PlanOption {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  emoji: string;
}

const planOptions: PlanOption[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: [
      'Access to 100+ free articles',
      'Basic search functionality',
      'Standard reading experience',
      'Community support',
    ],
    emoji: '📖',
  },
  {
    id: 'echo-plus',
    name: 'Echo Plus',
    price: '$9.99',
    period: 'month',
    features: [
      'Unlimited article access',
      'Premium magazine library',
      'Offline downloads',
      'Priority support',
      'Ad-free experience',
    ],
    popular: true,
    emoji: '⭐',
  },
  {
    id: 'echo-pro',
    name: 'Echo Pro',
    price: '$19.99',
    period: 'month',
    features: [
      'Everything in Echo Plus',
      'Exclusive content access',
      'Advanced search filters',
      'Personal reading analytics',
      'Early access to new features',
      'Dedicated support team',
    ],
    emoji: '👑',
  },
];

export default function ChoosePlanScreen() {
  const { colors } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<string>('free');

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    if (selectedPlan === 'free') {
      // Navigate directly to main app for free plan
      router.push('/(tabs)/');
    } else {
      // Navigate to checkout for paid plans
      router.push('/(onboarding)/checkout');
    }
  };

  const renderPlanCard = (plan: PlanOption) => {
    const isSelected = selectedPlan === plan.id;
    const isPopular = plan.popular;

    return (
      <TouchableOpacity
        key={plan.id}
        style={[
          styles.planCard,
          {
            backgroundColor: colors.card,
            borderColor: isSelected ? colors.primary : colors.border,
            borderWidth: isSelected ? 2 : 1,
          },
        ]}
        onPress={() => handlePlanSelect(plan.id)}
        accessibilityLabel={`Select ${plan.name} plan`}
        accessible={true}
      >
        {isPopular && (
          <View style={[styles.popularBadge, { backgroundColor: colors.primary }]}>
            <Body style={[styles.popularText, { color: colors.card }]}>
              Most Popular
            </Body>
          </View>
        )}

        <View style={styles.planHeader}>
          <Body style={styles.planEmoji}>{plan.emoji}</Body>
          <H1 style={[styles.planName, { color: colors.text }]}>
            {plan.name}
          </H1>
          <View style={styles.priceContainer}>
            <H1 style={[styles.price, { color: colors.primary }]}>
              {plan.price}
            </H1>
            <Body style={[styles.period, { color: colors.textSecondary }]}>
              /{plan.period}
            </Body>
          </View>
        </View>

        <View style={styles.featuresContainer}>
          {plan.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Body style={[styles.featureText, { color: colors.textSecondary }]}>
                ✓ {feature}
              </Body>
            </View>
          ))}
        </View>

        {isSelected && (
          <View style={[styles.selectedIndicator, { backgroundColor: colors.primary }]}>
            <Body style={[styles.selectedText, { color: colors.card }]}>
              Selected
            </Body>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      padding: 24,
    },
    header: {
      alignItems: 'center',
      marginBottom: 32,
    },
    title: {
      marginBottom: 12,
      textAlign: 'center',
    },
    subtitle: {
      textAlign: 'center',
      color: colors.textSecondary,
      marginBottom: 32,
    },
    plansContainer: {
      marginBottom: 32,
    },
    planCard: {
      borderRadius: 16,
      padding: 24,
      marginBottom: 16,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    popularBadge: {
      position: 'absolute',
      top: -12,
      right: 16,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
    },
    popularText: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    planHeader: {
      alignItems: 'center',
      marginBottom: 24,
    },
    planEmoji: {
      fontSize: 48,
      marginBottom: 16,
    },
    planName: {
      marginBottom: 8,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    price: {
      fontSize: 32,
    },
    period: {
      marginLeft: 4,
    },
    featuresContainer: {
      marginBottom: 16,
    },
    featureItem: {
      marginBottom: 8,
    },
    featureText: {
      lineHeight: 20,
    },
    selectedIndicator: {
      position: 'absolute',
      top: 16,
      right: 16,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    selectedText: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    buttonContainer: {
      paddingHorizontal: 24,
      paddingBottom: 24,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <H1 center b style={[styles.title, { color: colors.text }]}>
            Choose Your Plan
          </H1>
          <Body center style={styles.subtitle}>
            Select the perfect plan for your reading journey
          </Body>
        </View>

        <View style={styles.plansContainer}>
          {planOptions.map(renderPlanCard)}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <CustomButton
          label={selectedPlan === 'free' ? "Start Reading" : "Continue to Checkout"}
          variant="primary"
          onPress={handleContinue}
          accessibilityLabel={selectedPlan === 'free' ? "Start reading with free plan" : "Continue to checkout"}
          accessible={true}
        />
      </View>
    </View>
  );
} 