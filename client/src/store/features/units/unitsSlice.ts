import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Unit {
  id: number
}

export interface ProductsState {
  units: Unit[] | null
}

const initialState: ProductsState = {
  units: null,
}

export const unitSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    setUnits: (state, action: PayloadAction<Unit[] | null>) => {
      state.units = action.payload
    },
  },
})

// Action creator generated for the "Products" case reducer function
export const { setUnits } = unitSlice.actions

export default unitSlice.reducer
