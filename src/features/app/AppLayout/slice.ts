import { createSlice } from "@reduxjs/toolkit";

const { reducer: appReducer, actions: appActions } = createSlice({
  name: "app",
  initialState: {
    drawerOpen: false,
  },
  reducers: {
    setDrawerToggleOpen(s) {
      s.drawerOpen = !s.drawerOpen;
    },
  },
});

export { appReducer, appActions };
// export type AppActions = InferActions<typeof appActions>;
