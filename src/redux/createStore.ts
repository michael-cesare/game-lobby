import { configureStore } from "@reduxjs/toolkit";

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

export default store;
