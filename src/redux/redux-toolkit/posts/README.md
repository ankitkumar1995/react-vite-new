# 🚀 Redux Toolkit Learning Handbook & Manual Integration Guide

Welcome! This CRUD application has been completely built with React and full routing using the **DummyJSON Free API**.

All state management is currently handled cleanly without Redux, so you can test the application immediately, and then follow these step-by-step exercises to **manually implement every core feature of Redux Toolkit**!

---

## 🗺️ What You Will Master
1. **`configureStore`**: Setting up the central store with typed `RootState` and `AppDispatch`.
2. **`createSlice`**: Writing clean slices with Immer-powered immutable updates.
3. **`createAsyncThunk`**: Handling asynchronous API lifecycles (`pending`, `fulfilled`, `rejected`).
4. **`extraReducers`**: Handling thunk actions with builder callback notation.
5. **Typed Hooks**: `useAppDispatch` & `useAppSelector`.
6. **Selectors**: Memoized state derivations using `createSelector`.
7. **`createEntityAdapter`** *(Optional Advanced)*: Normalized state management (`{ ids, entities }`).
8. **RTK Query** *(Alternative)*: Automated caching, invalidation tags, and generated hooks.

---

## 🛠️ Step-by-Step Implementation Roadmap

### Step 1: Create your `postsSlice.ts`
1. Look at [postsSlice.template.ts](file:///home/creole/Documents/creole-learning/react-and-nextjs/react-vite-new/src/redux/redux-toolkit/features/posts/postsSlice.template.ts).
2. Copy or rename it to `postsSlice.ts`.
3. Understand how `createAsyncThunk` calls the free API methods from [postApi.ts](file:///home/creole/Documents/creole-learning/react-and-nextjs/react-vite-new/src/api/postApi.ts).

### Step 2: Register in Store
Open [store.tsx](file:///home/creole/Documents/creole-learning/react-and-nextjs/react-vite-new/src/redux/redux-toolkit/store.tsx):
```ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import postsReducer from "./features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
  },
});
```

### Step 3: Wrap App with `<Provider store={store}>`
In [main.tsx](file:///home/creole/Documents/creole-learning/react-and-nextjs/react-vite-new/src/main.tsx):
```tsx
import { Provider } from 'react-redux';
import { store } from './redux/redux-toolkit/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

### Step 4: Swap React State with Redux Hooks in Components
Each component has explicit comment markers: `// ⚡ REDUX TOOLKIT INTEGRATION POINT`.

For example, in [PostList.tsx](file:///home/creole/Documents/creole-learning/react-and-nextjs/react-vite-new/src/components/posts/PostList.tsx):
```tsx
// 1. Dispatch fetch on mount:
const dispatch = useAppDispatch();
useEffect(() => {
  dispatch(fetchPosts());
}, [dispatch]);

// 2. Select state:
const { items, status, error } = useAppSelector((state) => state.posts);
```

In [PostFilter.tsx](file:///home/creole/Documents/creole-learning/react-and-nextjs/react-vite-new/src/components/posts/PostFilter.tsx):
```tsx
const dispatch = useAppDispatch();
const { searchQuery, selectedTag, sortBy } = useAppSelector((state) => state.posts.filters);

// Dispatch sync actions:
onChange={(e) => dispatch(setSearchQuery(e.target.value))}
```

---

## 🎯 Free API Reference (DummyJSON)
- **Get Posts**: `GET https://dummyjson.com/posts?limit=10&skip=0`
- **Search**: `GET https://dummyjson.com/posts/search?q=phone`
- **Tag Filter**: `GET https://dummyjson.com/posts/tag/history`
- **Get One**: `GET https://dummyjson.com/posts/1`
- **Create**: `POST https://dummyjson.com/posts/add`
- **Update**: `PUT https://dummyjson.com/posts/1`
- **Delete**: `DELETE https://dummyjson.com/posts/1`
- **Comments**: `GET https://dummyjson.com/posts/1/comments`
