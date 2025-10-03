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

// Factory for creating a new store
export const makeStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(standardMiddleware),
});

// Type helpers
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Next.js wrapper
export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
