import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/hooks/useTheme';
import { H1, Body } from '../../src/theme/Typo';
import { SearchBar } from '../../src/components/SearchBar';
import { ButtonSelectorGroup } from '../../src/components/ButtonSelectorGroup';
import { PostCard } from '../../src/components/PostCard';
import { getAllDemoPosts, DemoPost } from '../../src/data/demoData';
import Animated, { 
  FadeInDown,
  FadeInUp,
  Layout 
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

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
    headerTitle: {
      marginBottom: 16,
    },
    filterContainer: {
      backgroundColor: colors.card,
      marginHorizontal: 20,
      marginBottom: 16,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    filterTitle: {
      marginBottom: 16,
    },
    filterOptions: {
      gap: 8,
    },
    filterOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    selectedFilterOption: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    resultsContainer: {
      flex: 1,
    },
    resultsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    resultsCount: {
      flex: 1,
    },
    clearButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: colors.muted,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
      paddingVertical: 60,
    },
    emptyStateText: {
      textAlign: 'center',
      marginTop: 16,
      lineHeight: 24,
    },
    emptyStateSubtext: {
      textAlign: 'center',
      marginTop: 8,
      lineHeight: 20,
    },
  });

  const filterOptions = [
    { label: 'All', value: 'All', count: categoryStats.total },
    { label: 'Magazines', value: 'Magazine', count: categoryStats.magazine },
    { label: 'Articles', value: 'Article', count: categoryStats.article },
    { label: 'Digests', value: 'Digest', count: categoryStats.digest },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.safeArea} showsVerticalScrollIndicator={false}>
        <Animated.View style={styles.header} entering={FadeInDown.duration(600)}>
          <H1 style={[styles.headerTitle, { color: colors.text, fontSize: 28 }]}>
            Explore Content
          </H1>
          
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            showFilter={true}
            onFilterPress={handleFilterPress}
            placeholder="Search magazines, articles, digests..."
          />
        </Animated.View>

        {showFilters && (
          <AnimatedView
            style={styles.filterContainer}
            entering={FadeInDown.duration(400)}
            exiting={FadeInUp.duration(300)}
            layout={Layout.springify()}
          >
            <H1 style={[styles.filterTitle, { color: colors.text, fontSize: 18 }]}>
              Filter by Category
            </H1>
            
            <View style={styles.filterOptions}>
              {filterOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.filterOption,
                    selectedFilter === option.value && styles.selectedFilterOption
                  ]}
                  onPress={() => setSelectedFilter(option.value as any)}
                  accessibilityLabel={`Filter by ${option.label}`}
                  accessible={true}
                >
                  <Body style={{ 
                    color: selectedFilter === option.value ? '#ffffff' : colors.text,
                    fontWeight: selectedFilter === option.value ? '600' : '400'
                  }}>
                    {option.label}
                  </Body>
                  <Body style={{ 
                    color: selectedFilter === option.value ? 'rgba(255,255,255,0.8)' : colors.textSecondary,
                    fontSize: 14
                  }}>
                    {option.count}
                  </Body>
                </TouchableOpacity>
              ))}
            </View>
          </AnimatedView>
        )}

        <AnimatedView style={styles.resultsContainer} entering={FadeInUp.delay(300).duration(600)}>
          <View style={styles.resultsHeader}>
            <View style={styles.resultsCount}>
              <Body style={{ color: colors.text, fontWeight: '600', fontSize: 16 }}>
                {filteredPosts.length} results
              </Body>
              {searchQuery.trim() && (
                <Body style={{ color: colors.textSecondary, fontSize: 14, marginTop: 2 }}>
                  for "{searchQuery}"
                </Body>
              )}
            </View>
            
            {(searchQuery.trim() || selectedFilter !== 'All') && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setSearchQuery('');
                  setSelectedFilter('All');
                }}
                accessibilityLabel="Clear filters"
                accessible={true}
              >
                <Body style={{ color: colors.primary, fontSize: 14, fontWeight: '500' }}>
                  Clear
                </Body>
              </TouchableOpacity>
            )}
          </View>

          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <AnimatedView
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
              </AnimatedView>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons 
                name="search-outline" 
                size={64} 
                color={colors.textSecondary} 
              />
              <H1 style={[styles.emptyStateText, { color: colors.text, fontSize: 20 }]}>
                No results found
              </H1>
              <Body style={[styles.emptyStateSubtext, { color: colors.textSecondary }]}>
                {searchQuery.trim() 
                  ? `We couldn't find any content matching "${searchQuery}". Try different keywords or browse all content.`
                  : 'No content available in this category. Check back later for updates!'
                }
              </Body>
            </View>
          )}
        </AnimatedView>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}