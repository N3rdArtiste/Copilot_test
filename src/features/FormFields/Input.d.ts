import React, { InputHTMLAttributes } from 'react';
/**
 * Input Component
 *
 * A basic input component. It accepts standard HTML input props.
 *
 * Props:
 * - type: The HTML input type (e.g., 'text', 'email', 'password').
 * - placeholder: The placeholder text for the input.
 * - className: Optional Tailwind CSS classes for the input.
 * - All other standard input props (including those from react-hook-form's field) are passed through.
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
