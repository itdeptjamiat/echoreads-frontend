import React from 'react';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  ViewStyle,
  StatusBar,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  // SafeArea options
  safeArea?: boolean;
  topSafeArea?: boolean;
  bottomSafeArea?: boolean;
  // Keyboard options
  keyboardAvoiding?: boolean;
  keyboardVerticalOffset?: number;
  dismissKeyboard?: boolean;
  // Background color
  backgroundColor?: string;
}

export function ScreenWrapper({
  children,
  style,
  safeArea = true,
  topSafeArea = true,
  bottomSafeArea = true,
  keyboardAvoiding = true,
  keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 0,
  dismissKeyboard = true,
  backgroundColor,
}: ScreenWrapperProps) {
  const { colors } = useTheme();

  // Determine the background color
  const bgColor = backgroundColor || colors.background;

  // Main content wrapper
  const ContentWrapper = ({ children }: { children: React.ReactNode }) => (
    <View style={[styles.container, { backgroundColor: bgColor }, style]}>
      {children}
    </View>
  );

  // Keyboard dismissing wrapper
  const KeyboardDismissWrapper = ({ children }: { children: React.ReactNode }) =>
    dismissKeyboard ? (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {children}
      </TouchableWithoutFeedback>
    ) : (
      <>{children}</>
    );

  // SafeArea wrapper
  const SafeAreaWrapper = ({ children }: { children: React.ReactNode }) => {
    if (!safeArea) return <>{children}</>;

    return (
      <View style={{ flex: 1, backgroundColor: bgColor }}>
        {/* Status bar background for Android */}
        <StatusBar
          backgroundColor={bgColor}
          barStyle={colors.mode === 'dark' ? 'light-content' : 'dark-content'}
        />
        
        {/* Top safe area */}
        {topSafeArea && (
          <SafeAreaView style={{ backgroundColor: bgColor }} />
        )}

        {/* Main content */}
        {children}

        {/* Bottom safe area */}
        {bottomSafeArea && (
          <SafeAreaView style={{ backgroundColor: bgColor }} />
        )}
      </View>
    );
  };

  // Keyboard avoiding wrapper
  const KeyboardWrapper = ({ children }: { children: React.ReactNode }) =>
    keyboardAvoiding ? (
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        {children}
      </KeyboardAvoidingView>
    ) : (
      <>{children}</>
    );

  return (
    <SafeAreaWrapper>
      <KeyboardWrapper>
        <KeyboardDismissWrapper>
          <ContentWrapper>{children}</ContentWrapper>
        </KeyboardDismissWrapper>
      </KeyboardWrapper>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
});