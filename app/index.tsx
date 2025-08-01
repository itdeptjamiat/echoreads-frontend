import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const Page = () => {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Page</Text>
      <Button title='Go to Home' onPress={() => router.push('/(auth)/')} />
      <Button title='Go to Auth' onPress={() => router.push('/(tabs)/')} />
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
});