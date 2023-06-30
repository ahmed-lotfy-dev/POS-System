import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Product {
  id: number
  name: string
  code: number
  category: string
  price: number
  unit: string
  image: string
}

export interface ProductsState {
  products: Product[] | null
}

const initialState: ProductsState = {
  products: null,
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[] | null>) => {
      state.products = action.payload
    },
  },
})

// Action creator generated for the "Products" case reducer function
export const { setProducts } = productsSlice.actions

export default productsSlice.reducer
