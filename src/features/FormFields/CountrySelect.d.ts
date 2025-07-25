import React from "react";
/**
 * CountrySelect Component
 *
 * A select dropdown for choosing a country. Uses a built-in list of common countries with emoji flags.
 *
 * Props:
 * - value: The currently selected country code (ISO 3166-1 alpha-2).
 * - onChange: Callback when the selection changes.
 * - name: The name attribute for the select element.
 * - className: Optional Tailwind CSS classes for the select element.
 * - All other standard select props are passed through.
 */
export interface CountrySelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
}
export declare const CountrySelect: React.ForwardRefExoticComponent<CountrySelectProps & React.RefAttributes<HTMLSelectElement>>;
