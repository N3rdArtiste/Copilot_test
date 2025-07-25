import { TypedUseSelectorHook, useSelector } from "react-redux";

import type { AppRootState } from "./store";

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
