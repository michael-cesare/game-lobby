import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { rootReducer } from "./rootReducer";

const standardMiddleware = () => (next: any) => (action: any) => {
  if (action && "type" in action) {
    return next(action);
  }
  // none redux actions break middleware and reducers
  console.log("anomaly dispatching:", action);
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(standardMiddleware),
});

// Factory for creating a new store
export const makeStore = () => store;

// Type helpers
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Next.js wrapper
export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });

export default store;
