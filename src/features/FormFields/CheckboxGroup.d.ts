import React from 'react';
/**
 * CheckboxGroup Component
 *
 * A component for rendering a group of checkboxes. It manages its own internal IDs
 * and accessibility attributes for each checkbox.
 *
 * Props:
 * - options: An array of objects, e.g., [{ value: 'option1', label: 'Option 1' }].
 * - value: An array of currently selected values.
 * - onChange: Callback function when a checkbox is changed (receives the new array of selected values).
 * - name: The name attribute for the checkbox group (important for form submission).
 * - legendText: The text to be used for the <legend> element. Can be string or { primary: string, secondary?: string }.
 * - aria-describedby: Passed from FormFieldWrapper for helper/error text association.
 * - aria-invalid: Passed from FormFieldWrapper to indicate error state for the group.
 * - className: Optional Tailwind CSS classes for the overall group div.
 * - checkboxClassName: Optional Tailwind CSS classes for individual checkboxes.
 * - labelClassName: Optional Tailwind CSS classes for individual checkbox labels.
 * - id: The ID for the legend (passed from FormFieldWrapper).
 */
export interface CheckboxOption {
    value: string;
    label: string;
}
export interface CheckboxGroupProps {
    options: CheckboxOption[];
    value: string[];
    onChange: (value: string[]) => void;
    name: string;
    legendText: string | {
        primary: string;
        secondary?: string;
    };
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    className?: string;
    checkboxClassName?: string;
    labelClassName?: string;
    id?: string;
}
export declare const CheckboxGroup: React.FC<CheckboxGroupProps>;
