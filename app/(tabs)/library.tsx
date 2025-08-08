import React, { useState } from 'react';
import { CView, CText, CScrollView } from '../../src/components/core';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { useTheme } from '../../src/hooks/useTheme';
import { PostCard } from '../../src/components/PostCard';
import { ButtonSelectorGroup } from '../../src/components/ButtonSelectorGroup';
import { EmptyState } from '../../src/components/EmptyState';
import { DemoPost } from '../../src/data/demoData';
import Animated, { 
  FadeInDown,
  FadeInUp,
  SlideInLeft,
} from 'react-native-reanimated';

type LibraryTab = 'saved' | 'downloaded' | 'reading' | 'completed';

interface ReadingStats {
  totalRead: number;
  thisWeek: number;
  thisMonth: number;
  averageTime: string;
  favoriteCategory: string;
}

export default function LibraryScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<LibraryTab>('saved');
  
  // Mock data - in real app, this would come from Redux/API
  const [savedPosts] = useState<DemoPost[]>([
    {
      id: 'mag1',
      title: 'Tech Innovations 2024',
      description: 'Exploring the latest breakthroughs in artificial intelligence, quantum computing, and sustainable technology that will shape our future.',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      category: 'magazine',
      readTime: '15 min',
      author: 'Sarah Chen',
      publishedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: 'art1',
      title: 'The Future of Remote Work',
      description: 'How distributed teams are reshaping corporate culture and what it means for the next generation of professionals.',
      imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
      category: 'article',
      readTime: '8 min',
      author: 'James Wilson',
      publishedAt: '2024-01-14T16:45:00Z'
    }
  ]);

  const [readingStats] = useState<ReadingStats>({
    totalRead: 47,
    thisWeek: 3,
    thisMonth: 12,
    averageTime: '8 min',
    favoriteCategory: 'Technology'
  });

  // Tab options
  const tabOptions = ['saved', 'downloaded', 'reading', 'completed'];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as LibraryTab);
  };

  const handlePostPress = (post: DemoPost) => {
    console.log('Post pressed:', post.title);
    // TODO: Navigate to post detail screen
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'saved':
        return savedPosts.length > 0 ? (
          savedPosts.map((post, index) => (
            <Animated.View
              key={post.id}
              entering={SlideInLeft.delay(index * 100).springify()}
            >
              <PostCard
                title={post.title}
                description={post.description}
                imageUrl={post.imageUrl}
                category={post.category}
                readTime={post.readTime}
                author={post.author}
                onPress={() => handlePostPress(post)}
                variant="default"
              />
            </Animated.View>
          ))
        ) : (
          <EmptyState
            icon="bookmark-outline"
            title="No Saved Content"
            description="Save articles, magazines, and digests to read them later"
          />
        );
      
      case 'downloaded':
        return (
          <EmptyState
            icon="download-outline"
            title="No Downloads"
            description="Download content to read offline"
          />
        );
      
      case 'reading':
        return (
          <EmptyState
            icon="time-outline"
            title="No Reading Progress"
            description="Start reading content to track your progress"
          />
        );
      
      case 'completed':
        return (
          <EmptyState
            icon="checkmark-circle-outline"
            title="No Completed Content"
            description="Finish reading content to see it here"
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <ScreenWrapper
      safeArea={true}
      keyboardAvoiding={false}
    >
      <CScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header Section */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <CView 
            px="lg" 
            pt="lg" 
            pb="md"
          >
            <CText 
              variant="h1" 
              bold 
              mb="xs"
            >
              Library
            </CText>
            <CText 
              variant="bodyLarge" 
              color="textSecondary"
            >
              Your personal reading collection
            </CText>
          </CView>
        </Animated.View>

        {/* Reading Statistics */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <CView 
            bg="card" 
            mx="lg" 
            p="lg" 
            borderRadius="lg"
            shadow="md"
            mb="lg"
          >
            <CText 
              variant="h3" 
              bold 
              mb="md"
            >
              Reading Stats
            </CText>
            <CView row justify="space-between">
              <CView center>
                <CText 
                  variant="h2" 
                  bold 
                  color="primary"
                >
                  {readingStats.totalRead}
                </CText>
                <CText 
                  variant="caption" 
                  color="textSecondary"
                >
                  Total Read
                </CText>
              </CView>
              <CView center>
                <CText 
                  variant="h2" 
                  bold 
                  color="primary"
                >
                  {readingStats.thisWeek}
                </CText>
                <CText 
                  variant="caption" 
                  color="textSecondary"
                >
                  This Week
                </CText>
              </CView>
              <CView center>
                <CText 
                  variant="h2" 
                  bold 
                  color="primary"
                >
                  {readingStats.averageTime}
                </CText>
                <CText 
                  variant="caption" 
                  color="textSecondary"
                >
                  Avg. Time
                </CText>
              </CView>
            </CView>
          </CView>
        </Animated.View>

        {/* Tab Navigation */}
        <Animated.View entering={FadeInDown.delay(400).springify()}>
          <CView px="lg" mb="lg">
            <ButtonSelectorGroup
              options={tabOptions}
              selectedOption={activeTab}
              onSelect={handleTabChange}
              variant="default"
            />
          </CView>
        </Animated.View>

        {/* Content List */}
        <Animated.View entering={FadeInUp.delay(500).springify()}>
          <CView px="lg">
            {renderContent()}
          </CView>
        </Animated.View>

        {/* Bottom Spacing */}
        <CView pb="xxl" />
      </CScrollView>
    </ScreenWrapper>
  );
}