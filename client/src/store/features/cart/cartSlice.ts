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
  items: Item[] | null;
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Item | null>) => {
      if (state.items === null) {
        state.items = [];
      }
      const newItem = action.payload;

      if (newItem) {
        const existingItem = state.items.find((item) => item.id === newItem.id);
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          state.items.push(newItem);
        }
      }
    },
  },
});

export const { addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;
