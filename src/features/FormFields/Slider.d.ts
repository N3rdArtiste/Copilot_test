import React from "react";
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
export declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLInputElement>>;
