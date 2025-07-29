import { createApi } from "@reduxjs/toolkit/query/react"

import type { UserResponse, UsersResponse } from "@/types/user"

import { env } from "../../env.mjs"
import axiosBaseQuery from "./baseQuery"

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: axiosBaseQuery({
    baseUrl: env.NEXT_PUBLIC_API_BASE_URL,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, number>({
      query: (page = 1) => ({
        url: "/users",
        method: "GET",
        params: { page },
      }),
      providesTags: ["User"],
    }),
    getUser: builder.query<UserResponse, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    createUser: builder.mutation<
      { id: string; name: string; job: string; createdAt: string },
      { name: string; job: string }
    >({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<
      { name: string; job: string; updatedAt: string },
      { id: number; name: string; job: string }
    >({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PUT",
        data: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi
