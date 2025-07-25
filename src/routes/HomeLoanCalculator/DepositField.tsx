// DepositField.tsx
// Usage: Deposit input and slider for HomeLoanCalculator form
import React from "react";
import { Controller } from "react-hook-form";
import { FormFieldWrapper, Input, Slider } from "../../features/FormFields";

interface DepositFieldProps {
  control: any;
  errors: any;
  propertyPrice: number;
  min: number;
}

export const DepositField: React.FC<DepositFieldProps> = ({ control, errors, propertyPrice, min }) => (
  <Controller
    name="deposit"
    control={control}
    render={({ field }) => (
      <FormFieldWrapper label="Deposit amount" errorMessage={errors.deposit?.message}>
        <div className="flex items-center border rounded-md overflow-hidden mb-2">
          <span className="pl-4 pr-2 text-2xl text-gray-500 select-none">$</span>
          <Input
            {...field}
            disabled
            value={field.value.toLocaleString()}
            onChange={e => {
              const raw = e.target.value.replace(/[^0-9]/g, "");
              const num = Number(raw);
              field.onChange(isNaN(num) ? min : Math.max(min, Math.min(propertyPrice, num)));
            }}
            aria-label="Deposit amount"
          />
          <span className="pr-4 pl-2 text-2xl text-gray-700 font-semibold select-none">{((field.value / propertyPrice) * 100).toFixed(1)}%</span>
        </div>
        <Slider
          min={min}
          max={propertyPrice}
          step={1000}
          value={field.value}
          onChange={e => field.onChange(Number(e.target.value))}
          aria-label="Deposit amount slider"
        />
        <div className="flex justify-between text-lg text-gray-700 font-medium">
          <span>{min.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</span>
          <span>{propertyPrice.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</span>
        </div>
      </FormFieldWrapper>
    )}
  />
);
