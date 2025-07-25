import type { AppStore } from "./store";
export type AppDispatch = AppStore["dispatch"];
export declare const useAppDispatch: () => AppDispatch;
