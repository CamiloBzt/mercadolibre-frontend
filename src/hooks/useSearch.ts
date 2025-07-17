import { useCallback, useEffect, useMemo } from 'react';
import { useSearchProductsQuery } from '../store/api/endpoints/products';
import {
  selectCachedResults,
  selectSearchState,
  setCachedResults,
  setCurrentPage,
  setQuery,
  setTotalItems,
  setTotalPages,
} from '../store/slices/searchSlice';
import { useAppDispatch, useAppSelector } from './redux';

export const useSearch = () => {
  const dispatch = useAppDispatch();
  const searchState = useAppSelector(selectSearchState);
  const cachedResults = useAppSelector(selectCachedResults);
  const { query, currentPage, itemsPerPage } = searchState;

  const offset = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage, itemsPerPage]
  );

  const cacheKey = useMemo(
    () => `${query}_${offset}_${itemsPerPage}`,
    [query, offset, itemsPerPage]
  );

  const shouldFetch = query.trim().length > 0;

  const {
    data: apiData,
    isLoading,
    error,
    isFetching,
  } = useSearchProductsQuery(
    { q: query, offset, limit: itemsPerPage },
    {
      skip: !shouldFetch,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }
  );

  const cachedData = cachedResults[cacheKey];
  const isCacheValid = cachedData && Date.now() - cachedData.timestamp < 300000; // 5 minutos

  const finalData = useMemo(() => {
    if (isCacheValid) {
      return {
        categories: cachedData.categories,
        items: cachedData.products,
        pagination: {
          total: cachedData.total,
          offset,
          limit: itemsPerPage,
          has_next_page: offset + itemsPerPage < cachedData.total,
          has_previous_page: offset > 0,
        },
      };
    }
    return apiData;
  }, [isCacheValid, cachedData, apiData, offset, itemsPerPage]);

  useEffect(() => {
    if (apiData && !isCacheValid) {
      dispatch(
        setCachedResults({
          key: cacheKey,
          products: apiData.items,
          categories: apiData.categories,
          total: apiData.pagination.total,
        })
      );
    }
  }, [apiData, isCacheValid, cacheKey, dispatch]);

  useEffect(() => {
    if (finalData) {
      dispatch(setTotalItems(finalData.pagination.total));
      dispatch(
        setTotalPages(Math.ceil(finalData.pagination.total / itemsPerPage))
      );
    }
  }, [finalData, itemsPerPage, dispatch]);

  const handleSearch = useCallback(
    (newQuery: string) => {
      dispatch(setQuery(newQuery));
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

  console.log(
    'Search Hook:',
    JSON.stringify({
      // Datos
      products: finalData?.items || [],
      categories: finalData?.categories || [],
      pagination: finalData?.pagination || {
        total: 0,
        offset: 0,
        limit: itemsPerPage,
        has_next_page: false,
        has_previous_page: false,
      },

      // Estado
      query,
      currentPage,
      totalPages: searchState.totalPages,
      totalItems: searchState.totalItems,
      itemsPerPage,
      isLoading: (isLoading || isFetching) && !isCacheValid,
      error,

      // Funciones
      handleSearch,
      handlePageChange,
      resetSearch,

      // Cache info
      isCacheValid,
      hasData: (finalData?.items.length || 0) > 0,
    })
  );

  return {
    // Datos
    products: finalData?.items || [],
    categories: finalData?.categories || [],
    pagination: finalData?.pagination || {
      total: 0,
      offset: 0,
      limit: itemsPerPage,
      has_next_page: false,
      has_previous_page: false,
    },

    // Estado
    query,
    currentPage,
    totalPages: searchState.totalPages,
    totalItems: searchState.totalItems,
    itemsPerPage,
    isLoading: (isLoading || isFetching) && !isCacheValid,
    error,

    // Funciones
    handleSearch,
    handlePageChange,
    resetSearch,

    // Cache info
    isCacheValid,
    hasData: (finalData?.items.length || 0) > 0,
  };
};
