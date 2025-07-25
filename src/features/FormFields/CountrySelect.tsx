import React, { forwardRef } from "react";

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

const countries = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  // ...add more as needed
];

export const CountrySelect = forwardRef<HTMLSelectElement, CountrySelectProps>(
  ({ value, onChange, name, className = "", ...props }, ref) => (
    <select
      value={value}
      onChange={onChange}
      name={name}
      ref={ref}
      className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
      {...props}
    >
      <option value="" disabled>
        Select a country
      </option>
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.flag} {country.name}
        </option>
      ))}
    </select>
  )
);
CountrySelect.displayName = "CountrySelect";
