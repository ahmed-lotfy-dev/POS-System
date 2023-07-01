import { createSlice } from '@reduxjs/toolkit'

export interface ThemeState {
  theme: string
}

const initialState: ThemeState = {
  theme: "cupcake",
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme === "cupcake" ? state.theme = "dark" : state.theme = "cupcake"
    },

  },
})

// Action creators are generated for each case reducer function
export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer