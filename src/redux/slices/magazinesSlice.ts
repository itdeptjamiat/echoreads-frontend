import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  readTime: string;
  author: string;
  publishedAt: string;
  featured?: boolean;
  trending?: boolean;
  content?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

interface MagazinesState {
  featured: Post[];
  trending: Post[];
  recommended: Post[];
  newContent: Post[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: MagazinesState = {
  featured: [],
  trending: [],
  recommended: [],
  newContent: [],
  categories: [
    { id: '1', name: 'Technology', icon: 'laptop-outline', color: '#3B82F6', count: 42 },
    { id: '2', name: 'Business', icon: 'briefcase-outline', color: '#10B981', count: 38 },
    { id: '3', name: 'Science', icon: 'flask-outline', color: '#8B5CF6', count: 29 },
    { id: '4', name: 'Health', icon: 'fitness-outline', color: '#F59E0B', count: 33 },
    { id: '5', name: 'Lifestyle', icon: 'heart-outline', color: '#EF4444', count: 27 },
    { id: '6', name: 'Travel', icon: 'airplane-outline', color: '#06B6D4', count: 21 },
  ],
  loading: false,
  error: null,
};

// Async thunks for fetching magazines data
export const fetchMagazinesFeatured = createAsyncThunk(
  'magazines/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      // Mock data for now - replace with actual API call
      const mockData: Post[] = [
        {
          id: '1',
          title: 'Future of Technology',
          description: 'Exploring the latest trends in AI and machine learning that will shape our future.',
          imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
          category: 'Technology',
          readTime: '12 min read',
          author: 'John Smith',
          publishedAt: '2024-01-15T10:00:00Z',
          featured: true,
        },
        {
          id: '2',
          title: 'Sustainable Living Guide',
          description: 'A comprehensive guide to living sustainably in the modern world.',
          imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
          category: 'Lifestyle',
          readTime: '8 min read',
          author: 'Sarah Johnson',
          publishedAt: '2024-01-14T15:30:00Z',
          featured: true,
        },
      ];
      return mockData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch featured magazines');
    }
  }
);

export const fetchMagazinesTrending = createAsyncThunk(
  'magazines/fetchTrending',
  async (_, { rejectWithValue }) => {
    try {
      const mockData: Post[] = [
        {
          id: '3',
          title: 'The Art of Minimalism',
          description: 'How to simplify your life and find joy in less.',
          imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
          category: 'Lifestyle',
          readTime: '6 min read',
          author: 'Emma Wilson',
          publishedAt: '2024-01-13T09:00:00Z',
          trending: true,
        },
        {
          id: '4',
          title: 'Space Exploration 2024',
          description: 'The latest discoveries and missions in space exploration.',
          imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400',
          category: 'Science',
          readTime: '10 min read',
          author: 'Michael Brown',
          publishedAt: '2024-01-12T14:00:00Z',
          trending: true,
        },
      ];
      return mockData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch trending magazines');
    }
  }
);

export const fetchMagazinesRecommended = createAsyncThunk(
  'magazines/fetchRecommended',
  async (_, { rejectWithValue }) => {
    try {
      const mockData: Post[] = [
        {
          id: '5',
          title: 'Health & Wellness Trends',
          description: 'Latest trends in health and wellness for a better lifestyle.',
          imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          category: 'Health',
          readTime: '7 min read',
          author: 'Dr. Lisa Chen',
          publishedAt: '2024-01-11T11:00:00Z',
        },
        {
          id: '6',
          title: 'Financial Planning 101',
          description: 'Essential tips for managing your finances and building wealth.',
          imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
          category: 'Finance',
          readTime: '9 min read',
          author: 'Robert Davis',
          publishedAt: '2024-01-10T16:30:00Z',
        },
      ];
      return mockData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch recommended magazines');
    }
  }
);

export const fetchMagazinesNew = createAsyncThunk(
  'magazines/fetchNew',
  async (_, { rejectWithValue }) => {
    try {
      const mockData: Post[] = [
        {
          id: '7',
          title: 'Creative Writing Workshop',
          description: 'Learn the fundamentals of creative writing from published authors.',
          imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
          category: 'Education',
          readTime: '11 min read',
          author: 'Amanda Taylor',
          publishedAt: '2024-01-15T08:00:00Z',
        },
        {
          id: '8',
          title: 'Travel Photography Tips',
          description: 'Capture stunning photos on your next adventure with these expert tips.',
          imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400',
          category: 'Photography',
          readTime: '5 min read',
          author: 'David Lee',
          publishedAt: '2024-01-15T12:00:00Z',
        },
      ];
      return mockData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch new magazines');
    }
  }
);

const magazinesSlice = createSlice({
  name: 'magazines',
  initialState,
  reducers: {
    clearMagazinesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Featured magazines
    builder
      .addCase(fetchMagazinesFeatured.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMagazinesFeatured.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload;
      })
      .addCase(fetchMagazinesFeatured.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Trending magazines
    builder
      .addCase(fetchMagazinesTrending.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMagazinesTrending.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
      })
      .addCase(fetchMagazinesTrending.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Recommended magazines
    builder
      .addCase(fetchMagazinesRecommended.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMagazinesRecommended.fulfilled, (state, action) => {
        state.loading = false;
        state.recommended = action.payload;
      })
      .addCase(fetchMagazinesRecommended.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // New magazines
    builder
      .addCase(fetchMagazinesNew.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMagazinesNew.fulfilled, (state, action) => {
        state.loading = false;
        state.newContent = action.payload;
      })
      .addCase(fetchMagazinesNew.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMagazinesError } = magazinesSlice.actions;
export default magazinesSlice.reducer;