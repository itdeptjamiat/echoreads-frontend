import React from 'react';
import { Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CView, CText, CIcon } from './core';
import { Spacing, Radius, Shadow } from '../constants/layout';
import { useTheme } from '../hooks/useTheme';
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

const AnimatedCView = Animated.createAnimatedComponent(CView);

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

  const getCategoryIcon = () => {
    switch (category) {
      case 'magazine':
        return 'book';
      case 'article':
        return 'document-text';
      case 'digest':
        return 'newspaper';
      default:
        return 'book';
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

  const getCardStyle = () => {
    const baseStyle = {
      bg: 'card',
      borderRadius: variant === 'featured' ? 'xl' : 'lg',
      mx: 'lg',
      my: 'sm',
      shadow: variant === 'featured' ? 'lg' : 'md',
      overflow: 'hidden' as const,
    };

    if (variant === 'featured') {
      return {
        ...baseStyle,
        width: screenWidth - (Spacing.lg * 2),
        height: 240,
      };
    }

    return {
      ...baseStyle,
      minHeight: 120,
    };
  };

  return (
    <AnimatedCView
      {...getCardStyle()}
      style={animatedStyle}
      onPress={handlePress}
      pressable
      accessibilityLabel={`${category} post: ${title}`}
    >
      {imageUrl && (
        <CView 
          height={variant === 'featured' ? 140 : 80}
          position="relative"
          overflow="hidden"
        >
          <Image 
            source={{ uri: imageUrl }} 
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
            defaultSource={require('../../assets/icon.png')}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)']}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.8,
            }}
          />
          <CView 
            position="absolute"
            top={12}
            left={12}
            px="md"
            py="xs"
            borderRadius="full"
            bg="background"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            row
            align="center"
          >
            <CIcon 
              name={getCategoryIcon()} 
              size={3} 
              color="primary"
              mr="xs"
            />
            <CText 
              variant="caption" 
              color="foreground" 
              bold
              style={{ textTransform: 'capitalize' }}
            >
              {category}
            </CText>
          </CView>
        </CView>
      )}
      
      <CView 
        p={variant === 'featured' ? 'lg' : 'md'}
        flex={1}
      >
        <CText 
          variant={variant === 'featured' ? 'h3' : 'bodyLarge'}
          bold
          mb="sm"
          lines={2}
          style={{
            lineHeight: variant === 'featured' ? 28 : 24,
          }}
        >
          {title}
        </CText>
        
        <CText 
          variant="body"
          color="textSecondary"
          mb="md"
          lines={variant === 'featured' ? 3 : 2}
          style={{ lineHeight: 20 }}
        >
          {description}
        </CText>
        
        <CView 
          row 
          justify="between" 
          align="center"
          mt="auto"
        >
          {author && (
            <CText 
              variant="caption" 
              color="textSecondary"
              flex={1}
            >
              By {author}
            </CText>
          )}
          {readTime && (
            <CText 
              variant="caption" 
              color="primary"
              bold
            >
              {readTime}
            </CText>
          )}
        </CView>
      </CView>
    </AnimatedCView>
  );
}