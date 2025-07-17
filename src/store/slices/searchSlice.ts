import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const initialState: SearchState = {
  query: '',
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,
  itemsPerPage: 10,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
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

      state.totalPages = Math.ceil(state.totalItems / action.payload);
    },
    resetSearch: (state) => {
      state.query = '';
      state.currentPage = 1;
      state.totalPages = 0;
      state.totalItems = 0;
    },
  },
});

export const {
  setQuery,
  setCurrentPage,
  setTotalPages,
  setTotalItems,
  setItemsPerPage,
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
export const selectTotalItems = (state: { search: SearchState }) =>
  state.search.totalItems;
export const selectItemsPerPage = (state: { search: SearchState }) =>
  state.search.itemsPerPage;
