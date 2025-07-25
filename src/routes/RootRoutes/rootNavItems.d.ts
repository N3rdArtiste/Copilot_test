import { RouteProps } from "react-router-dom";
export type NavItem = Pick<RouteProps, "index" | "element" | "children"> & {
    path: string;
    label: string;
};
export declare const getRootNavItemByPathname: (pathname?: string) => NavItem | undefined;
export declare const rootNavItems: NavItem[];
