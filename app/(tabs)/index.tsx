import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { CustomButton } from '../../src/components/CustomButton';

export default function HomeScreen() {
  const { colors, toggle, mode } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    headerContainer: {
      marginBottom: 24,
    },
    title: {
      marginBottom: 8,
      color: colors.text,
    },
    subtitle: {
      color: colors.textSecondary,
      marginBottom: 16,
    },
    section: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    sectionTitle: {
      marginBottom: 8,
      color: colors.text,
    },
    sectionContent: {
      color: colors.textSecondary,
      lineHeight: 20,
    },
    toggleContainer: {
      marginTop: 32,
      alignItems: 'center',
    },
    toggleButton: {
      minWidth: 200,
    },
  });

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      accessibilityLabel="Home screen content"
    >
      <View style={styles.headerContainer}>
        <H1 b style={styles.title}>Welcome to EchoReads</H1>
        <Body style={styles.subtitle}>
          Your personalized reading experience starts here
        </Body>
      </View>

      <View 
        style={styles.section}
        accessibilityLabel="Editor's pick section"
        accessible={true}
      >
        <Body b style={styles.sectionTitle}>📖 Editor's Pick</Body>
        <Body style={styles.sectionContent}>
          Discover the best magazines this week, hand-picked by our editorial team.
        </Body>
      </View>

      <View 
        style={styles.section}
        accessibilityLabel="Trending reads section"
        accessible={true}
      >
        <Body b style={styles.sectionTitle}>📰 Trending Reads</Body>
        <Body style={styles.sectionContent}>
          What everyone's reading today — curated by popularity and engagement.
        </Body>
      </View>

      <View 
        style={styles.section}
        accessibilityLabel="Recent activity section"
        accessible={true}
      >
        <Body b style={styles.sectionTitle}>📚 Recent Activity</Body>
        <Body style={styles.sectionContent}>
          Continue where you left off with your recent reading sessions.
        </Body>
      </View>

      <View style={styles.toggleContainer}>
        <CustomButton
          label={`Switch to ${mode === 'light' ? 'Dark' : 'Light'} Mode`}
          variant="ghost"
          onPress={toggle}
          style={styles.toggleButton}
          accessibilityLabel={`Toggle to ${mode === 'light' ? 'dark' : 'light'} mode`}
          accessible={true}
        />
      </View>
    </ScrollView>
  );
}