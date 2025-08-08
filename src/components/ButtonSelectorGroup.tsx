import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { CView, CText } from './core';
import { Spacing, Radius, Shadow } from '../constants/layout';
import { useTheme } from '../hooks/useTheme';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  useSharedValue
} from 'react-native-reanimated';

interface ButtonSelectorGroupProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  variant?: 'default' | 'gradient';
}

const AnimatedCView = Animated.createAnimatedComponent(CView);

export function ButtonSelectorGroup({ 
  options, 
  selectedOption, 
  onSelect,
  variant = 'default' 
}: ButtonSelectorGroupProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const getGradientColors = (option: string, isSelected: boolean): readonly [string, string] => {
    if (!isSelected || variant !== 'gradient') return [colors.card, colors.card] as const;
    
    switch (option.toLowerCase()) {
      case 'magazines':
        return colors.gradientPrimary;
      case 'articles':
        return colors.gradientSecondary;
      case 'digests':
        return colors.gradientAccent;
      default:
        return colors.gradientPrimary;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = (option: string) => {
    scale.value = withSpring(0.95, { duration: 100 }, () => {
      scale.value = withSpring(1);
    });
    onSelect(option);
  };

  return (
    <CView 
      row 
      bg="surface"
      borderRadius="md"
      p="xs"
      mx="lg"
      my="md"
    >
      {options.map((option) => {
        const isSelected = option === selectedOption;
        const gradientColors = getGradientColors(option, isSelected);
        
        return (
          <AnimatedCView
            key={option}
            flex={1}
            py="sm"
            px="md"
            borderRadius="sm"
            mx="xs"
            overflow="hidden"
            shadow={isSelected ? 'sm' : 'none'}
            style={animatedStyle}
            onPress={() => handlePress(option)}
            pressable
            accessibilityLabel={`${option} button`}
          >
            <LinearGradient
              colors={isSelected && variant === 'gradient' ? gradientColors : ([colors.card, colors.card] as const)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: Radius.sm,
              }}
            />
            <CView 
              center
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <CText 
                variant="body"
                color={
                  isSelected && variant === 'gradient' 
                    ? 'white' 
                    : isSelected 
                      ? 'primary' 
                      : 'textSecondary'
                }
                bold={isSelected}
              >
                {option}
              </CText>
            </CView>
          </AnimatedCView>
        );
      })}
    </CView>
  );
}