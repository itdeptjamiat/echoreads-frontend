import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { CView, CInput, CIcon } from './core';
import { Spacing, Radius } from '../constants/layout';
import { useTheme } from '../hooks/useTheme';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  useSharedValue,
  withTiming 
} from 'react-native-reanimated';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  showFilter?: boolean;
  onFilterPress?: () => void;
}

const AnimatedCView = Animated.createAnimatedComponent(CView);

export function SearchBar({ 
  placeholder = "Search magazines, articles, digests...", 
  value, 
  onChangeText, 
  onSubmit,
  onFocus,
  onBlur,
  showFilter = false,
  onFilterPress 
}: SearchBarProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const scale = useSharedValue(1);
  const borderWidth = useSharedValue(1);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      borderWidth: borderWidth.value,
      borderColor: isFocused ? colors.primary : colors.border,
    };
  });

  const animatedFilterStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleFocus = () => {
    setIsFocused(true);
    borderWidth.value = withTiming(2, { duration: 200 });
    scale.value = withSpring(1.02, { duration: 300 });
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    borderWidth.value = withTiming(1, { duration: 200 });
    scale.value = withSpring(1, { duration: 300 });
    onBlur?.();
  };

  const handleFilterPress = () => {
    scale.value = withSpring(0.95, { duration: 100 }, () => {
      scale.value = withSpring(1);
    });
    onFilterPress?.();
  };

  return (
    <CView 
      row 
      align="center" 
      mx="lg" 
      my="md"
      style={{ gap: Spacing.md }}
    >
      <AnimatedCView 
        flex={1}
        row
        align="center"
        bg="card"
        borderRadius="lg"
        px="md"
        py="sm"
        shadow="sm"
        style={animatedContainerStyle}
      >
        <CIcon 
          name="search" 
          size={5} 
          color={isFocused ? "primary" : "textSecondary"}
          mr="md"
        />
        
        <TextInput
          style={{
            flex: 1,
            fontSize: 16,
            color: colors.text,
            fontFamily: 'System',
          }}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          onFocus={handleFocus}
          onBlur={handleBlur}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="Search input"
          accessible={true}
        />
        
        {value.length > 0 && (
          <CIcon 
            name="close-circle" 
            size={5} 
            color="textSecondary"
            onPress={() => onChangeText('')}
            pressable
            ml="sm"
            accessibilityLabel="Clear search"
          />
        )}
      </AnimatedCView>
      
      {showFilter && (
        <AnimatedCView 
          bg="card"
          borderRadius="md"
          p="md"
          borderWidth={1}
          borderColor="border"
          shadow="sm"
          style={animatedFilterStyle}
          onPress={handleFilterPress}
          pressable
          accessibilityLabel="Filter button"
        >
          <CIcon 
            name="options" 
            size={5} 
            color="primary"
          />
        </AnimatedCView>
      )}
    </CView>
  );
}