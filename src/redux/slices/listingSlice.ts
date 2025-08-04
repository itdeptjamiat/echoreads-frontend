import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListingState {
  magazines: any[];
  articles: any[];
  loading: boolean;
}

const initialState: ListingState = {
  magazines: [],
  articles: [],
  loading: false,
};

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    setMagazines: (state, action: PayloadAction<any[]>) => {
      state.magazines = action.payload;
    },
    setArticles: (state, action: PayloadAction<any[]>) => {
      state.articles = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setMagazines, setArticles, setLoading } = listingSlice.actions;
export default listingSlice.reducer;