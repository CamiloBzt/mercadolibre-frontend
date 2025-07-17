import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItem } from '../api/types/product.types';

interface SearchState {
  query: string;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  cachedResults: {
    [key: string]: {
      products: ProductItem[];
      categories: string[];
      total: number;
      timestamp: number;
    };
  };
  isLoading: boolean;
}

const initialState: SearchState = {
  query: '',
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,
  itemsPerPage: 10,
  cachedResults: {},
  isLoading: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setCachedResults: (
      state,
      action: PayloadAction<{
        key: string;
        products: ProductItem[];
        categories: string[];
        total: number;
      }>
    ) => {
      const { key, products, categories, total } = action.payload;
      state.cachedResults[key] = {
        products,
        categories,
        total,
        timestamp: Date.now(),
      };
    },
    clearCache: (state) => {
      state.cachedResults = {};
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetSearch: (state) => {
      state.query = '';
      state.currentPage = 1;
      state.totalPages = 0;
      state.totalItems = 0;
      state.isLoading = false;
    },
  },
});

export const {
  setQuery,
  setCurrentPage,
  setTotalPages,
  setTotalItems,
  setItemsPerPage,
  setCachedResults,
  clearCache,
  setLoading,
  resetSearch,
} = searchSlice.actions;

export default searchSlice.reducer;

export const selectSearchState = (state: { search: SearchState }) =>
  state.search;
export const selectQuery = (state: { search: SearchState }) =>
  state.search.query;
export const selectCurrentPage = (state: { search: SearchState }) =>
  state.search.currentPage;
export const selectTotalPages = (state: { search: SearchState }) =>
  state.search.totalPages;
export const selectCachedResults = (state: { search: SearchState }) =>
  state.search.cachedResults;
export const selectIsLoading = (state: { search: SearchState }) =>
  state.search.isLoading;
