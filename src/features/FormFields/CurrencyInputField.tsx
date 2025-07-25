import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { FormFieldWrapper, Input } from "./index";
import { RadioGroup } from "./RadioGroup";

/**
 * CurrencyInputField - Currency input with $ prefix
 */
export const CurrencyInputField: React.FC<{
  control: Control<any>;
  errors: FieldErrors;
  name: string;
  label: string;
  min?: number;
  rules?: any;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}> = ({ control, errors, name, label, min, rules, onBlur }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => (
      <FormFieldWrapper label={label} errorMessage={typeof errors[name]?.message === 'string' ? errors[name]?.message : undefined}>
        <div className="flex items-center border rounded-md overflow-hidden">
          <span className="pl-4 pr-2 text-2xl text-gray-500 select-none">$</span>
          <Input
            {...field}
            value={field.value.toLocaleString()}
            onChange={e => {
              const raw = e.target.value.replace(/[^0-9]/g, "");
              const num = Number(raw);
              field.onChange(isNaN(num) ? 0 : num);
            }}
            onBlur={onBlur}
            aria-label={label}
          />
        </div>
      </FormFieldWrapper>
    )}
  />
);

