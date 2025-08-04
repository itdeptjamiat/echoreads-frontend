import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

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

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      marginVertical: 16,
      gap: 12,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    searchIcon: {
      marginRight: 12,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      fontFamily: 'System',
    },
    clearButton: {
      padding: 4,
      marginLeft: 8,
    },
    filterButton: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
  });

  return (
    <View style={styles.container}>
      <AnimatedView style={[styles.searchContainer, animatedContainerStyle]}>
        <Ionicons 
          name="search" 
          size={20} 
          color={isFocused ? colors.primary : colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
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
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => onChangeText('')}
            accessibilityLabel="Clear search"
            accessible={true}
          >
            <Ionicons 
              name="close-circle" 
              size={20} 
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </AnimatedView>
      
      {showFilter && (
        <AnimatedTouchableOpacity 
          style={[styles.filterButton, animatedFilterStyle]}
          onPress={handleFilterPress}
          accessibilityLabel="Filter button"
          accessible={true}
        >
          <Ionicons 
            name="options" 
            size={20} 
            color={colors.primary}
          />
        </AnimatedTouchableOpacity>
      )}
    </View>
  );
}