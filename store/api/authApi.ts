import { createApi } from "@reduxjs/toolkit/query/react"

import { env } from "../../env.mjs"
import axiosBaseQuery from "./baseQuery"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({
    baseUrl: env.NEXT_PUBLIC_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        data: credentials,
      }),
    }),
    register: builder.mutation<
      { id: number; token: string },
      { email: string; password: string }
    >({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        data: userData,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi
