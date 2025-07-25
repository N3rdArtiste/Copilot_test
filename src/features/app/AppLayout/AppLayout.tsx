import React from "react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { AppDrawer } from "./AppDrawer";

export default function AppLayout() {
  return (
    <div>
      <AppHeader />
      <AppDrawer />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
