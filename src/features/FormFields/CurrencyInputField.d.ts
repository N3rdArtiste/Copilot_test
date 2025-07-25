import React from "react";
import { Control, FieldErrors } from "react-hook-form";
/**
 * CurrencyInputField - Currency input with $ prefix
 */
export declare const CurrencyInputField: React.FC<{
    control: Control<any>;
    errors: FieldErrors;
    name: string;
    label: string;
    min?: number;
    rules?: any;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}>;
