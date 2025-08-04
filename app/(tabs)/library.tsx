import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { ButtonSelectorGroup } from '../../src/components/ButtonSelectorGroup';
import { PostCard } from '../../src/components/PostCard';
import { CustomButton } from '../../src/components/CustomButton';
import { getDemoSavedContent, getDemoDownloadedContent, DemoPost } from '../../src/data/libraryData';
import Animated, { 
  FadeInDown,
  FadeInUp,
  Layout 
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function LibraryScreen() {
  const { colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'Saved' | 'Downloaded' | 'History'>('Saved');

  const savedContent = getDemoSavedContent();
  const downloadedContent = getDemoDownloadedContent();
  const historyContent = [...savedContent, ...downloadedContent].slice(0, 5); // Mock history

  const getCurrentContent = (): DemoPost[] => {
    switch (selectedTab) {
      case 'Saved':
        return savedContent;
      case 'Downloaded':
        return downloadedContent;
      case 'History':
        return historyContent;
      default:
        return [];
    }
  };

  const currentContent = getCurrentContent();

  const getEmptyStateContent = () => {
    switch (selectedTab) {
      case 'Saved':
        return {
          icon: 'bookmark-outline' as const,
          title: 'No saved content yet',
          description: 'Bookmark articles, magazines, and digests to read them later. Your saved content will appear here.',
          action: 'Explore Content'
        };
      case 'Downloaded':
        return {
          icon: 'download-outline' as const,
          title: 'No downloaded content',
          description: 'Download content for offline reading. Perfect for when you\'re traveling or have limited internet.',
          action: 'Browse Library'
        };
      case 'History':
        return {
          icon: 'time-outline' as const,
          title: 'No reading history',
          description: 'Your recently read articles and magazines will appear here for easy access.',
          action: 'Start Reading'
        };
      default:
        return {
          icon: 'library-outline' as const,
          title: 'Empty library',
          description: 'Your content will appear here.',
          action: 'Explore'
        };
    }
  };

  const emptyState = getEmptyStateContent();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    safeArea: {
      flex: 1,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 10,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    headerTitle: {
      flex: 1,
    },
    settingsButton: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    statsContainer: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 24,
      paddingHorizontal: 20,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    contentContainer: {
      flex: 1,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    sectionTitle: {
      flex: 1,
    },
    sortButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: colors.muted,
      gap: 4,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
      paddingVertical: 60,
    },
    emptyStateIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.muted,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    emptyStateText: {
      textAlign: 'center',
      marginBottom: 8,
      lineHeight: 28,
    },
    emptyStateSubtext: {
      textAlign: 'center',
      marginBottom: 32,
      lineHeight: 24,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.safeArea} showsVerticalScrollIndicator={false}>
        <Animated.View style={styles.header} entering={FadeInDown.duration(600)}>
          <View style={styles.headerTop}>
            <View style={styles.headerTitle}>
              <H1 style={{ color: colors.text, fontSize: 28, marginBottom: 4 }}>
                My Library
              </H1>
              <Body style={{ color: colors.textSecondary, fontSize: 16 }}>
                Your saved and downloaded content
              </Body>
            </View>
            <TouchableOpacity 
              style={styles.settingsButton}
              onPress={() => console.log('Open settings')}
              accessibilityLabel="Library settings"
              accessible={true}
            >
              <Ionicons 
                name="settings-outline" 
                size={24} 
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.View 
          style={styles.statsContainer}
          entering={FadeInDown.delay(200).duration(600)}
        >
          <View style={styles.statCard}>
            <Body style={styles.statNumber}>{savedContent.length}</Body>
            <Body style={styles.statLabel}>Saved</Body>
          </View>
          <View style={styles.statCard}>
            <Body style={styles.statNumber}>{downloadedContent.length}</Body>
            <Body style={styles.statLabel}>Downloaded</Body>
          </View>
          <View style={styles.statCard}>
            <Body style={styles.statNumber}>{historyContent.length}</Body>
            <Body style={styles.statLabel}>Recently Read</Body>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).duration(600)}>
          <ButtonSelectorGroup
            options={['Saved', 'Downloaded', 'History']}
            selectedOption={selectedTab}
            onSelect={(option) => setSelectedTab(option as any)}
          />
        </Animated.View>

        <AnimatedView style={styles.contentContainer} entering={FadeInUp.delay(600).duration(600)}>
          {currentContent.length > 0 && (
            <View style={styles.sectionHeader}>
              <H1 style={[styles.sectionTitle, { color: colors.text, fontSize: 20 }]}>
                {selectedTab} Content ({currentContent.length})
              </H1>
              <TouchableOpacity 
                style={styles.sortButton}
                onPress={() => console.log('Sort content')}
                accessibilityLabel="Sort content"
                accessible={true}
              >
                <Body style={{ color: colors.textSecondary, fontSize: 12 }}>
                  Sort
                </Body>
                <Ionicons 
                  name="chevron-down" 
                  size={16} 
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          )}

          {currentContent.length > 0 ? (
            currentContent.map((post, index) => (
              <AnimatedView
                key={`${selectedTab}-${post.id}`}
                entering={FadeInUp.delay(index * 100).duration(500)}
                layout={Layout.springify()}
              >
                <PostCard
                  title={post.title}
                  description={post.description}
                  imageUrl={post.imageUrl}
                  category={post.category}
                  readTime={post.readTime}
                  author={post.author}
                  onPress={() => console.log('Navigate to post:', post.id)}
                />
              </AnimatedView>
            ))
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyStateIcon}>
                <Ionicons 
                  name={emptyState.icon} 
                  size={40} 
                  color={colors.textSecondary} 
                />
              </View>
              <H1 style={[styles.emptyStateText, { color: colors.text, fontSize: 22 }]}>
                {emptyState.title}
              </H1>
              <Body style={[styles.emptyStateSubtext, { color: colors.textSecondary }]}>
                {emptyState.description}
              </Body>
              <CustomButton
                label={emptyState.action}
                onPress={() => console.log('Navigate to explore')}
                variant="gradient"
                gradientColors={colors.gradientPrimary}
                style={{ minWidth: 160 }}
                accessibilityLabel={`${emptyState.action} button`}
                accessible={true}
              />
            </View>
          )}
        </AnimatedView>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}