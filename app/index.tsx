import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { useTheme } from '../src/hooks/useTheme';
import { H1 } from '../src/theme/Typo';

const Page = () => {
  const { colors } = useTheme();

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