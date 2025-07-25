import React from 'react';

/**
 * Label Component
 *
 * A simple wrapper for the <label> element, ensuring correct association
 * with form fields via the 'htmlFor' prop.
 *
 * Props:
 * - htmlFor: The ID of the form element this label is for.
 * - primaryText: The main text content of the label (bold).
 * - secondaryText: Optional secondary text content of the label (greyed out).
 * - className: Optional Tailwind CSS classes for the label.
 */
export interface LabelProps {
  htmlFor: string;
  primaryText: string;
  secondaryText?: string;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, primaryText, secondaryText, className = '' }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
    <span className="font-bold">{primaryText}</span>
    {secondaryText && <span className="block text-gray-500 text-xs mt-0.5">{secondaryText}</span>}
  </label>
);
