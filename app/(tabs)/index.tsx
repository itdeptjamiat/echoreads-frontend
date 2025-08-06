import React from 'react';
import { CView, CText } from '../../src/components/core';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { useTheme } from '../../src/hooks/useTheme';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <ScreenWrapper
      safeArea={true}
      keyboardAvoiding={false}
    >
      <CView 
        flex={1}
        center
        px="lg"
      >
        <CText 
          variant="h1" 
          bold 
          center
          mb="md"
        >
          Home Screen
        </CText>
        <CText 
          variant="body" 
          color="textSecondary"
          center
        >
          Welcome to EchoReads! This is the home screen.
        </CText>
      </CView>
    </ScreenWrapper>
  );
}