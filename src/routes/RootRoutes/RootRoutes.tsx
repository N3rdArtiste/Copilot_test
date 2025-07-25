import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { rootNavItems } from "./rootNavItems";
import AppLayout from "@/features/app/AppLayout/AppLayout";
import { HOME_LOAN_CALCULATOR } from "../../settings/appRoutePaths";
import { HomeLoanCalculator } from "../HomeLoanCalculator";

export const RootRoutes = () => {
  const defaultRoute = "/applicant-details";
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {rootNavItems.map((navItem) => (
          <Route
            key={navItem.path}
            path={navItem.path}
            element={navItem.element}
            children={navItem.children}
          />
        ))}
        <Route path="/" element={<Navigate to={defaultRoute} />} />
        <Route
          path={HOME_LOAN_CALCULATOR}
          element={<HomeLoanCalculator />}
        />
        <Route path="*" element={<h1>404 page not found.</h1>} />
      </Route>
    </Routes>
  );
};
