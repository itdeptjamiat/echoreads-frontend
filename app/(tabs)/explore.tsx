import React from 'react';
import { CView, CText } from '../../src/components/core';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { useTheme } from '../../src/hooks/useTheme';

export default function ExploreScreen() {
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
          Explore Screen
        </CText>
        <CText 
          variant="body" 
          color="textSecondary"
          center
        >
          Discover new content here! This is the explore screen.
        </CText>
      </CView>
    </ScreenWrapper>
  );
}