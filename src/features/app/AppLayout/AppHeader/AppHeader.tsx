import React from "react";
import * as classes from "./AppHeader.module.scss";
import { useLocation, useMatch } from "react-router-dom";
import { getRootNavItemByPathname } from "@/routes/RootRoutes";
import { useAppDispatch, useAppSelector } from "@/redux";
import { appActions } from "../slice";

export function AppHeader() {
  const { pathname } = useLocation();
  const match = useMatch(pathname);
  const label = getRootNavItemByPathname(match?.pathname)?.label;

  const dispatch = useAppDispatch();
  const drawerOpen = useAppSelector((a) => a.app.drawerOpen);

  return (
    label && (
      <header className={classes.header}>
        <button aria-label="open navigation" aria-controls="link-list" aria-expanded="false" onClick={() => dispatch(appActions.setDrawerToggleOpen())}>
          Menu {drawerOpen ? "close" : "open"}
        </button>
        <h1>{label}</h1>
      </header>
    )
  );
}
