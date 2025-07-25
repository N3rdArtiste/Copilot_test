export const appRoutePaths = {
  applicantDetails: "/applicant-details",
  HOME_LOAN_CALCULATOR: "/home-loan-calculator",
  HOME_LOAN_ENQUIRY: "/home-loan-enquiry",
};

export type AppRoutePaths = typeof appRoutePaths;

export const appRoutePathValues = Object.values(appRoutePaths);
export const HOME_LOAN_CALCULATOR = appRoutePaths.HOME_LOAN_CALCULATOR;
export const HOME_LOAN_ENQUIRY = appRoutePaths.HOME_LOAN_ENQUIRY;
