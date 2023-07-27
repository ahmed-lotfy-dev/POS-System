import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./features/user/userSlice"
import themeSlice from "./features/theme/themeSlice"
import searchSlice from "./features/search/searchSlice"
import itemSlice from "./features/Item/itemSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeSlice,
    search: searchSlice,
    item: itemSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
