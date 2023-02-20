import { apiSlice } from '../../Api/authApi';

apiSlice.enhanceEndpoints({ addTagTypes: ['User'] });

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetail: builder.query({
      query: (id) => {
        return {
          url: `user/${id}`,
        };
      },
      providesTags: ['User'],
      transformResponse: (response, meta, args) => response.data[0],
    }),
    updateUserById: builder.query({
      query: ({ id, data }) => {
        return {
          url: `user/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      providesTags: ['User'],
      transformResponse: (response, meta, args) => response,
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: 'user/login',
        method: 'POST',
        body: data,
      }),

      transformResponse: (response, meta, args) => response,
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useGetUserDetailQuery } = authApi;
