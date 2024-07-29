import { apiSlice } from './ApiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        refreshSession: builder.mutation({
            query: ({ refreshToken }) => ({
                url: '/auth/refresh',
                method: 'POST',
                body: { refreshToken }
            })
        }),
    })
});

export const { useLoginMutation, useRefreshSessionMutation } = authApiSlice;
