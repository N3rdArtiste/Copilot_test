import React, { useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as classes from "./ApplicantDetailsForm.module.scss";
import {
  FormFieldWrapper,
  Input,
  DateField,
  RadioGroup,
  CheckboxGroup,
  Select,
  Switch,
  CountrySelect,
} from "../../features/FormFields";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const purposeOptions = [
  { value: "shopping", label: "Shopping" },
  { value: "travel", label: "Travel" },
  { value: "business", label: "Business" },
  { value: "emergency", label: "Emergency" },
  { value: "other", label: "Other" },
];

const creditLimitOptions = [
  { value: "1000", label: "$1,000" },
  { value: "3000", label: "$3,000" },
  { value: "5000", label: "$5,000" },
  { value: "10000", label: "$10,000" },
];

// Helper to format as currency
const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .min(8, "Phone number is required")
      .max(20, "Phone number is too long"),
    dob: z.string().min(1, "Date of birth is required"),
    gender: z.string().min(1, "Gender is required"),
    address: z.string().min(1, "Address is required"),
    country: z.string().min(1, "Country is required"),
    income: z.string().min(1, "Income is required"),
    expenses: z.string().min(1, "Expenses is required"),
    purposes: z.array(z.string()).min(1, "Select at least one purpose"),
    otherPurpose: z.string().optional(),
    creditLimit: z.string().min(1, "Select a credit limit"),
    creditCheck: z
      .boolean()
      .refine((val) => val, { message: "You must allow a credit check" }),
  })
  .refine(
    (data) => {
      if (data.purposes.includes("other")) {
        return !!data.otherPurpose && data.otherPurpose.trim().length > 0;
      }
      return true;
    },
    {
      message: "Please specify the other purpose",
      path: ["otherPurpose"],
    }
  );

type FormValues = z.infer<typeof schema>;

// Reusable AmountSliderField component for Loan/Deposit fields
interface AmountSliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (val: number) => void;
  errorMessage?: string;
  disabled?: boolean;
  percentLabel?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

/**
 * AmountSliderField - A reusable field for currency input + slider + percent UI
 * Used for Loan amount and Deposit amount fields.
 */
const AmountSliderField: React.FC<AmountSliderFieldProps> = ({
  label,
  value,
  min,
  max,
  onChange,
  errorMessage,
  disabled,
  percentLabel,
  inputProps,
}) => (
  <FormFieldWrapper label={label} errorMessage={errorMessage}>
    <div className="flex items-center border rounded-md overflow-hidden mb-2">
      <span className="pl-4 pr-2 text-2xl text-gray-500 select-none">$</span>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9,]*"
        className="flex-1 py-3 text-2xl font-medium focus:outline-none"
        value={value.toLocaleString()}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^0-9]/g, "");
          const num = Number(raw);
          onChange(isNaN(num) ? min : Math.max(min, Math.min(max, num)));
        }}
        aria-label={label}
        disabled={true}
        {...inputProps}
      />
      <span className="pr-4 pl-2 text-2xl text-gray-700 font-semibold select-none">
        {percentLabel}
      </span>
    </div>
    <div className="flex flex-col gap-2">
      <input
        type="range"
        min={min}
        max={max}
        step={1000}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-700 h-2 rounded-lg appearance-none bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={`${label} slider`}
        disabled={disabled}
      />
      <div className="flex justify-between text-lg text-gray-700 font-medium">
        <span>{formatCurrency(min)}</span>
        <span>{formatCurrency(max)}</span>
      </div>
    </div>
  </FormFieldWrapper>
);

