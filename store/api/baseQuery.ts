import axios from "axios"

import type { BaseQueryFn } from "@reduxjs/toolkit/query"

import { env } from "../../env.mjs"

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string
      method?: "GET" | "POST" | "PUT" | "DELETE"
      data?: any
      params?: any
      headers?: any
    },
    unknown,
    unknown
  > =>
  async ({ url, method = "GET", data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          "x-api-key": env.NEXT_PUBLIC_API_KEY,
          "Content-Type": "application/json",
          ...headers,
        },
      })
      return { data: result.data }
    } catch (axiosError: any) {
      const err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

export default axiosBaseQuery
