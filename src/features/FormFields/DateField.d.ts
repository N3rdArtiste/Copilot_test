import React, { InputHTMLAttributes } from 'react';
/**
 * DateField Component
 *
 * An input component specifically for date selection.
 *
 * Props:
 * - className: Optional Tailwind CSS classes for the input.
 * - All other standard input props (including those from field) are passed through.
 */
export interface DateFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}
export declare const DateField: React.ForwardRefExoticComponent<DateFieldProps & React.RefAttributes<HTMLInputElement>>;
