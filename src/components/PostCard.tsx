import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import { H1, Body } from '../theme/Typo';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  useSharedValue 
} from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

interface PostCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  category: 'magazine' | 'article' | 'digest';
  readTime?: string;
  author?: string;
  onPress?: () => void;
  variant?: 'default' | 'featured';
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export function PostCard({ 
  title, 
  description, 
  imageUrl, 
  category, 
  readTime, 
  author, 
  onPress,
  variant = 'default' 
}: PostCardProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const getGradientColors = () => {
    switch (category) {
      case 'magazine':
        return colors.gradientPrimary;
      case 'article':
        return colors.gradientSecondary;
      case 'digest':
        return colors.gradientAccent;
      default:
        return colors.gradientPrimary;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    scale.value = withSpring(0.98, { duration: 100 }, () => {
      scale.value = withSpring(1);
    });
    onPress?.();
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: variant === 'featured' ? 20 : 16,
      marginHorizontal: 20,
      marginVertical: 8,
      overflow: 'hidden',
      elevation: variant === 'featured' ? 8 : 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: variant === 'featured' ? 4 : 2 },
      shadowOpacity: variant === 'featured' ? 0.15 : 0.1,
      shadowRadius: variant === 'featured' ? 8 : 4,
    },
    featuredContainer: {
      width: screenWidth - 40,
      height: 240,
    },
    defaultContainer: {
      minHeight: 120,
    },
    imageContainer: {
      height: variant === 'featured' ? 140 : 80,
      position: 'relative',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    gradientOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.8,
    },
    categoryBadge: {
      position: 'absolute',
      top: 12,
      left: 12,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    content: {
      padding: variant === 'featured' ? 20 : 16,
      flex: 1,
    },
    title: {
      marginBottom: 8,
      lineHeight: variant === 'featured' ? 28 : 24,
    },
    description: {
      marginBottom: 12,
      lineHeight: 20,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto',
    },
    author: {
      flex: 1,
    },
    readTime: {
      flexShrink: 0,
    },
  });

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.container,
        variant === 'featured' ? styles.featuredContainer : styles.defaultContainer,
        animatedStyle
      ]}
      onPress={handlePress}
      activeOpacity={0.9}
      accessibilityLabel={`${category} post: ${title}`}
      accessible={true}
    >
      {imageUrl && (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image}
            defaultSource={require('../../assets/icon.png')}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)']}
            style={styles.gradientOverlay}
          />
          <View style={styles.categoryBadge}>
            <Body style={{ 
              color: colors.foreground, 
              fontSize: 12, 
              fontWeight: '600',
              textTransform: 'capitalize'
            }}>
              {category}
            </Body>
          </View>
        </View>
      )}
      
      <View style={styles.content}>
        <H1 
          style={[
            styles.title, 
            { 
              color: colors.text,
              fontSize: variant === 'featured' ? 20 : 18,
            }
          ]}
          numberOfLines={variant === 'featured' ? 2 : 2}
        >
          {title}
        </H1>
        
        <Body 
          style={[
            styles.description, 
            { color: colors.textSecondary }
          ]}
          numberOfLines={variant === 'featured' ? 3 : 2}
        >
          {description}
        </Body>
        
        <View style={styles.footer}>
          {author && (
            <Body style={[styles.author, { 
              color: colors.textSecondary, 
              fontSize: 12 
            }]}>
              By {author}
            </Body>
          )}
          {readTime && (
            <Body style={[styles.readTime, { 
              color: colors.primary, 
              fontSize: 12,
              fontWeight: '500' 
            }]}>
              {readTime}
            </Body>
          )}
        </View>
      </View>
    </AnimatedTouchableOpacity>
  );
}