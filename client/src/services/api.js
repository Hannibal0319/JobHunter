import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030' }),
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ()=>'jobs',
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        method: "POST",
        body: { email, password },
        strategy: "local"
      }),
    }),
    getUserInfo: builder.query({
      query: (id)=>'user/'+id
    })
  }),
})

export const { useGetJobsQuery,useLoginMutation } = Api


