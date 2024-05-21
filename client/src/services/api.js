import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3030' ,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
  
      return headers
    }
  }),
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ()=>'jobs',
    }),
    getOneJob: builder.query({
      query: (id)=>'jobs/'+id
    }),
    getJobsOfCompany: builder.query({
      query: (company)=>`jobs?company=${company}`
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "authentication",
        method: "POST",
        body: { 
          "email": email, 
          "password": password,
          "strategy": "local"
        },
      }),
    }),
    register: builder.mutation({
      query: ({ email, password,name,role }) => ({
        url: "users",
        method: "POST",
        body: { 
          "email": email, 
          "password": password,
          "fullname": name,
          "role": role
        },
      }),
    }),
    addExperience:  builder.mutation({
      query: ({ company, title,interval }) => ({
        url: "experiences",
        method: "POST",
        body: { 
          "company": company,
          "title": title,
          "interval": interval
        },
      }),
    }),
    removeJob:  builder.mutation({
      query: ( id) => ({
        url: "jobs/"+ +id,
        method: "DELETE",
      }),
    }),
    getUserInfo: builder.query({
      query: (id)=>'users/'+id
    }),
    getUserExperiences: builder.query({
      query: ()=>'experiences'
    }),

  }),
})

export const { useGetJobsOfCompanyQuery,
                useGetOneJobQuery,
                useGetJobsQuery,
                useLoginMutation,
                useGetUserInfoQuery,
                useAddExperienceMutation,
                useRegisterMutation,
                useGetUserExperiencesQuery,
                useRemoveJobMutation,
             } = Api


