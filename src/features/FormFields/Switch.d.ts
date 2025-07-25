import React from 'react';
/**
 * Switch Component
 *
 * A custom toggle switch component that uses a hidden checkbox for accessibility.
 *
 * Props:
 * - checked: Boolean indicating if the switch is on.
 * - onChange: Callback function when the switch is toggled.
 * - name: The name attribute for the hidden checkbox.
 * - id: The ID for the hidden checkbox (passed from FormFieldWrapper).
 * - aria-describedby: Passed from FormFieldWrapper for helper/error text association.
 * - aria-invalid: Passed from FormFieldWrapper to indicate error state.
 * - className: Optional Tailwind CSS classes for the overall switch container.
 * - labelClassName: Optional Tailwind CSS classes for the switch label.
 */
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    labelClassName?: string;
}
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLInputElement>>;
