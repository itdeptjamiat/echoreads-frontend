import { StyleSheet, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from '../src/hooks/useTheme';
import { H1 } from '../src/theme/Typo';
import { useSelector } from 'react-redux';
import { selectToken } from '../src/redux/slices/selectState';
import { router } from 'expo-router';

const Page = () => {
  const { colors } = useTheme();
  const token = useSelector(selectToken);

  useEffect(() => {
    const handleNavigation = () => {
      if (token) {
        // User has a token, navigate to main app
        console.log('🔐 Token found, navigating to main app');
        router.replace('/(tabs)/');
      } else {
        // No token, navigate to onboarding intro first
        console.log('⚠️ No token found, navigating to onboarding');
        router.replace('/(onboarding)/');
      }
    };
    handleNavigation();

  }, []); // Run only once on mount to prevent infinite loops

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo} 
        accessibilityLabel="EchoReads logo"
        accessible={true}
      />
      <H1 center style={{ color: colors.text, marginTop: 24 }}>
        EchoReads
      </H1>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
    },
});