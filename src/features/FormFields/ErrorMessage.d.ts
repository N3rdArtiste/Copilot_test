import React, { ReactNode } from 'react';
/**
 * ErrorMessage Component
 *
 * Displays a validation error message. It includes ARIA attributes to ensure
 * screen readers announce the error promptly.
 *
 * Props:
 * - id: The ID for the error message element (used by aria-describedby on the input).
 * - children: The error message text.
 * - className: Optional Tailwind CSS classes for the error message.
 */
export interface ErrorMessageProps {
    id?: string;
    children: ReactNode;
    className?: string;
}
export declare const ErrorMessage: React.FC<ErrorMessageProps>;
