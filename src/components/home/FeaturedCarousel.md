# FeaturedCarousel Component

## Overview
A sophisticated horizontally scrollable carousel component that displays featured posts based on the currently active post type (magazines, articles, or digests).

## Features
- **Dynamic Content**: Automatically switches content based on Redux state (`selectActivePostType`)
- **Smooth Animations**: FadeInDown entry animation, smooth scroll with pagination dots
- **Responsive Design**: Uses `wp()` and `hp()` for responsive sizing
- **Featured Badges**: Gradient-styled "Featured" label with category-specific colors
- **Loading States**: Skeleton cards during data fetching
- **Accessibility**: Full screen reader support with proper labels
- **Performance**: Optimized with `useCallback` and proper memo usage

## Usage

```tsx
// In your Home screen
import { FeaturedCarousel } from '../../src/components/home';

export default function HomeScreen() {
  return (
    <ScreenWrapper>
      <CScrollView>
        {/* Your other content */}
        
        <FeaturedCarousel />
        
        {/* More content */}
      </CScrollView>
    </ScreenWrapper>
  );
}
```

## Props
The component doesn't accept any props - it automatically connects to Redux state.

## Redux Integration
- **Selectors Used**:
  - `selectActivePostType`: Current tab (magazines/articles/digests)
  - `selectCurrentFeatured`: Featured posts for active type
  - `selectCurrentLoading`: Loading state

## Design Details
- **Card Width**: 85% of screen width (`wp(85)`)
- **Spacing**: 4% between cards (`wp(4)`)
- **Animations**: FadeInDown entrance, smooth pagination dots
- **Gradients**: Dynamic colors based on post type
- **Shadow**: Large shadow (`shadow="lg"`) for visual depth

## Customization
To customize the carousel, you can:
1. Modify `CARD_WIDTH` and `CARD_SPACING` constants
2. Change gradient colors in the badge section
3. Adjust animation timing and delays
4. Customize the pagination dots appearance

## Examples

### Basic Implementation
```tsx
<FeaturedCarousel />
```

### With Custom Wrapper
```tsx
<CView mt="lg" mb="xl">
  <FeaturedCarousel />
</CView>
```

The component handles all the complexity internally and provides a seamless, production-ready featured content experience.