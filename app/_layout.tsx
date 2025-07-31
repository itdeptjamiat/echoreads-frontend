// Global layout using ThemeProvider + ReduxProvider
// This file will be populated in later phases 
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Stack, Slot } from 'expo-router';
import { MotiView } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

// Splash Component
const Splash = () => {
  return (
    <SafeAreaView style={styles.splashContainer}>
      <View style={styles.splashContent}>
        <MotiView
          from={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            type: 'timing',
            duration: 1000,
            delay: 300,
          }}
          style={styles.logoContainer}
        >
          <LottieView
            source={require('../src/assets/animations/splash.json')}
            style={styles.lottieAnimation}
            autoPlay
            loop
            speed={1}
          />
        </MotiView>
      </View>
    </SafeAreaView>
  );
};

const RootLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppIsReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!appIsReady) {
    return <Splash />;
  }

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 500 }}
      style={styles.container}
    >
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(onboarding)' options={{ headerShown: false }} />
        <Stack.Screen name='(search)' options={{ headerShown: false }} />
        <Stack.Screen name='(library)' options={{ headerShown: false }} />
        <Stack.Screen name='(downloads)' options={{ headerShown: false }} />
        <Stack.Screen name='(kids)' options={{ headerShown: false }} />
      </Stack>
    </MotiView>
  );
}

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashContainer: {
    flex: 1,
    backgroundColor: '#202124',
  },
  splashContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    maxWidth: 200,
    maxHeight: 200,
  },
  lottieAnimation: {
    width: width * 0.4,
    height: width * 0.4,
    maxWidth: 200,
    maxHeight: 200,
  },
});