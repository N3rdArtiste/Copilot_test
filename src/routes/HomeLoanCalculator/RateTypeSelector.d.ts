import React from "react";
import { Control, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
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
export declare const RateTypeSelector: React.FC<RateTypeSelectorProps>;
