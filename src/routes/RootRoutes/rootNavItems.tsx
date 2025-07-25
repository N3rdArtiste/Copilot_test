import React from "react";
import { appRoutePaths } from "@/settings/appRoutePaths";
import { ApplicantDetailsForm } from "@/routes/ApplicantDetails/ApplicantDetailsForm";
import { RouteProps } from "react-router-dom";
import { HOME_LOAN_CALCULATOR, HOME_LOAN_ENQUIRY } from "../../settings/appRoutePaths";
import { HomeLoanCalculator } from "../HomeLoanCalculator";
import { HomeLoanEnquiry } from "../HomeLoanEnquiry";

export type NavItem = Pick<RouteProps, "index" | "element" | "children"> & {
  path: string;
  label: string;
};

export const getRootNavItemByPathname = (pathname?:string) => {
  return rootNavItems.find(r => r.path === pathname)
}

export const rootNavItems: NavItem[] = [
  {
    path: appRoutePaths.applicantDetails,
    element: <ApplicantDetailsForm />,
    label: "Applicant details form",
  },
  {
    label: "Home Loan Calculator",
    element: <HomeLoanCalculator />,
    path: HOME_LOAN_CALCULATOR,
  },
  {
    label: "Home Loan Enquiry",
    element: <HomeLoanEnquiry />,
    path: HOME_LOAN_ENQUIRY,
  },
];
