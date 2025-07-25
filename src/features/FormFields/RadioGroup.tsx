import React, { useId } from 'react';

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
  legendText: string | { primary: string; secondary?: string };
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  className?: string;
  radioClassName?: string;
  labelClassName?: string;
  id?: string;
  chipStyle?: boolean; // If true, render chip-style buttons instead of radio inputs
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  legendText,
  'aria-describedby': describedBy,
  'aria-invalid': isInvalid,
  className = '',
  radioClassName = '',
  labelClassName = '',
  id,
  chipStyle = false,
}) => {
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const primaryLegend = typeof legendText === 'object' ? legendText.primary : legendText;
  const secondaryLegend = typeof legendText === 'object' ? legendText.secondary : undefined;

  return (
    <fieldset
      className={`space-y-2 ${className}`}
      aria-describedby={describedBy}
      aria-invalid={isInvalid}
      aria-labelledby={id}
    >
      <legend id={id} className="text-sm font-medium text-gray-700 mb-1">
        <span className="font-bold">{primaryLegend}</span>
        {secondaryLegend && <span className="block text-gray-500 text-xs mt-0.5">{secondaryLegend}</span>}
      </legend>
      {chipStyle ? (
        <div role="radiogroup" aria-label={typeof legendText === 'string' ? legendText : legendText.primary} className="flex gap-2 flex-wrap">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`px-4 py-2 rounded-full border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${value === option.value ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300"} ${radioClassName}`}
              onClick={() => onChange(option.value)}
              aria-pressed={value === option.value}
              aria-checked={value === option.value}
              role="radio"
              tabIndex={value === option.value ? 0 : -1}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : (
        options.map((option) => {
          const uniqueRadioId = useId();
          const radioId = `${name}-${option.value}-${uniqueRadioId}`;
          return (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={radioId}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={handleRadioChange}
                className={`h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 ${radioClassName}`}
              />
              <label htmlFor={radioId} className={`ml-2 block text-sm text-gray-900 ${labelClassName}`}>
                {option.label}
              </label>
            </div>
          );
        })
      )}
    </fieldset>
  );
};
