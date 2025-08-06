import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post, Category } from './magazinesSlice';

interface ArticlesState {
  featured: Post[];
  trending: Post[];
  recommended: Post[];
  newContent: Post[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  featured: [],
  trending: [],
  recommended: [],
  newContent: [],
  categories: [
    { id: '1', name: 'Programming', icon: 'code-slash-outline', color: '#3B82F6', count: 58 },
    { id: '2', name: 'Productivity', icon: 'time-outline', color: '#10B981', count: 44 },
    { id: '3', name: 'Design', icon: 'color-palette-outline', color: '#F59E0B', count: 36 },
    { id: '4', name: 'Career', icon: 'trophy-outline', color: '#8B5CF6', count: 29 },
    { id: '5', name: 'Finance', icon: 'card-outline', color: '#EF4444', count: 31 },
    { id: '6', name: 'Learning', icon: 'school-outline', color: '#06B6D4', count: 42 },
  ],
  loading: false,
  error: null,
};

// Async thunks for fetching articles data
export const fetchArticlesFeatured = createAsyncThunk(
  'articles/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const mockData: Post[] = [
        {
          id: 'a1',
          title: 'Quick Guide to React Hooks',
          description: 'Master React Hooks in 5 minutes with practical examples.',
          imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
          category: 'Programming',
          readTime: '5 min read',
          author: 'Tech Writer',
          publishedAt: '2024-01-15T14:00:00Z',
          featured: true,
        },
        {
          id: 'a2',
          title: 'Morning Productivity Hacks',
          description: 'Simple habits to boost your productivity every morning.',
          imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
          category: 'Productivity',
          readTime: '3 min read',
          author: 'Life Coach',
          publishedAt: '2024-01-15T10:30:00Z',
          featured: true,
        },
      ];
      return mockData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch featured articles');
    }
  }
);

export const fetchArticlesTrending = createAsyncThunk(
  'articles/fetchTrending',
  async (_, { rejectWithValue }) => {
    try {
      const mockData: Post[] = [
        {
          id: 'a3',
          title: 'AI in Everyday Life',
          description: 'How artificial intelligence is changing our daily routines.',
          imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
          category: 'Technology',
          readTime: '4 min read',
          author: 'AI Expert',
          publishedAt: '2024-01-14T16:00:00Z',
          trending: true,
        },
        {
          id: 'a4',
          title: 'Quick Healthy Recipes',
          description: 'Five 15-minute meals that are both delicious and nutritious.',
          imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
          category: 'Food',
          readTime: '6 min read',
          author: 'Chef Maria',
          publishedAt: '2024-01-14T12:00:00Z',
          trending: true,
        },
      ];
      return mockData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch trending articles');
    }
  }
);

export const fetchArticlesRecommended = createAsyncThunk(
  'articles/fetchRecommended',
  async (_, { rejectWithValue }) => {
    try {
      const mockData: Post[] = [
        {
          id: 'a5',
          title: 'Remote Work Tips',
          description: 'Essential strategies for working effectively from home.',
          imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400',
          category: 'Work',
          readTime: '7 min read',
          author: 'Remote Expert',
          publishedAt: '2024-01-13T09:30:00Z',
        },
        {
          id: 'a6',
          title: 'Investment Basics',
          description: 'A beginner\'s guide to investing in the stock market.',
          imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
          category: 'Finance',
          readTime: '8 min read',
          author: 'Financial Advisor',
          publishedAt: '2024-01-13T14:00:00Z',
        },
      ];
      return mockData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch recommended articles');
    }
  }
);

export const fetchArticlesNew = createAsyncThunk(
  'articles/fetchNew',
  async (_, { rejectWithValue }) => {
    try {
      const mockData: Post[] = [
        {
          id: 'a7',
          title: 'Weekend Project Ideas',
          description: 'Fun DIY projects you can complete in a weekend.',
          imageUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400',
          category: 'DIY',
          readTime: '4 min read',
          author: 'DIY Expert',
          publishedAt: '2024-01-15T15:00:00Z',
        },
        {
          id: 'a8',
          title: 'Mind Mapping Techniques',
          description: 'Improve your thinking and organization with mind mapping.',
          imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
          category: 'Learning',
          readTime: '5 min read',
          author: 'Study Expert',
          publishedAt: '2024-01-15T11:00:00Z',
        },
      ];
      return mockData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch new articles');
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    clearArticlesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Featured articles
    builder
      .addCase(fetchArticlesFeatured.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticlesFeatured.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload;
      })
      .addCase(fetchArticlesFeatured.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Trending articles
    builder
      .addCase(fetchArticlesTrending.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticlesTrending.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
      })
      .addCase(fetchArticlesTrending.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Recommended articles
    builder
      .addCase(fetchArticlesRecommended.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticlesRecommended.fulfilled, (state, action) => {
        state.loading = false;
        state.recommended = action.payload;
      })
      .addCase(fetchArticlesRecommended.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // New articles
    builder
      .addCase(fetchArticlesNew.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticlesNew.fulfilled, (state, action) => {
        state.loading = false;
        state.newContent = action.payload;
      })
      .addCase(fetchArticlesNew.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearArticlesError } = articlesSlice.actions;
export default articlesSlice.reducer;