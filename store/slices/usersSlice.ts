import { createSlice } from "@reduxjs/toolkit"

import type { PayloadAction } from "@reduxjs/toolkit"

interface UsersState {
  currentPage: number
}

const initialState: UsersState = {
  currentPage: 1,
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
})

export const { setCurrentPage } = usersSlice.actions
export default usersSlice.reducer
