import { createSlice } from '@reduxjs/toolkit'

export interface ThemeState {
  theme: boolean
}

const initialState: ThemeState = {
  theme: false,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = !state.theme
    },

  },
})

// Action creators are generated for each case reducer function
export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer