// HomeLoanEnquiryPage2.tsx
// Usage: Second page of the Home loan enquiry form
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormFieldWrapper,
  RadioGroup,
  CurrencyInputField,
  Input,
} from "../../features/FormFields";
import * as styles from "./HomeLoanEnquiryPage2.module.scss";

const LOAN_PURPOSE_OPTIONS = [
  { value: "buying-first-home", label: "Buying a first home" },
  { value: "buying-new-house", label: "Buying a new house" },
  {
    value: "buying-investment-property",
    label: "Buying an investment property",
  },
  { value: "building-new-home", label: "Building a new home" },
  {
    value: "switching-mortgage",
    label: "Switching my mortgage from another bank",
  },
];

// Zod schema for page 2 form validation
const homeLoanEnquiryPage2Schema = z.object({
  loanPurpose: z.enum(
    [
      "buying-first-home",
      "buying-new-house",
      "buying-investment-property",
      "building-new-home",
      "switching-mortgage",
    ],
    {
      errorMap: () => ({ message: "Please select a loan purpose" }),
    }
  ),
  borrowAmount: z
    .number()
    .min(1, "Please enter the amount you'd like to borrow")
    .refine((num) => {
      return !isNaN(num) && num > 0;
    }, "Please enter a valid amount"),
  depositAmount: z
    .number()
    .min(1, "Please enter your deposit amount")
    .refine((num) => {
      return !isNaN(num) && num >= 0;
    }, "Please enter a valid deposit amount"),
  annualIncome: z
    .number()
    .min(1, "Please enter your annual income")
    .refine((num) => {
      return !isNaN(num) && num > 0;
    }, "Please enter a valid annual income"),
});

export interface HomeLoanEnquiryPage2Data
  extends z.infer<typeof homeLoanEnquiryPage2Schema> {}

interface HomeLoanEnquiryPage2Props {
  onNext: (data: HomeLoanEnquiryPage2Data) => void;
  onPrevious: () => void;
  initialData?: Partial<HomeLoanEnquiryPage2Data>;
}

/**
 * HomeLoanEnquiryPage2 - Second page of the home loan enquiry form.
 * Collects loan details including purpose, borrow amount, deposit, and income information.
 */
export const HomeLoanEnquiryPage2: React.FC<HomeLoanEnquiryPage2Props> = ({
  onNext,
  onPrevious,
  initialData,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HomeLoanEnquiryPage2Data>({
    resolver: zodResolver(homeLoanEnquiryPage2Schema),
    defaultValues: {
      loanPurpose: "buying-first-home",
      borrowAmount: 0,
      depositAmount: 0,
      annualIncome: 0,
      ...initialData,
    },
    mode: "onBlur",
  });

  const onSubmit = (data: HomeLoanEnquiryPage2Data) => {
    onNext(data);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Loan Purpose */}
        <Controller
          name="loanPurpose"
          control={control}
          render={({ field }) => (
            <div>
              <RadioGroup
                options={LOAN_PURPOSE_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                name="loanPurpose"
                legendText="This home loan is for:"
                aria-invalid={!!errors.loanPurpose}
              />
              {errors.loanPurpose && (
                <span className="text-red-600 text-sm">
                  {errors.loanPurpose.message}
                </span>
              )}
            </div>
          )}
        />

        {/* Borrow Amount */}
        <CurrencyInputField
          control={control}
          errors={errors}
          name="borrowAmount"
          label="How much would you like to borrow?"
        />

        {/* Deposit Amount */}
        <CurrencyInputField
          control={control}
          errors={errors}
          name="depositAmount"
          label="Deposit amount"
        />

        {/* Annual Income */}
        <CurrencyInputField
          control={control}
          errors={errors}
          name="annualIncome"
          label="Your annual income"
        />

        {/* Terms and Privacy Notice */}
        <div className={styles.termsText}>
          By clicking submit, you agree to our terms of service and privacy
          policy, and consent to the collection and processing of your
          information as outlined.
        </div>

        {/* Navigation Buttons */}
        <div className={styles.navigationButtons}>
          <button
            type="button"
            onClick={onPrevious}
            className={styles.previousButton}
          >
            Previous
          </button>
          <button type="submit" className={styles.nextButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
