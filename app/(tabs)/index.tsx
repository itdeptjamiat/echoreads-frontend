import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';

export default function HomeScreen() {
  const { colors, toggle, mode } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    title: {
      marginBottom: 12,
    },
    section: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    toggleButton: {
      marginTop: 32,
      backgroundColor: colors.primary,
      padding: 12,
      borderRadius: 8,
    },
    toggleButtonText: {
      color: colors.card,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <H1 b style={styles.title}>Welcome to EchoReads</H1>

      <View style={styles.section}>
        <Body b>📖 Editor's Pick</Body>
        <Body>Discover the best magazines this week, hand-picked for you.</Body>
      </View>

      <View style={styles.section}>
        <Body b>📰 Trending Reads</Body>
        <Body>What everyone's reading today — curated by popularity.</Body>
      </View>

      <TouchableOpacity onPress={toggle} style={styles.toggleButton}>
        <Body center b style={styles.toggleButtonText}>
          Toggle to {mode === 'light' ? 'Dark' : 'Light'} Mode
        </Body>
      </TouchableOpacity>
    </ScrollView>
  );
}