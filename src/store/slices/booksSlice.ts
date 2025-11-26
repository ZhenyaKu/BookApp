import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, TopBannerSlide, RemoteConfigData } from '../../types';
import { fetchBooksData } from '../thunks/booksThunks';

interface BooksState {
  books: Book[];
  topBannerSlides: TopBannerSlide[];
  youWillLikeIds: number[];
  detailsCarousel: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  topBannerSlides: [],
  youWillLikeIds: [],
  detailsCarousel: [],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
    setTopBannerSlides: (state, action: PayloadAction<TopBannerSlide[]>) => {
      state.topBannerSlides = action.payload;
    },
    setYouWillLikeIds: (state, action: PayloadAction<number[]>) => {
      state.youWillLikeIds = action.payload;
    },
    setDetailsCarousel: (state, action: PayloadAction<Book[]>) => {
      state.detailsCarousel = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBooksData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBooksData.fulfilled,
        (state, action: PayloadAction<RemoteConfigData>) => {
          state.books = action.payload.books;
          state.topBannerSlides = action.payload.top_banner_slides;
          state.youWillLikeIds = action.payload.you_will_like_section;
          state.detailsCarousel = action.payload.details_carousel;
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(fetchBooksData.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch books data';
      });
  },
});

export const {
  setBooks,
  setTopBannerSlides,
  setYouWillLikeIds,
  setDetailsCarousel,
  setLoading,
  setError,
} = booksSlice.actions;

export default booksSlice.reducer;
