import React, { SelectHTMLAttributes } from 'react';
/**
 * Select Component
 *
 * A standard HTML select dropdown component.
 *
 * Props:
 * - options: An array of objects, e.g., [{ value: 'option1', label: 'Option 1' }].
 * - value: The currently selected value.
 * - onChange: Callback function when the selection changes.
 * - name: The name attribute for the select element.
 * - placeholder: Optional placeholder text for the first option (if value is empty).
 * - className: Optional Tailwind CSS classes for the select element.
 * - All other standard select props (including those from field) are passed through.
 */
export interface SelectOption {
    value: string;
    label: string;
}
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'options'> {
    options: SelectOption[];
    placeholder?: string;
    className?: string;
}
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
