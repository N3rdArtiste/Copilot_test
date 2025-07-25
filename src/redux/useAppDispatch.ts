import { useDispatch } from "react-redux";

import type { AppStore } from "./store";

export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
