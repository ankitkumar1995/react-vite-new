import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";

/**
 * ============================================================================
 * ⚡ REDUX TOOLKIT ROOT STORE
 * ============================================================================
 * When you create your postsSlice.ts:
 * 1. Import postsReducer from "./features/posts/postsSlice";
 * 2. Add it to the reducer object below:
 *    reducer: {
 *      counter: counterReducer,
 *      posts: postsReducer,
 *    }
 * ============================================================================
 */

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // ⚡ TODO: Add your posts reducer here:
    // posts: postsReducer,
  },
  // Redux Toolkit automatically adds redux-thunk and Redux DevTools extension!
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
