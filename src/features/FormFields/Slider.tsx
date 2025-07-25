import React, { forwardRef } from "react";

/**
 * Slider Component
 *
 * A styled range input (slider) for numeric values.
 *
 * Props:
 * - value: The current value of the slider.
 * - onChange: Callback when the value changes.
 * - min: Minimum value.
 * - max: Maximum value.
 * - step: Step value.
 * - className: Optional Tailwind CSS classes for the slider.
 * - All other standard input props are passed through.
 */
export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ value, onChange, min = 0, max = 100, step = 1, className = "", ...props }, ref) => (
    <input
      type="range"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      ref={ref}
      className={`w-full accent-indigo-600 h-2 rounded-lg appearance-none bg-gray-200 ${className}`}
      {...props}
    />
  )
);
Slider.displayName = "Slider";
