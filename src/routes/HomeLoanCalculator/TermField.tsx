// TermField.tsx
// Usage: Loan term input and slider for HomeLoanCalculator form
import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { FormFieldWrapper, Input, Slider } from "../../features/FormFields";

export interface TermFieldProps {
  control: Control<any>;
  errors: FieldErrors;
  min: number;
  max: number;
}

/**
 * TermField - Renders the loan term input and slider.
 * Used in HomeLoanCalculator form for selecting loan term in years.
 */
export const TermField: React.FC<TermFieldProps> = ({ control, errors, min, max }) => (
  <Controller
    name="term"
    control={control}
    render={({ field }) => (
      <FormFieldWrapper label="Loan term" errorMessage={typeof errors.term?.message === 'string' ? errors.term.message : undefined}>
        <div className="flex items-center border rounded-md overflow-hidden mb-2">
          <Input
            {...field}
            value={field.value + " years"}
            onChange={e => {
              const raw = e.target.value.replace(/[^0-9]/g, "");
              const num = Number(raw);
              field.onChange(isNaN(num) ? min : Math.max(min, Math.min(max, num)));
            }}
            aria-label="Loan term (years)"
          />
        </div>
        <Slider
          min={min}
          max={max}
          step={1}
          value={field.value}
          onChange={e => field.onChange(Number(e.target.value))}
          aria-label="Loan term slider"
        />
        <div className="flex justify-between text-lg text-gray-700 font-medium">
          <span>{min} year</span>
          <span>{max} years</span>
        </div>
      </FormFieldWrapper>
    )}
  />
);
