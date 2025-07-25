import { rootNavItems } from "@/routes/RootRoutes/rootNavItems";
import React from "react";
import { Link } from "react-router-dom";
import * as classes from "./AppDrawer.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux";
import { appActions } from "../slice";

export function AppDrawer() {
  const dispatch = useAppDispatch();
  const drawerOpen = useAppSelector((a) => a.app.drawerOpen);

  return (
    <div

      className={`${classes.drawer} ${drawerOpen ? classes.drawerOpen : ""}`}
    >
      <button aria-label="close navigation" onClick={() => dispatch(appActions.setDrawerToggleOpen())}>Close</button>
      <nav>
        <ul id="link-list">
          {rootNavItems.map((r) => (
            <li key={r.path}>
              <Link onClick={() => dispatch(appActions.setDrawerToggleOpen())} to={r.path} children={r.label} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
