import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Item = {
  id: number;
  name: string;
  code: number;
  category: string;
  price: number;
  unit: string;
  image: string;
  quantity: number;
};

export interface CartState {
  items: Item[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Item>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        newItem.quantity = 1;
        state.items.push(newItem);
      }
    },
    changeQuantity: (
      state,
      action: PayloadAction<{ id: number; status: "increase" | "decrease" }>
    ) => {
      const { id, status } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (status === "increase") {
          existingItem.quantity += 1;
        } else if (status === "decrease" && existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        }
      }
    },
  },
});

export const { addItemToCart, changeQuantity } = cartSlice.actions;

export default cartSlice.reducer;
