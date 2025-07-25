declare const appReducer: import("redux").Reducer<{
    drawerOpen: boolean;
}>, appActions: import("@reduxjs/toolkit").CaseReducerActions<{
    setDrawerToggleOpen(s: import("immer").WritableDraft<{
        drawerOpen: boolean;
    }>): void;
}, "app">;
export { appReducer, appActions };
