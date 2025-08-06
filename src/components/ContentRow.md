# ContentRow Component

## Overview
A comprehensive, reusable component for displaying horizontally scrollable content sections in the EchoReads app. Automatically handles loading states, error handling, and animations.

## Features
- **Smart Loading States**: Skeleton cards during data fetching
- **Error Handling**: Styled error messages with retry options
- **Empty States**: Graceful handling when no content is available
- **Smooth Animations**: FadeInDown entry, FadeInRight for cards, scale on press
- **Responsive Design**: Uses `wp()` and `hp()` for consistent sizing
- **Accessibility**: Full screen reader support
- **See All Button**: Automatic "See All" button when content length > 2

## Props

```typescript
interface ContentRowProps {
  title: string;                    // Section title
  data: Post[];                     // Array of posts to display
  loading?: boolean;                // Show loading skeleton
  error?: string | null;            // Error message to display
  onPressItem?: (item: Post) => void; // Handle item press
  onPressSeeAll?: () => void;       // Handle "See All" press
  showSeeAll?: boolean;             // Show/hide "See All" button (default: true)
  emptyMessage?: string;            // Custom empty state message
  variant?: 'default' | 'compact'; // Visual variant (default: 'default')
}
```

## Usage Examples

### Basic Usage
```tsx
<ContentRow
  title="Trending Now"
  data={trendingPosts}
/>
```

### With Loading State
```tsx
<ContentRow
  title="New for You"
  data={newContent}
  loading={isLoading}
  error={error}
/>
```

### With Custom Handlers
```tsx
<ContentRow
  title="Recommended for You"
  data={recommended}
  onPressItem={(item) => navigation.navigate('PostDetail', { id: item.id })}
  onPressSeeAll={() => navigation.navigate('RecommendedList')}
/>
```

### Compact Variant
```tsx
<ContentRow
  title="Quick Reads"
  data={quickReads}
  variant="compact"
  emptyMessage="No quick reads available right now"
/>
```

### Full Example in Home Screen
```tsx
export default function HomeScreen() {
  const trending = useSelector(selectCurrentTrending);
  const loading = useSelector(selectCurrentLoading);
  const error = useSelector(selectCurrentError);

  return (
    <ScreenWrapper>
      <CScrollView>
        <ContentRow
          title="Trending Now"
          data={trending}
          loading={loading}
          error={error}
          onPressItem={(item) => router.push(`/post/${item.id}`)}
          onPressSeeAll={() => router.push('/trending')}
        />
        
        <ContentRow
          title="New for You"
          data={newContent}
          loading={loading}
          error={error}
        />
      </CScrollView>
    </ScreenWrapper>
  );
}
```

## Design Specifications

### Card Sizing
- **Card Width**: `wp(70)` (70% of screen width)
- **Card Spacing**: `wp(4)` (4% spacing between cards)
- **Card Height**: Auto (based on PostCard content)

### Animations
- **Row Entry**: `FadeInDown.duration(600)`
- **Card Entry**: `FadeInRight.delay(index * 100).duration(600)`
- **Press Animation**: Scale from 1 → 0.95 → 1 with spring physics

### Loading Skeleton
- 3 skeleton cards matching card dimensions
- Reduced opacity (0.6) for visual feedback
- Background: `colors.card`

### Error State
- Styled container with danger color accent
- Clear error message with context
- Subtle border with danger color (20% opacity)

### Empty State
- Hidden by default (returns null)
- Optional custom message via `emptyMessage` prop
- Styled container with muted text

## Integration with Redux

The component works seamlessly with the home screen Redux selectors:

```typescript
// In HomeScreen component
const trending = useSelector(selectCurrentTrending);
const newContent = useSelector(selectCurrentNew);
const recommended = useSelector(selectCurrentRecommended);
const loading = useSelector(selectCurrentLoading);
const error = useSelector(selectCurrentError);

// Use in ContentRow
<ContentRow
  title="Trending"
  data={trending}
  loading={loading}
  error={error}
/>
```

## Accessibility

- **Section Labels**: Each row has proper section identification
- **Item Navigation**: Cards support screen reader navigation
- **Action Buttons**: "See All" buttons have descriptive labels
- **Content Description**: Automatic content count announcements

## Performance Optimizations

- **Memoized Callbacks**: All functions use `useCallback` for stability
- **Snap Scrolling**: `snapToInterval` for smooth card navigation
- **Optimized Renders**: Conditional rendering prevents unnecessary updates
- **Animation Efficiency**: Shared values and native driver usage

## Best Practices

1. **Always provide loading state** for better UX
2. **Handle errors gracefully** with meaningful messages
3. **Use consistent titles** across sections for familiarity
4. **Implement navigation** via `onPressItem` and `onPressSeeAll`
5. **Consider content length** - hide sections with no content

The ContentRow component provides a **production-ready**, **consistent**, and **performant** way to display content sections throughout the EchoReads app!