// ResultsSummary.tsx
// Usage: Results summary display for HomeLoanCalculator
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
export const ResultsSummary: React.FC<ResultsSummaryProps> = ({ loanAmount, deposit, totalInterest, formatCurrency, resultRef }) => (
  <div ref={resultRef} className="mt-8 border-t pt-6">
    <h2 className="text-xl font-bold mb-4">Your loan</h2>
    <div className="flex flex-col gap-2">
      <div className="flex justify-between"><span>Loan amount</span><span className="font-semibold">{formatCurrency(loanAmount)}</span></div>
      <div className="flex justify-between"><span>Deposit amount</span><span className="font-semibold">{formatCurrency(deposit)}</span></div>
      <div className="flex justify-between"><span>Total interest*</span><span className="font-semibold">{formatCurrency(totalInterest)}</span></div>
    </div>
    <div className="text-xs text-gray-500 mt-2">*Estimated total interest over the loan term. Actual repayments may vary.</div>
  </div>
);
