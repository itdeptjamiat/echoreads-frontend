import React from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ViewStyle,
  StatusBar,
} from 'react-native';
import { CView } from './core';
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
    <CView 
      flex={1} 
      bg="background" 
      style={[{ backgroundColor: bgColor }, style] as any}
    >
      {children}
    </CView>
  );

  // Keyboard dismissing wrapper
  const KeyboardDismissWrapper = ({ children }: { children: React.ReactNode }) =>
    dismissKeyboard ? (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {children}
      </TouchableWithoutFeedback>
    ) : (
      <CView flex={1}>{children}</CView>
    );

  // SafeArea wrapper
  const SafeAreaWrapper = ({ children }: { children: React.ReactNode }) => {
    if (!safeArea) return <CView flex={1}>{children}</CView>;

    return (
      <CView flex={1} bg="background" style={{ backgroundColor: bgColor }}>
        {/* Status bar background for Android */}
        <StatusBar
          backgroundColor={bgColor}
          barStyle="dark-content"
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
      </CView>
    );
  };

  // Keyboard avoiding wrapper
  const KeyboardWrapper = ({ children }: { children: React.ReactNode }) =>
    keyboardAvoiding ? (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        {children}
      </KeyboardAvoidingView>
    ) : (
      <CView flex={1}>{children}</CView>
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