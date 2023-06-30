import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./features/user/userSlice"
import productsSlice from "./features/products/productsSlice"
import categoriesSlice from "./features/categories/categoriesSlice"
import unitsSlice from "./features/units/unitsSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
    categories: categoriesSlice,
    units: unitsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
