import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Search {
  value: string
}

const initialState: Search = {
  value: ""
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { setSearchValue } = searchSlice.actions

export default searchSlice.reducer