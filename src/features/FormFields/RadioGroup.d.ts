import React from 'react';
/**
 * RadioGroup Component
 *
 * A component for rendering a group of radio buttons. It ensures only one option
 * can be selected and handles accessibility attributes.
 *
 * Props:
 * - options: An array of objects, e.g., [{ value: 'option1', label: 'Option 1' }].
 * - value: The currently selected value.
 * - onChange: Callback function when a radio button is changed (receives the new selected value).
 * - name: The name attribute for the radio group.
 * - legendText: The text to be used for the <legend> element. Can be string or { primary: string, secondary?: string }.
 * - aria-describedby: Passed from FormFieldWrapper for helper/error text association.
 * - aria-invalid: Passed from FormFieldWrapper to indicate error state for the group.
 * - className: Optional Tailwind CSS classes for the overall group div.
 * - radioClassName: Optional Tailwind CSS classes for individual radio buttons.
 * - labelClassName: Optional Tailwind CSS classes for individual radio labels.
 * - id: The ID for the legend (passed from FormFieldWrapper).
 */
export interface RadioOption {
    value: string;
    label: string;
}
export interface RadioGroupProps {
    options: RadioOption[];
    value: string;
    onChange: (value: string) => void;
    name: string;
    legendText: string | {
        primary: string;
        secondary?: string;
    };
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    className?: string;
    radioClassName?: string;
    labelClassName?: string;
    id?: string;
    chipStyle?: boolean;
}
export declare const RadioGroup: React.FC<RadioGroupProps>;
