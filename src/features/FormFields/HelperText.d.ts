import React, { ReactNode } from 'react';
/**
 * HelperText Component
 *
 * Displays supplementary text to guide the user.
 *
 * Props:
 * - id: The ID for the helper text element (used by aria-describedby on the input).
 * - children: The helper text content.
 * - className: Optional Tailwind CSS classes for the helper text.
 */
export interface HelperTextProps {
    id?: string;
    children: ReactNode;
    className?: string;
}
export declare const HelperText: React.FC<HelperTextProps>;
