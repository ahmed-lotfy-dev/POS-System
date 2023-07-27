import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Category {
  id: number
}

export interface ProductsState {
  categories: Category[] | null
}

const initialState: ProductsState = {
  categories: null,
}

export const categorySlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[] | null>) => {
      state.categories = action.payload
    },
  },
})

export const { setCategories } = categorySlice.actions

export default categorySlice.reducer
