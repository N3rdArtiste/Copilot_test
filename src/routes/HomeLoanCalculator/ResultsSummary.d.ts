import React from "react";
export interface ResultsSummaryProps {
    loanAmount: number;
    deposit: number;
    totalInterest: number;
    formatCurrency: (n: number) => string;
    resultRef: React.RefObject<HTMLDivElement>;
}
/**
 * ResultsSummary - Displays the calculated loan results.
 * Used in HomeLoanCalculator to show loan amount, deposit, and total interest.
 */
export declare const ResultsSummary: React.FC<ResultsSummaryProps>;
