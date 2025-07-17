import { baseApi } from '../baseApi';
import {
  transformProductDetail,
  transformProductsWithPagination,
} from '../transforms/product.transforms';
import { SearchParams } from '../types/api.types';
import {
  FakeStoreProduct,
  ProductDetailResponse,
  SearchProductsResponse,
} from '../types/product.types';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchProducts: builder.query<SearchProductsResponse, SearchParams>({
      query: () => ({
        url: 'products',
        params: {
          limit: 50,
        },
      }),
      transformResponse: (response: FakeStoreProduct[], meta, arg) => {
        const { q, offset = 0, limit = 10 } = arg;
        return transformProductsWithPagination(response, q, offset, limit);
      },
      providesTags: ['Product'],
    }),

    getProductById: builder.query<ProductDetailResponse, string>({
      query: (id) => `products/${id}`,
      transformResponse: (
        response: FakeStoreProduct
      ): ProductDetailResponse => ({
        item: transformProductDetail(response),
      }),
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
  }),
  overrideExisting: true,
});

export const { useSearchProductsQuery, useGetProductByIdQuery } = productsApi;