export const ApplicantDetailsForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      address: "",
      country: "",
      income: "",
      expenses: "",
      purposes: [],
      creditLimit: "",
      creditCheck: false,
    },
    mode: "onSubmit",
  });

  const errorCalloutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSubmitted && !isValid && errorCalloutRef.current) {
      errorCalloutRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isSubmitted, isValid]);

  const onSubmit = (data: FormValues) => {
    alert("Submitted applicant details:\n" + JSON.stringify(data, null, 2));
  };

  const errorList = Object.entries(errors)
    .filter(([_, v]) => v && typeof v.message === "string")
    .map(([k, v]) => (v && typeof v.message === "string" ? v.message : null))
    .filter(Boolean);

  return (
    <form
      className={`bg-white rounded-lg shadow-md p-6 flex flex-col gap-6`}
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Applicant details form"
    >
      {errorList.length > 0 && (
        <div
          ref={errorCalloutRef}
          className="mb-4 p-4 rounded-lg bg-red-50 border border-red-300 text-red-800 shadow-sm animate-pulse"
          role="alert"
          tabIndex={-1}
        >
          <strong className="block mb-2">
            Please fix the following errors:
          </strong>
          <ul className="list-disc pl-5 space-y-1">
            {errorList.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
      <fieldset className="border border-gray-200 rounded-md p-4">
        <legend className="text-lg font-semibold text-gray-700 mb-2">
          Applicant Information
        </legend>
        <div className="flex gap-4">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <FormFieldWrapper
                label="First Name"
                errorMessage={errors.firstName?.message}
                className="flex-1"
              >
                <Input {...field} autoComplete="given-name" />
              </FormFieldWrapper>
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <FormFieldWrapper
                label="Last Name"
                errorMessage={errors.lastName?.message}
                className="flex-1"
              >
                <Input {...field} autoComplete="family-name" />
              </FormFieldWrapper>
            )}
          />
        </div>
        <div className="flex gap-4">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormFieldWrapper
                label="Email"
                errorMessage={errors.email?.message}
                className="flex-1"
              >
                <Input {...field} type="email" autoComplete="email" />
              </FormFieldWrapper>
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <FormFieldWrapper
                label="Phone Number"
                errorMessage={errors.phone?.message}
                className="flex-1"
              >
                <Input {...field} type="tel" autoComplete="tel" />
              </FormFieldWrapper>
            )}
          />
        </div>
        <Controller
          name="dob"
          control={control}
          render={({ field }) => (
            <FormFieldWrapper
              label="Date of Birth"
              errorMessage={errors.dob?.message}
            >
              <DateField {...field} />
            </FormFieldWrapper>
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <FormFieldWrapper
              label="Gender"
              errorMessage={errors.gender?.message}
              labelAsLegend
            >
              <RadioGroup
                options={genderOptions}
                value={field.value}
                onChange={field.onChange}
                name="gender"
                legendText={{ primary: "Gender" }}
                aria-invalid={!!errors.gender}
              />
            </FormFieldWrapper>
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <FormFieldWrapper
              label="Address"
              errorMessage={errors.address?.message}
            >
              <Input {...field} autoComplete="street-address" />
            </FormFieldWrapper>
          )}
        />
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <FormFieldWrapper
              label="Country"
              errorMessage={errors.country?.message}
            >
              <CountrySelect {...field} />
            </FormFieldWrapper>
          )}
        />
        <div className="flex gap-4">
          <Controller
            name="income"
            control={control}
            render={({ field }) => (
              <FormFieldWrapper
                label="Monthly Income"
                errorMessage={errors.income?.message}
                className="flex-1"
              >
                <Input {...field} type="number" min="0" step="0.01" />
              </FormFieldWrapper>
            )}
          />
          <Controller
            name="expenses"
            control={control}
            render={({ field }) => (
              <FormFieldWrapper
                label="Monthly Expenses"
                errorMessage={errors.expenses?.message}
                className="flex-1"
              >
                <Input {...field} type="number" min="0" step="0.01" />
              </FormFieldWrapper>
            )}
          />
        </div>
        <Controller
          name="purposes"
          control={control}
          render={({ field }) => {
            const showOther =
              Array.isArray(field.value) && field.value.includes("other");
            return (
              <>
                <FormFieldWrapper
                  label="Purpose of Applying"
                  errorMessage={errors.purposes?.message}
                  labelAsLegend
                >
                  <CheckboxGroup
                    options={purposeOptions}
                    value={field.value}
                    onChange={field.onChange}
                    name="purposes"
                    legendText={{ primary: "Purpose of Applying" }}
                    aria-invalid={!!errors.purposes}
                  />
                </FormFieldWrapper>
                {showOther && (
                  <Controller
                    name="otherPurpose"
                    control={control}
                    render={({ field: otherField }) => (
                      <FormFieldWrapper
                        label="Please specify other purpose"
                        errorMessage={
                          typeof errors.otherPurpose?.message === "string"
                            ? errors.otherPurpose.message
                            : undefined
                        }
                      >
                        <Input {...otherField} />
                      </FormFieldWrapper>
                    )}
                  />
                )}
              </>
            );
          }}
        />
        <Controller
          name="creditLimit"
          control={control}
          render={({ field }) => (
            <FormFieldWrapper
              label="Requested Credit Limit"
              errorMessage={errors.creditLimit?.message}
            >
              <Select
                options={creditLimitOptions}
                value={field.value}
                onChange={field.onChange}
                name="creditLimit"
                placeholder="Select credit limit"
                aria-invalid={!!errors.creditLimit}
              />
            </FormFieldWrapper>
          )}
        />
        <Controller
          name="creditCheck"
          control={control}
          render={({ field }) => (
            <FormFieldWrapper
              label="Allow credit check"
              errorMessage={errors.creditCheck?.message}
            >
              <Switch
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                name="creditCheck"
                aria-invalid={!!errors.creditCheck}
              />
            </FormFieldWrapper>
          )}
        />
      </fieldset>
      <button
        type="submit"
        className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};
