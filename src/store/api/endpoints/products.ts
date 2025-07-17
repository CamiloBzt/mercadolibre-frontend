import { baseApi } from '../baseApi';
import {
  transformProduct,
  transformProductDetail,
} from '../transforms/product.transforms';
import {
  FakeStoreProduct,
  ProductDetailResponse,
  ProductItem,
} from '../types/product.types';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductItem[], void>({
      query: () => ({
        url: 'products',
        params: {
          limit: 50,
        },
      }),
      transformResponse: (response: FakeStoreProduct[]): ProductItem[] => {
        return response.map(transformProduct);
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

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productsApi;
