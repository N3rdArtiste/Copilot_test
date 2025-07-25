import React from "react";
import { Control, FieldErrors } from "react-hook-form";
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
export declare const TermField: React.FC<TermFieldProps>;
