import React, { useState, useCallback } from 'react';
import { CView, CText, CScrollView } from '../../src/components/core';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { useTheme } from '../../src/hooks/useTheme';
import { SearchBar } from '../../src/components/SearchBar';
import { PostCard } from '../../src/components/PostCard';
import { ButtonSelectorGroup } from '../../src/components/ButtonSelectorGroup';
import { getAllDemoPosts, DemoPost } from '../../src/data/demoData';
import Animated, { 
  FadeInDown,
  FadeInUp,
  SlideInRight,
} from 'react-native-reanimated';

type FilterType = 'all' | 'magazine' | 'article' | 'digest';

export default function ExploreScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [filteredPosts, setFilteredPosts] = useState<DemoPost[]>([]);

  // Filter options for the button selector
  const filterOptions = ['all', 'magazine', 'article', 'digest'];

  // Get all demo posts
  const allPosts = getAllDemoPosts();

  // Filter and search posts
  const filterPosts = useCallback(() => {
    let filtered = allPosts;

    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(post => post.category === activeFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query)
      );
    }

    setFilteredPosts(filtered);
  }, [allPosts, activeFilter, searchQuery]);

  // Update filtered posts when filters change
  React.useEffect(() => {
    filterPosts();
  }, [filterPosts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter as FilterType);
  };

  const handlePostPress = (post: DemoPost) => {
    console.log('Post pressed:', post.title);
    // TODO: Navigate to post detail screen
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
              Explore
            </CText>
            <CText 
              variant="bodyLarge" 
              color="textSecondary"
            >
              Discover new content and stories
            </CText>
          </CView>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <CView px="lg" mb="lg">
            <SearchBar
              placeholder="Search articles, magazines, digests..."
              onChangeText={handleSearch}
              value={searchQuery}
            />
          </CView>
        </Animated.View>

        {/* Filter Buttons */}
        <Animated.View entering={FadeInDown.delay(400).springify()}>
          <CView px="lg" mb="lg">
            <ButtonSelectorGroup
              options={filterOptions}
              selectedOption={activeFilter}
              onSelect={handleFilterChange}
              variant="gradient"
            />
          </CView>
        </Animated.View>

        {/* Results Count */}
        <Animated.View entering={FadeInUp.delay(500).springify()}>
          <CView px="lg" mb="md">
            <CText 
              variant="body" 
              color="textSecondary"
            >
              {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} found
            </CText>
          </CView>
        </Animated.View>

        {/* Content List */}
        <Animated.View entering={FadeInUp.delay(600).springify()}>
          <CView px="lg">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <Animated.View
                  key={post.id}
                  entering={SlideInRight.delay(index * 100).springify()}
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
              <CView 
                center 
                py="xxl"
              >
                <CText 
                  variant="body" 
                  color="textSecondary"
                  center
                >
                  {searchQuery || activeFilter !== 'all' 
                    ? 'No content found matching your criteria'
                    : 'No content available'
                  }
                </CText>
              </CView>
            )}
          </CView>
        </Animated.View>

        {/* Bottom Spacing */}
        <CView pb="xxl" />
      </CScrollView>
    </ScreenWrapper>
  );
}