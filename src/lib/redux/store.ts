import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./slices/sessionSlice";
import layoutSlice from "./slices/layoutSlice";
import mutationSlice from "./slices/mutationSlice";


export const store = configureStore({
  reducer: {
    session: sessionSlice,
    layout: layoutSlice,
    mutation: mutationSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
