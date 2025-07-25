export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    app: {
        drawerOpen: boolean;
    };
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        app: {
            drawerOpen: boolean;
        };
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type AppStore = typeof store;
export type AppRootState = ReturnType<AppStore["getState"]>;
