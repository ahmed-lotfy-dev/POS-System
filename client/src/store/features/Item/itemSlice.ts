import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export interface ItemState {
  item: any | null
}

const initialState: ItemState = {
  item: null,
}

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItem: (state, action: PayloadAction<unknown | null>) => {
      state.item = action.payload
    },
  },
})

export const { setItem } = itemSlice.actions

export default itemSlice.reducer
