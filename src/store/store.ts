import { userApi } from "@/features/UserAPI";
import { createComplaintsAPI } from "../features/ComplaijntAPI";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [createComplaintsAPI.reducerPath]: createComplaintsAPI.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(createComplaintsAPI.middleware)
      .concat(userApi.middleware)
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
