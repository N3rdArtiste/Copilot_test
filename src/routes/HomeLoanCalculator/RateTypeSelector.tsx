// RateTypeSelector.tsx
// Usage: Rate type selection (fixed/custom) for HomeLoanCalculator form
import React from "react";
import { Controller, Control, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { FormFieldWrapper, Input, RadioGroup } from "../../features/FormFields";

export interface FixedTermOption {
  value: number;
  label: string;
  rate: number;
}

export interface RateTypeSelectorProps {
  control: Control<any>;
  errors: FieldErrors;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  fixedTerms: FixedTermOption[];
}

/**
 * RateTypeSelector - Renders rate type buttons, fixed term options, and custom rate input.
 * Used in HomeLoanCalculator form for selecting interest rate type and value.
 */
export const RateTypeSelector: React.FC<RateTypeSelectorProps> = ({ control, errors, setValue, watch, fixedTerms }) => {
  const rateTypeWatch = watch("rateType");
  const fixedTermWatch = watch("fixedTerm");
  return (
    <div>
      <Controller
        name="rateType"
        control={control}
        render={({ field }) => (
          <FormFieldWrapper label="Choose a rate" errorMessage={typeof errors.rateType?.message === 'string' ? errors.rateType.message : undefined} labelAsLegend>
            <RadioGroup
              options={[
                { value: "fixed", label: "Fixed term" },
                { value: "custom", label: "or enter a rate" },
              ]}
              value={field.value}
              onChange={field.onChange}
              legendText={''}
              name="rateType"
              aria-invalid={!!errors.rateType}
              chipStyle
            />
          </FormFieldWrapper>
        )}
      />
      {rateTypeWatch === "fixed" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {fixedTerms.map(opt => (
            <label key={opt.value} className={`block border rounded-lg p-3 cursor-pointer ${fixedTermWatch === opt.value ? "border-blue-600 ring-2 ring-blue-200" : "border-gray-300"}`}>
              <input
                type="radio"
                name="fixedTerm"
                className="sr-only"
                checked={fixedTermWatch === opt.value}
                onChange={() => setValue("fixedTerm", opt.value)}
              />
              <div className="font-semibold text-base">{opt.label} <span className="block text-xs font-normal text-gray-500">fixed term</span></div>
              <div className="text-2xl font-bold mt-1">{opt.rate.toFixed(2)}<span className="text-base font-normal">%<span className="text-xs"> per annum</span></span></div>
            </label>
          ))}
        </div>
      )}
      {rateTypeWatch === "custom" && (
        <Controller
          name="customRate"
          control={control}
          rules={{
            validate: v => rateTypeWatch !== "custom" || (v && !isNaN(Number(v)) && Number(v) > 0) || "Enter a valid rate",
          }}
          render={({ field }) => (
            <FormFieldWrapper label="Custom rate (%)" errorMessage={typeof errors.customRate?.message === 'string' ? errors.customRate.message : undefined}>
              <Input
                {...field}
                type="number"
                min={0}
                inputMode="decimal"
                step={0.01}
                placeholder="e.g. 5.25"
                className="w-32"
                aria-label="Custom rate"
              />
            </FormFieldWrapper>
          )}
        />
      )}
    </div>
  );
};
