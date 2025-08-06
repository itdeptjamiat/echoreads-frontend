import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PostType = 'magazines' | 'articles' | 'digests';

interface UIState {
  activePostType: PostType;
  isLoading: boolean;
  error: string | null;
}

const initialState: UIState = {
  activePostType: 'magazines',
  isLoading: false,
  error: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActivePostType: (state, action: PayloadAction<PostType>) => {
      state.activePostType = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setActivePostType,
  setLoading,
  setError,
  clearError,
} = uiSlice.actions;

export default uiSlice.reducer;