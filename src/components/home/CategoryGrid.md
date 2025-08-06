# CategoryGrid Component

## Overview
A responsive, animated grid component that displays categories dynamically based on the current post type (magazines, articles, or digests). Features smooth animations, touch interactions, and comprehensive accessibility support.

## Features
- **Dynamic Content**: Automatically switches categories based on Redux `activePostType`
- **Responsive Grid**: 2-column layout on small screens, 3-column on larger screens
- **Rich Animations**: ZoomIn entry, bounce on press, color interpolation
- **Touch Feedback**: Scale animations with spring physics
- **Category Selection**: Visual feedback and callback support
- **Accessibility**: Full screen reader support with descriptive labels
- **Flexible Display**: Support for showing limited categories with "View All"

## Props

```typescript
interface CategoryGridProps {
  onSelectCategory?: (category: Category) => void; // Callback when category is selected
  showTitle?: boolean;                             // Show/hide "Categories" title (default: true)
  maxCategories?: number;                          // Limit number of categories displayed
  variant?: 'default' | 'compact';               // Visual variant (default: 'default')
}
```

## Category Data Structure

```typescript
interface Category {
  id: string;        // Unique identifier
  name: string;      // Display name
  icon: string;      // Ionicon name
  color: string;     // Hex color for theming
  count: number;     // Number of posts in category
}
```

## Usage Examples

### Basic Usage
```tsx
<CategoryGrid />
```

### With Selection Callback
```tsx
<CategoryGrid 
  onSelectCategory={(category) => {
    console.log('Selected:', category.name);
    // Navigate to category view or filter content
  }}
/>
```

### Limited Categories
```tsx
<CategoryGrid 
  maxCategories={6}
  variant="compact"
  onSelectCategory={(category) => {
    router.push(`/category/${category.id}`);
  }}
/>
```

### Without Title
```tsx
<CategoryGrid 
  showTitle={false}
  maxCategories={4}
/>
```

## Redux Integration

The component automatically connects to Redux state:

```typescript
// Selects categories based on current post type
const categories = useSelector(selectCurrentCategories);

// Dynamic selector switches between:
// - selectMagazinesCategories (Technology, Business, Science, etc.)
// - selectArticlesCategories (Programming, Productivity, Design, etc.)
// - selectDigestsCategories (Tech News, Market Digest, Sports, etc.)
```

## Design Specifications

### Responsive Layout
- **Small Screens** (`width ≤ 400px`): 2 columns, `wp(45)` card width
- **Large Screens** (`width > 400px`): 3 columns, `wp(30)` card width
- **Card Height**: `hp(12)` (default), `hp(9.6)` (compact)

### Card Structure
```tsx
<CategoryTile>
  <IconContainer background={category.color + '20'}>
    <Icon color={category.color} />
  </IconContainer>
  <CategoryName />
  <PostCount />
</CategoryTile>
```

### Animations
- **Entry**: `ZoomIn.delay(index * 150)` (default) or `FadeIn.delay(index * 100)` (compact)
- **Press**: Scale from 1 → 0.95 → 1 with spring physics
- **Selection**: Color interpolation and border highlighting

### Color System
- **Card Background**: Dynamic based on theme (`colors.card`)
- **Icon Background**: Category color with 20% opacity
- **Icon Color**: Full category color
- **Selection**: Primary color border and background tint

## State Management

### Selection State
```typescript
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

// Visual feedback for selected category
const isSelected = selectedCategory === category.id;
```

### Animation Values
```typescript
const scaleValue = useSharedValue(1);

// Animated style with color interpolation
const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scaleValue.value }],
  backgroundColor: isSelected ? colors.primary + '20' : colors.card,
}));
```

## Category Data by Post Type

### Magazines
- Technology, Business, Science, Health, Lifestyle, Travel

### Articles  
- Programming, Productivity, Design, Career, Finance, Learning

### Digests
- Tech News, Market Digest, Health Update, Sports, Entertainment, Science

## Accessibility Features

- **Screen Reader Support**: Descriptive labels with category name and post count
- **Button Roles**: Proper `accessibilityRole="button"` 
- **State Announcements**: Selection state changes announced
- **High Contrast**: Proper color contrast ratios
- **Touch Targets**: Minimum 44pt touch targets

## Performance Optimizations

- **Memoized Callbacks**: All functions use `useCallback` for stability
- **Efficient Animations**: Native driver with shared values
- **Conditional Rendering**: Smart empty state handling
- **Optimized Re-renders**: Minimal state changes

## Integration Example

```tsx
// In HomeScreen
import { CategoryGrid } from '../../src/components/home';

export default function HomeScreen() {
  const handleCategorySelect = useCallback((category: Category) => {
    // Option 1: Filter current content
    dispatch(filterByCategory(category.id));
    
    // Option 2: Navigate to category page
    router.push(`/explore?category=${category.id}`);
    
    // Option 3: Update search/filter state
    setSelectedFilter({ type: 'category', value: category.id });
  }, []);

  return (
    <CScrollView>
      <FeaturedCarousel />
      
      <CategoryGrid 
        maxCategories={6}
        onSelectCategory={handleCategorySelect}
      />
      
      <ContentRow title="Trending" data={trending} />
    </CScrollView>
  );
}
```

## Customization Options

### Visual Variants
- **Default**: Full-size cards with larger text and icons
- **Compact**: Smaller cards for denser layouts

### Grid Configuration
```typescript
const GRID_COLUMNS = screenWidth > 400 ? 3 : 2;
const CARD_WIDTH = screenWidth > 400 ? wp(30) : wp(45);
```

### Animation Customization
```typescript
// Entry animations
variant === 'compact'
  ? FadeIn.delay(index * 100).duration(600)
  : ZoomIn.delay(index * 150).duration(600)
```

The CategoryGrid component provides a **production-ready**, **responsive**, and **beautifully animated** way to display and interact with content categories in the EchoReads app!