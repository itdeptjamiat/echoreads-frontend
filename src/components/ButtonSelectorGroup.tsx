import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import { Body } from '../theme/Typo';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  interpolateColor,
  useSharedValue,
  withTiming 
} from 'react-native-reanimated';

interface ButtonSelectorGroupProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  variant?: 'default' | 'gradient';
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export function ButtonSelectorGroup({ 
  options, 
  selectedOption, 
  onSelect,
  variant = 'default' 
}: ButtonSelectorGroupProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const getGradientColors = (option: string, isSelected: boolean) => {
    if (!isSelected || variant !== 'gradient') return [colors.card, colors.card];
    
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

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.muted,
      borderRadius: 12,
      padding: 4,
      marginHorizontal: 20,
      marginVertical: 16,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginHorizontal: 2,
      overflow: 'hidden',
    },
    buttonContent: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedButton: {
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
  });

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = option === selectedOption;
        const gradientColors = getGradientColors(option, isSelected);
        
        return (
          <AnimatedTouchableOpacity
            key={option}
            style={[styles.button, isSelected && styles.selectedButton, animatedStyle]}
            onPress={() => handlePress(option)}
            activeOpacity={0.8}
            accessibilityLabel={`${option} button`}
            accessible={true}
          >
            <LinearGradient
              colors={isSelected && variant === 'gradient' ? gradientColors : [colors.card, colors.card]}
              style={[StyleSheet.absoluteFillObject, { borderRadius: 8 }]}
            />
            <View style={styles.buttonContent}>
              <Body 
                style={{ 
                  color: isSelected && variant === 'gradient' 
                    ? '#ffffff' 
                    : isSelected 
                      ? colors.primary 
                      : colors.textSecondary,
                  fontWeight: isSelected ? '600' : '400'
                }}
              >
                {option}
              </Body>
            </View>
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );
}