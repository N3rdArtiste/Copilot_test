import React, { ReactNode } from 'react';
/**
 * FormFieldWrapper Component
 *
 * A flexible and accessible wrapper for form fields. It handles the association
 * of labels, input elements, helper text, and error messages, providing
 * necessary ARIA attributes for screen readers. This component is designed
 * to wrap individual form inputs or groups.
 *
 * Props:
 * - label: The primary text content for the label (bold).
 * - secondaryLabel: Optional secondary text content for the label (greyed out).
 * - children: The actual form input component (e.g., <Input>, <Select>, <CheckboxGroup>, etc.).
 * - helperText: Optional text to provide additional guidance.
 * - errorMessage: Optional text to display validation errors.
 * - className: Optional Tailwind CSS classes for the wrapper div.
 * - labelClassName: Optional Tailwind CSS classes for the label.
 * - helperTextClassName: Optional Tailwind CSS classes for the helper text.
 * - errorClassName: Optional Tailwind CSS classes for the error message.
 * - id: Optional explicit ID for the input. If not provided, a unique ID is generated.
 * - labelAsLegend: Boolean to indicate if the 'label' prop should be passed as 'legendText' to the child,
 *   and the wrapper should not render its own <label>. Useful for fieldset/legend patterns.
 */
export interface FormFieldWrapperProps {
    label: string;
    secondaryLabel?: string;
    children: ReactNode;
    helperText?: string;
    errorMessage?: string;
    className?: string;
    labelClassName?: string;
    helperTextClassName?: string;
    errorClassName?: string;
    id?: string;
    labelAsLegend?: boolean;
}
export declare const FormFieldWrapper: React.FC<FormFieldWrapperProps>;
