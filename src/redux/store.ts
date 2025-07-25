import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "@/features/app/AppLayout";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export type AppStore = typeof store;
export type AppRootState = ReturnType<AppStore["getState"]>;
