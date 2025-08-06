import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post, Category } from './magazinesSlice';

interface DigestsState {
  featured: Post[];
  trending: Post[];
  recommended: Post[];
  newContent: Post[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: DigestsState = {
  featured: [],
  trending: [],
  recommended: [],
  newContent: [],
  categories: [
    { id: '1', name: 'Tech News', icon: 'newspaper-outline', color: '#3B82F6', count: 67 },
    { id: '2', name: 'Market Digest', icon: 'trending-up-outline', color: '#10B981', count: 52 },
    { id: '3', name: 'Health Update', icon: 'medical-outline', color: '#F59E0B', count: 39 },
    { id: '4', name: 'Sports', icon: 'basketball-outline', color: '#EF4444', count: 43 },
    { id: '5', name: 'Entertainment', icon: 'film-outline', color: '#8B5CF6', count: 28 },
    { id: '6', name: 'Science', icon: 'telescope-outline', color: '#06B6D4', count: 34 },
  ],
  loading: false,
  error: null,
};

// Async thunks for fetching digests data
export const fetchDigestsFeatured = createAsyncThunk(
  'digests/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const mockData: Post[] = [
        {
          id: 'd1',
          title: 'Tech News Weekly',
          description: 'Your weekly roundup of the most important tech news and updates.',
          imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
          category: 'Technology',
          readTime: '8 min read',
          author: 'News Team',
          publishedAt: '2024-01-15T06:00:00Z',
          featured: true,
        },
        {
          id: 'd2',
          title: 'Market Digest',
          description: 'Daily market movements, trends, and key financial updates.',
          imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400',
          category: 'Finance',
          readTime: '6 min read',
          author: 'Market Analyst',
          publishedAt: '2024-01-15T07:00:00Z',
          featured: true,
        },
      ];
      return mockData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch featured digests');
    }
  }
);

export const fetchDigestsTrending = createAsyncThunk(
  'digests/fetchTrending',
  async (_, { rejectWithValue }) => {
    try {
      const mockData: Post[] = [
        {
          id: 'd3',
          title: 'Health & Wellness Summary',
          description: 'Latest health trends, research findings, and wellness tips.',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          category: 'Health',
          readTime: '5 min read',
          author: 'Health Team',
          publishedAt: '2024-01-14T08:00:00Z',
          trending: true,
        },
        {
          id: 'd4',
          title: 'Sports Highlights',
          description: 'Weekly sports roundup with scores, highlights, and player news.',
          imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
          category: 'Sports',
          readTime: '7 min read',
          author: 'Sports Desk',
          publishedAt: '2024-01-14T19:00:00Z',
          trending: true,
        },
      ];
      return mockData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch trending digests');
    }
  }
);

export const fetchDigestsRecommended = createAsyncThunk(
  'digests/fetchRecommended',
  async (_, { rejectWithValue }) => {
    try {
      const mockData: Post[] = [
        {
          id: 'd5',
          title: 'Entertainment Weekly',
          description: 'Movies, music, books, and entertainment industry updates.',
          imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
          category: 'Entertainment',
          readTime: '9 min read',
          author: 'Entertainment Editor',
          publishedAt: '2024-01-13T20:00:00Z',
        },
        {
          id: 'd6',
          title: 'Science Discoveries',
          description: 'Recent scientific breakthroughs and research highlights.',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          category: 'Science',
          readTime: '10 min read',
          author: 'Science Team',
          publishedAt: '2024-01-13T13:00:00Z',
        },
      ];
      return mockData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch recommended digests');
    }
  }
);

export const fetchDigestsNew = createAsyncThunk(
  'digests/fetchNew',
  async (_, { rejectWithValue }) => {
    try {
      const mockData: Post[] = [
        {
          id: 'd7',
          title: 'Climate Update',
          description: 'Environmental news, climate research, and sustainability updates.',
          imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400',
          category: 'Environment',
          readTime: '6 min read',
          author: 'Environmental Reporter',
          publishedAt: '2024-01-15T09:00:00Z',
        },
        {
          id: 'd8',
          title: 'Culture & Society',
          description: 'Social trends, cultural movements, and community stories.',
          imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400',
          category: 'Culture',
          readTime: '8 min read',
          author: 'Culture Writer',
          publishedAt: '2024-01-15T13:00:00Z',
        },
      ];
      return mockData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch new digests');
    }
  }
);

const digestsSlice = createSlice({
  name: 'digests',
  initialState,
  reducers: {
    clearDigestsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Featured digests
    builder
      .addCase(fetchDigestsFeatured.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDigestsFeatured.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload;
      })
      .addCase(fetchDigestsFeatured.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Trending digests
    builder
      .addCase(fetchDigestsTrending.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDigestsTrending.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
      })
      .addCase(fetchDigestsTrending.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Recommended digests
    builder
      .addCase(fetchDigestsRecommended.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDigestsRecommended.fulfilled, (state, action) => {
        state.loading = false;
        state.recommended = action.payload;
      })
      .addCase(fetchDigestsRecommended.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // New digests
    builder
      .addCase(fetchDigestsNew.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDigestsNew.fulfilled, (state, action) => {
        state.loading = false;
        state.newContent = action.payload;
      })
      .addCase(fetchDigestsNew.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDigestsError } = digestsSlice.actions;
export default digestsSlice.reducer;