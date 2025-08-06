import React, { useState, useMemo } from 'react';
import { CView, CText, CButton, CIcon, CScrollView } from '../../src/components/core';
import { Spacing, Radius, Shadow } from '../../src/constants/layout';
import { useTheme } from '../../src/hooks/useTheme';
import { SearchBar } from '../../src/components/SearchBar';
import { ButtonSelectorGroup } from '../../src/components/ButtonSelectorGroup';
import { PostCard } from '../../src/components/PostCard';
import { ScreenWrapper } from '../../src/components/ScreenWrapper';
import { getAllDemoPosts, DemoPost } from '../../src/data/demoData';
import Animated, { 
  FadeInDown,
  FadeInUp,
  Layout 
} from 'react-native-reanimated';

const AnimatedCView = Animated.createAnimatedComponent(CView);

export default function ExploreScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Magazine' | 'Article' | 'Digest'>('All');
  const [showFilters, setShowFilters] = useState(false);

  const allPosts = getAllDemoPosts();

  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    // Filter by category
    if (selectedFilter !== 'All') {
      const categoryMap = {
        'Magazine': 'magazine',
        'Article': 'article',
        'Digest': 'digest'
      };
      posts = posts.filter(post => post.category === categoryMap[selectedFilter]);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query)
      );
    }

    return posts;
  }, [allPosts, selectedFilter, searchQuery]);

  const categoryStats = useMemo(() => {
    const stats = allPosts.reduce((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      magazine: stats.magazine || 0,
      article: stats.article || 0,
      digest: stats.digest || 0,
      total: allPosts.length
    };
  }, [allPosts]);

  const handleFilterPress = () => {
    setShowFilters(!showFilters);
  };

  const filterOptions = [
    { label: 'All', value: 'All', count: categoryStats.total },
    { label: 'Magazines', value: 'Magazine', count: categoryStats.magazine },
    { label: 'Articles', value: 'Article', count: categoryStats.article },
    { label: 'Digests', value: 'Digest', count: categoryStats.digest },
  ];

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
            <CText 
              variant="h1" 
              bold 
              mb="md"
            >
              Explore Content
            </CText>
            
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              showFilter={true}
              onFilterPress={handleFilterPress}
              placeholder="Search magazines, articles, digests..."
            />
          </CView>
        </Animated.View>

        {/* Filter Section */}
        {showFilters && (
          <AnimatedCView
            bg="card"
            p="lg"
            borderRadius="lg"
            borderWidth={1}
            borderColor="border"
            shadow="sm"
            mb="md"
            entering={FadeInDown.duration(400)}
            exiting={FadeInUp.duration(300)}
            layout={Layout.springify()}
          >
            <CText 
              variant="h3" 
              bold 
              mb="md"
            >
              Filter by Category
            </CText>
            
            <CView style={{ gap: Spacing.sm }}>
              {filterOptions.map((option) => (
                <CView
                  key={option.value}
                  row 
                  justify="between" 
                  align="center"
                  py="sm"
                  px="md"
                  borderRadius="md"
                  borderWidth={1}
                  borderColor="border"
                  bg={selectedFilter === option.value ? 'primary' : 'transparent'}
                  onPress={() => setSelectedFilter(option.value as any)}
                  pressable
                  accessibilityLabel={`Filter by ${option.label}`}
                >
                  <CText 
                    color={selectedFilter === option.value ? 'white' : 'text'}
                    bold={selectedFilter === option.value}
                  >
                    {option.label}
                  </CText>
                  <CText 
                    variant="bodySmall"
                    color={selectedFilter === option.value ? 'white' : 'textSecondary'}
                    style={{ opacity: selectedFilter === option.value ? 0.8 : 1 }}
                  >
                    {option.count}
                  </CText>
                </CView>
              ))}
            </CView>
          </AnimatedCView>
        )}

        {/* Results Section */}
        <AnimatedCView entering={FadeInUp.delay(300).duration(600)}>
          <CView 
            row 
            justify="between" 
            align="center" 
            mb="md"
          >
            <CView flex={1}>
              <CText 
                variant="bodyLarge" 
                bold
              >
                {filteredPosts.length} results
              </CText>
              {searchQuery.trim() && (
                <CText 
                  variant="bodySmall" 
                  color="textSecondary"
                  mt="xs"
                >
                  for "{searchQuery}"
                </CText>
              )}
            </CView>
            
            {(searchQuery.trim() || selectedFilter !== 'All') && (
              <CButton
                title="Clear"
                variant="ghost"
                size="small"
                onPress={() => {
                  setSearchQuery('');
                  setSelectedFilter('All');
                }}
                accessibilityLabel="Clear filters"
              />
            )}
          </CView>

          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <AnimatedCView
                key={post.id}
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
              <CIcon 
                name="search-outline" 
                size={16} 
                color="textSecondary"
                mb="lg"
              />
              <CText 
                variant="h3" 
                bold 
                center
                mb="sm"
              >
                No results found
              </CText>
              <CText 
                variant="body" 
                color="textSecondary"
                center
                lines={4}
              >
                {searchQuery.trim() 
                  ? `We couldn't find any content matching "${searchQuery}". Try different keywords or browse all content.`
                  : 'No content available in this category. Check back later for updates!'
                }
              </CText>
            </CView>
          )}
        </AnimatedCView>

        <CView height={40} />
      </CScrollView>
    </ScreenWrapper>
  );
}