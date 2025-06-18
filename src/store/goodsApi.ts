import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type Product, type ProductList } from '../interfaces';

export const goodsApi = createApi({
    reducerPath: 'goodsApi',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
    endpoints: (build) => ({
        getGoods: build.query<ProductList, string>({
            query: (limit='') => ({
                url: 'goods',
                params: {
                    _limit: limit,
                }
            }),
            providesTags: (result) => result 
                ? [
                    ...result.map(({id}) => ({ type: 'Products' as const, id })),
                    { type: 'Products', id: 'LIST' },
                ]
                : [{type: 'Products', id: 'LIST'}],
        }),
        addProduct: build.mutation<Product, Partial<Product>>({
            query: (body) => ({
                url: 'goods',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{type: 'Products', id: 'LIST'}]
        }),
        deleteProduct: build.mutation<Product, number>({
            query: (id) => ({
                url: `goods/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Products', id: 'LIST'}]
        }),
        updateProduct: build.mutation<Product, Partial<Product> & Pick<Product, 'id'>>({
            query: ({id, ...body}) => ({
                url: `goods/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: [{type: 'Products', id: 'LIST'}]
        })
    })
});

export const { useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation, useUpdateProductMutation } = goodsApi;
