import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../types/globals";

export interface ProductsState {
  activeProducts: Product[] | null;
}

const initialState: ProductsState = {
  activeProducts: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[] | null>) => {
      state.activeProducts = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
