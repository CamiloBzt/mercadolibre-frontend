import { useCallback, useEffect, useMemo } from 'react';
import { useGetAllProductsQuery } from '../store/api/endpoints/products';
import {
  selectSearchState,
  setCurrentPage,
  setQuery,
  setTotalItems,
  setTotalPages,
} from '../store/slices/searchSlice';
import { useAppDispatch, useAppSelector } from './redux';

export const useSearch = () => {
  const dispatch = useAppDispatch();
  const searchState = useAppSelector(selectSearchState);
  const { query, currentPage, itemsPerPage } = searchState;

  const {
    data: allProducts = [],
    isLoading,
    error,
  } = useGetAllProductsQuery(undefined);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    return allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.condition.toLowerCase().includes(query.toLowerCase()) ||
        (product.seller &&
          product.seller.toLowerCase().includes(query.toLowerCase()))
    );
  }, [allProducts, query]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const products = useMemo(() => {
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, startIndex, endIndex]);

  const categories = useMemo(() => {
    return Array.from(new Set(filteredProducts.map((p) => p.category)));
  }, [filteredProducts]);

  useEffect(() => {
    dispatch(setTotalItems(totalItems));
    dispatch(setTotalPages(totalPages));
  }, [totalItems, totalPages, dispatch]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      dispatch(setCurrentPage(1));
    }
  }, [currentPage, totalPages, dispatch]);

  const handleSearch = useCallback(
    (newQuery: string) => {
      dispatch(setQuery(newQuery));
      dispatch(setCurrentPage(1));
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );

  const resetSearch = useCallback(() => {
    dispatch(setQuery(''));
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  return {
    products,
    categories,
    pagination: {
      total: totalItems,
      offset: startIndex,
      limit: itemsPerPage,
      has_next_page: endIndex < totalItems,
      has_previous_page: startIndex > 0,
    },

    query,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    isLoading,
    error,

    handleSearch,
    handlePageChange,
    resetSearch,

    hasData: products.length > 0,
  };
};
