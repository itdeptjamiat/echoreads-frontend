import React, { useState } from 'react';
import { CView, CText, CButton, CIcon, CScrollView } from '../../src/components/core';
import { Spacing, Radius, Shadow } from '../../src/constants/layout';
import { useTheme } from '../../src/hooks/useTheme';
import { ButtonSelectorGroup } from '../../src/components/ButtonSelectorGroup';
import { PostCard } from '../../src/components/PostCard';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { getDemoSavedContent, getDemoDownloadedContent, DemoPost } from '../../src/data/libraryData';
import Animated, { 
  FadeInDown,
  FadeInUp,
  Layout 
} from 'react-native-reanimated';

const AnimatedCView = Animated.createAnimatedComponent(CView);

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

  return (
    <ScreenWrapper
      safeArea={true}
      keyboardAvoiding={false}
    >
      <CScrollView 
        px="lg"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <Animated.View entering={FadeInDown.duration(600)}>
          <CView pt="lg" pb="md">
            <CView 
              row 
              justify="between" 
              align="center" 
              mb="lg"
            >
              <CView flex={1} mr="md">
                <CText 
                  variant="h1" 
                  bold 
                  mb="xs"
                >
                  My Library
                </CText>
                <CText 
                  variant="bodyLarge" 
                  color="textSecondary"
                >
                  Your saved and downloaded content
                </CText>
              </CView>
              <CButton
                variant="ghost"
                size="small"
                onPress={() => console.log('Open settings')}
                accessibilityLabel="Library settings"
                leftIcon={<CIcon name="settings-outline" size={5} color="primary" />}
              />
            </CView>
          </CView>
        </Animated.View>

        {/* Stats Section */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
        >
          <CView 
            row 
            mb="lg"
            style={{ gap: Spacing.md }}
          >
            <CView 
              flex={1}
              bg="card"
              p="md"
              borderRadius="lg"
              borderWidth={1}
              borderColor="border"
              shadow="sm"
              center
            >
              <CText 
                variant="h2" 
                bold 
                color="primary"
                mb="xs"
              >
                {savedContent.length}
              </CText>
              <CText 
                variant="caption" 
                color="textSecondary"
                center
              >
                Saved
              </CText>
            </CView>
            
            <CView 
              flex={1}
              bg="card"
              p="md"
              borderRadius="lg"
              borderWidth={1}
              borderColor="border"
              shadow="sm"
              center
            >
              <CText 
                variant="h2" 
                bold 
                color="primary"
                mb="xs"
              >
                {downloadedContent.length}
              </CText>
              <CText 
                variant="caption" 
                color="textSecondary"
                center
              >
                Downloaded
              </CText>
            </CView>
            
            <CView 
              flex={1}
              bg="card"
              p="md"
              borderRadius="lg"
              borderWidth={1}
              borderColor="border"
              shadow="sm"
              center
            >
              <CText 
                variant="h2" 
                bold 
                color="primary"
                mb="xs"
              >
                {historyContent.length}
              </CText>
              <CText 
                variant="caption" 
                color="textSecondary"
                center
              >
                Recently Read
              </CText>
            </CView>
          </CView>
        </Animated.View>

        {/* Tab Selector */}
        <Animated.View entering={FadeInUp.delay(400).duration(600)}>
          <ButtonSelectorGroup
            options={['Saved', 'Downloaded', 'History']}
            selectedOption={selectedTab}
            onSelect={(option) => setSelectedTab(option as any)}
          />
        </Animated.View>

        {/* Content Section */}
        <AnimatedCView entering={FadeInUp.delay(600).duration(600)}>
          {currentContent.length > 0 && (
            <CView 
              row 
              justify="between" 
              align="center" 
              mb="md"
            >
              <CText 
                variant="h3" 
                bold
                flex={1}
              >
                {selectedTab} Content ({currentContent.length})
              </CText>
              <CButton
                title="Sort"
                variant="ghost"
                size="small"
                onPress={() => console.log('Sort content')}
                accessibilityLabel="Sort content"
                rightIcon={<CIcon name="chevron-down" size={4} color="textSecondary" />}
              />
            </CView>
          )}

          {currentContent.length > 0 ? (
            currentContent.map((post, index) => (
              <AnimatedCView
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
              </AnimatedCView>
            ))
          ) : (
            <CView 
              center 
              py="xxl"
            >
              <CView 
                width={80}
                height={80}
                borderRadius="full"
                bg="surface"
                center
                mb="lg"
              >
                <CIcon 
                  name={emptyState.icon} 
                  size={8} 
                  color="textSecondary"
                />
              </CView>
              <CText 
                variant="h3" 
                bold 
                center
                mb="sm"
              >
                {emptyState.title}
              </CText>
              <CText 
                variant="body" 
                color="textSecondary"
                center
                lines={4}
                mb="xl"
              >
                {emptyState.description}
              </CText>
              <CButton
                title={emptyState.action}
                onPress={() => console.log('Navigate to explore')}
                variant="gradient"
                gradientColors={colors.gradientPrimary}
                size="large"
                accessibilityLabel={`${emptyState.action} button`}
              />
            </CView>
          )}
        </AnimatedCView>

        <CView height={40} />
      </CScrollView>
    </ScreenWrapper>
  );
}