// HomeLoanCalculator.tsx
// Usage: Home loan calculator route and form UI
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CurrencyInputField } from "../../features/FormFields/CurrencyInputField";
import { TermField } from "./TermField";
import { RateTypeSelector } from "./RateTypeSelector";
import { ResultsSummary } from "./ResultsSummary";
import { DepositField } from "./DepositField";
import { RadioGroup } from "@/features/FormFields";

const LOAN_PURPOSES = [
  { value: "first_home", label: "First home" },
  { value: "next_home", label: "Next home" },
  { value: "investment", label: "Investment" },
  { value: "refinance", label: "Refinance" },
];

const FIXED_TERMS = [
  { value: 6, label: "6 months", rate: 5.29 },
  { value: 12, label: "12 months", rate: 4.89 },
  { value: 18, label: "18 months", rate: 4.89 },
  { value: 24, label: "24 months", rate: 4.95 },
  { value: 36, label: "36 months", rate: 5.09 },
  { value: 48, label: "48 months", rate: 5.49 },
  { value: 60, label: "60 months", rate: 5.59 },
];

const PROPERTY_MIN = 30000;
const DEPOSIT_MIN = 0;
const TERM_MIN = 1;
const TERM_MAX = 30;

function formatCurrency(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

/**
 * HomeLoanCalculator - Route for home loan calculation and simulation.
 * Allows users to input loan parameters and see estimated repayments.
 */
export const HomeLoanCalculator: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      purpose: "first_home",
      propertyPrice: 600000,
      deposit: 550000,
      term: 30,
      rateType: "fixed",
      fixedTerm: 6,
      customRate: "",
    },
    mode: "onBlur",
  });
  const [showResult, setShowResult] = useState(false);
  const fixedTermWatch = watch("fixedTerm");
  const rateTypeWatch = watch("rateType");
  const propertyPriceWatch = watch("propertyPrice");
  // Add customRate to type for getValues
  const customRateWatch = watch("customRate");
  // Calculate loan amount and interest
  const loanAmount = Math.max(propertyPriceWatch - getValues("deposit"), 0);
  const selectedRate =
    rateTypeWatch === "custom"
      ? Number(customRateWatch) || 0
      : FIXED_TERMS.find((t) => t.value === getValues("fixedTerm"))?.rate ||
        5.29;
  const totalInterest =
    loanAmount > 0
      ? Math.round(loanAmount * (selectedRate / 100) * getValues("term"))
      : 0;

  const resultRef = React.useRef<HTMLDivElement>(null);

  const onSubmit = (data: any) => {
    setShowResult(true);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  React.useEffect(() => {
    setValue("deposit", DEPOSIT_MIN);
  }, [propertyPriceWatch, setValue]);

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto`}>
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span role="img" aria-label="loan">
          💳
        </span>
        Your loan
      </h1>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="purpose"
          control={control}
          render={({ field }) => (
            <RadioGroup
              options={LOAN_PURPOSES}
              value={field.value}
              onChange={field.onChange}
              name="purpose"
              legendText="Loan purpose"
              aria-invalid={!!errors.purpose}
              chipStyle
            />
          )}
        />
        <CurrencyInputField
          control={control}
          errors={errors}
          name="propertyPrice"
          label="Estimated property price"
          rules={{
            required: "Property price is required",
            min: {
              value: PROPERTY_MIN,
              message: `Minimum property price is ${formatCurrency(
                PROPERTY_MIN
              )}`,
            },
          }}
          onBlur={async (e) => {
            await trigger("propertyPrice");
          }}
        />
        <DepositField
          control={control}
          errors={errors}
          propertyPrice={propertyPriceWatch}
          min={DEPOSIT_MIN}
        />
        <TermField
          control={control}
          errors={errors}
          min={TERM_MIN}
          max={TERM_MAX}
        />
        <RateTypeSelector
          control={control}
          errors={errors}
          setValue={setValue}
          watch={watch}
          fixedTerms={FIXED_TERMS}
        />
        <div className="text-xs text-gray-500 mt-2">
          Minimum 20% equity required
        </div>
        <button
          type="submit"
          className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition-colors"
        >
          Calculate
        </button>
      </form>
      {/* Results */}
      {showResult && (
        <ResultsSummary
          loanAmount={loanAmount}
          deposit={getValues("deposit")}
          totalInterest={totalInterest}
          formatCurrency={formatCurrency}
          resultRef={resultRef}
        />
      )}
    </div>
  );
};
