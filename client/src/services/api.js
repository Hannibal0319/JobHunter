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
  tagTypes: ['Jobs'],
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ()=>'jobs',
      providesTags: ['Jobs']
    }),
    getOneJob: builder.query({
      query: (id)=>'jobs/'+id,
      providesTags: ['Jobs']
    }),
    getJobsOfCompany: builder.query({
      query: (id)=>`jobs?userId=${id}`,
      providesTags: ['Jobs']
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
    addJob: builder.mutation({
      query: ({ id,name,position ,description,salaryFrom,salaryTo,type,city,homeOffice }) => ({
        url: "jobs/"+ +id,
        method: "POST",
        body: { 
          "company":name,
          "position":position,
          "description": description,
          "salaryFrom": salaryFrom,
          "salaryTo": salaryTo,
          "type":type,
          "city": city,
          "homeOffice":homeOffice
        },
      }),
      invalidatesTags: ['Jobs'],
    }),
    removeJob:  builder.mutation({
      query: ({id}) => ({
        url: "jobs/"+ +id,
        method: "DELETE",
      }),
      invalidatesTags: ['Jobs'],
    }),
    getUserInfo: builder.query({
      query: (id)=>'users/'+id
    }),
    getUserExperiences: builder.query({
      query: ()=>'experiences'
    }),
    editJob: builder.mutation({
      query: (body) => ({
        url: `jobs/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Jobs']
    })
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
                useAddJobMutation,
                useEditJobMutation,
             } = Api


