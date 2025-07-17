import { baseApi } from '../baseApi';

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<string[], void>({
      query: () => 'products/categories',
      providesTags: ['Category'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllCategoriesQuery } = categoriesApi;
