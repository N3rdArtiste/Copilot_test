export const appRoutePaths = {
  applicantDetails: "/applicant-details",
  HOME_LOAN_CALCULATOR: "/home-loan-calculator",
};

export type AppRoutePaths = typeof appRoutePaths;

export const appRoutePathValues = Object.values(appRoutePaths);
export const HOME_LOAN_CALCULATOR = appRoutePaths.HOME_LOAN_CALCULATOR;
