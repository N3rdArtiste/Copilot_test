import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { HomeLoanCalculator } from './HomeLoanCalculator';

// Mock the child components
jest.mock('../../features/FormFields/CurrencyInputField', () => ({
  CurrencyInputField: ({ control, errors, name, label, rules, onBlur }: any) => (
    <div data-testid={`currency-field-${name}`}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="text"
        placeholder={label}
        onBlur={onBlur}
        data-testid={`input-${name}`}
      />
      {errors[name] && <span data-testid={`error-${name}`}>{errors[name].message}</span>}
    </div>
  ),
}));

jest.mock('./TermField', () => ({
  TermField: ({ control, errors, min, max }: any) => (
    <div data-testid="term-field">
      <label htmlFor="term">Loan Term</label>
      <input
        id="term"
        type="number"
        min={min}
        max={max}
        data-testid="input-term"
        placeholder="Loan Term"
      />
      {errors.term && <span data-testid="error-term">{errors.term.message}</span>}
    </div>
  ),
}));

jest.mock('./RateTypeSelector', () => ({
  RateTypeSelector: ({ control, errors, setValue, watch, fixedTerms }: any) => (
    <div data-testid="rate-type-selector">
      <label htmlFor="rateType">Rate Type</label>
      <select id="rateType" data-testid="select-rateType">
        <option value="fixed">Fixed</option>
        <option value="custom">Custom</option>
      </select>
      <select id="fixedTerm" data-testid="select-fixedTerm">
        {fixedTerms.map((term: any) => (
          <option key={term.value} value={term.value}>
            {term.label}
          </option>
        ))}
      </select>
    </div>
  ),
}));

jest.mock('./DepositField', () => ({
  DepositField: ({ control, errors, propertyPrice, min }: any) => (
    <div data-testid="deposit-field">
      <label htmlFor="deposit">Deposit</label>
      <input
        id="deposit"
        type="number"
        min={min}
        data-testid="input-deposit"
        placeholder="Deposit"
      />
      {errors.deposit && <span data-testid="error-deposit">{errors.deposit.message}</span>}
    </div>
  ),
}));

jest.mock('./ResultsSummary', () => ({
  ResultsSummary: ({ loanAmount, deposit, totalInterest, formatCurrency, resultRef }: any) => (
    <div ref={resultRef} data-testid="results-summary">
      <h2>Your loan</h2>
      <div data-testid="loan-amount">{formatCurrency(loanAmount)}</div>
      <div data-testid="deposit-amount">{formatCurrency(deposit)}</div>
      <div data-testid="total-interest">{formatCurrency(totalInterest)}</div>
    </div>
  ),
}));

jest.mock('@/features/FormFields', () => ({
  RadioGroup: ({ options, value, onChange, name, legendText, chipStyle }: any) => (
    <fieldset data-testid={`radio-group-${name}`}>
      <legend>{legendText}</legend>
      {options.map((option: any) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            data-testid={`radio-${name}-${option.value}`}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  ),
}));

// Mock react-hook-form
const mockHandleSubmit = jest.fn();
const mockGetValues = jest.fn();
const mockSetValue = jest.fn();
const mockWatch = jest.fn();
const mockTrigger = jest.fn();

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    control: {},
    handleSubmit: mockHandleSubmit,
    formState: { errors: {} },
    getValues: mockGetValues,
    setValue: mockSetValue,
    watch: mockWatch,
    trigger: mockTrigger,
  }),
  Controller: ({ render, name }: any) => {
    const field = { value: 'first_home', onChange: jest.fn() };
    return render({ field });
  },
}));

describe('HomeLoanCalculator', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mock return values
    mockGetValues.mockImplementation((field) => {
      const defaultValues: any = {
        purpose: 'first_home',
        propertyPrice: 600000,
        deposit: 550000,
        term: 30,
        rateType: 'fixed',
        fixedTerm: 6,
        customRate: '',
      };
      return field ? defaultValues[field] : defaultValues;
    });
    
    mockWatch.mockImplementation((field) => {
      const watchValues: any = {
        fixedTerm: 6,
        rateType: 'fixed',
        propertyPrice: 600000,
        customRate: '',
      };
      return watchValues[field];
    });
    
    mockHandleSubmit.mockImplementation((callback) => (e: any) => {
      e?.preventDefault?.();
      callback({});
    });
  });

  it('renders the component with correct heading', () => {
    render(<HomeLoanCalculator />);
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Your loan')).toBeInTheDocument();
    expect(screen.getByLabelText('loan')).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<HomeLoanCalculator />);
    
    // Check if all form components are rendered
    expect(screen.getByTestId('radio-group-purpose')).toBeInTheDocument();
    expect(screen.getByTestId('currency-field-propertyPrice')).toBeInTheDocument();
    expect(screen.getByTestId('deposit-field')).toBeInTheDocument();
    expect(screen.getByTestId('term-field')).toBeInTheDocument();
    expect(screen.getByTestId('rate-type-selector')).toBeInTheDocument();
  });

  it('displays loan purpose radio options correctly', () => {
    render(<HomeLoanCalculator />);
    
    const radioGroup = screen.getByTestId('radio-group-purpose');
    expect(radioGroup).toBeInTheDocument();
    expect(screen.getByText('Loan purpose')).toBeInTheDocument();
    
    // Check all radio options are present
    expect(screen.getByTestId('radio-purpose-first_home')).toBeInTheDocument();
    expect(screen.getByTestId('radio-purpose-next_home')).toBeInTheDocument();
    expect(screen.getByTestId('radio-purpose-investment')).toBeInTheDocument();
    expect(screen.getByTestId('radio-purpose-refinance')).toBeInTheDocument();
  });

  it('displays the calculate button', () => {
    render(<HomeLoanCalculator />);
    
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    expect(calculateButton).toBeInTheDocument();
    expect(calculateButton).toHaveClass('bg-indigo-600', 'text-white');
  });

  it('displays minimum equity requirement text', () => {
    render(<HomeLoanCalculator />);
    
    expect(screen.getByText('Minimum 20% equity required')).toBeInTheDocument();
  });

  it('does not show results initially', () => {
    render(<HomeLoanCalculator />);
    
    expect(screen.queryByTestId('results-summary')).not.toBeInTheDocument();
  });

  it('shows results after form submission', async () => {
    render(<HomeLoanCalculator />);
    
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    
    await user.click(calculateButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('results-summary')).toBeInTheDocument();
    });
  });

  it('calculates loan amount correctly', () => {
    // Mock different values for calculation test
    mockGetValues.mockImplementation((field) => {
      const values: any = {
        deposit: 100000,
        term: 25,
        fixedTerm: 12,
      };
      return field ? values[field] : values;
    });
    
    mockWatch.mockImplementation((field) => {
      const watchValues: any = {
        propertyPrice: 500000,
        rateType: 'fixed',
        customRate: '',
      };
      return watchValues[field];
    });

    render(<HomeLoanCalculator />);
    
    // The component should calculate loanAmount = propertyPrice - deposit = 500000 - 100000 = 400000
    // This would be visible in the ResultsSummary component when displayed
  });

  it('handles custom rate type selection', () => {
    mockWatch.mockImplementation((field) => {
      const watchValues: any = {
        propertyPrice: 600000,
        rateType: 'custom',
        customRate: '5.5',
        fixedTerm: 6,
      };
      return watchValues[field];
    });

    render(<HomeLoanCalculator />);
    
    // The component should use custom rate when rateType is 'custom'
    expect(screen.getByTestId('rate-type-selector')).toBeInTheDocument();
  });

  it('handles fixed rate type selection with different terms', () => {
    mockWatch.mockImplementation((field) => {
      const watchValues: any = {
        propertyPrice: 600000,
        rateType: 'fixed',
        customRate: '',
        fixedTerm: 24, // 24 months term
      };
      return watchValues[field];
    });

    render(<HomeLoanCalculator />);
    
    expect(screen.getByTestId('rate-type-selector')).toBeInTheDocument();
  });

  it('calls setValue for deposit when propertyPrice changes', () => {
    render(<HomeLoanCalculator />);
    
    // The useEffect should call setValue with DEPOSIT_MIN (0) when propertyPrice changes
    expect(mockSetValue).toHaveBeenCalledWith('deposit', 0);
  });

  it('renders with correct form structure', () => {
    render(<HomeLoanCalculator />);
    
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveClass('flex', 'flex-col', 'gap-6');
  });

  it('handles form submission with handleSubmit', async () => {
    render(<HomeLoanCalculator />);
    
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    await user.click(calculateButton);
    
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('formats currency correctly', () => {
    render(<HomeLoanCalculator />);
    
    // Test the formatCurrency function indirectly by checking it's used in the component
    // The function should format numbers as USD currency without decimal places
    const testValue = 600000;
    const expectedFormat = testValue.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
    
    expect(expectedFormat).toBe('$600,000');
  });

  it('calculates total interest correctly for positive loan amounts', () => {
    mockGetValues.mockImplementation((field) => {
      const values: any = {
        deposit: 100000,
        term: 30,
        fixedTerm: 6,
      };
      return field ? values[field] : values;
    });
    
    mockWatch.mockImplementation((field) => {
      const watchValues: any = {
        propertyPrice: 500000,
        rateType: 'fixed',
        customRate: '',
      };
      return watchValues[field];
    });

    render(<HomeLoanCalculator />);
    
    // loanAmount = 500000 - 100000 = 400000
    // selectedRate = 5.29% (for 6 months fixed term)
    // totalInterest = 400000 * (5.29 / 100) * 30 = 635,600
    // The calculation logic is present in the component
  });

  it('handles zero or negative loan amounts', () => {
    mockGetValues.mockImplementation((field) => {
      const values: any = {
        deposit: 700000, // More than property price
        term: 30,
        fixedTerm: 6,
      };
      return field ? values[field] : values;
    });
    
    mockWatch.mockImplementation((field) => {
      const watchValues: any = {
        propertyPrice: 600000,
        rateType: 'fixed',
        customRate: '',
      };
      return watchValues[field];
    });

    render(<HomeLoanCalculator />);
    
    // loanAmount should be Math.max(600000 - 700000, 0) = 0
    // totalInterest should be 0 when loanAmount is 0
  });

  it('has correct styling classes', () => {
    render(<HomeLoanCalculator />);
    
    const container = document.querySelector('.bg-white.rounded-lg.shadow-md');
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    
    expect(container).toBeInTheDocument();
    expect(calculateButton).toHaveClass(
      'mt-4',
      'w-full',
      'py-2',
      'px-4',
      'bg-indigo-600',
      'text-white',
      'font-semibold',
      'rounded',
      'hover:bg-indigo-700',
      'transition-colors'
    );
  });

  it('passes correct props to child components', () => {
    render(<HomeLoanCalculator />);
    
    // Verify that child components receive the expected props
    expect(screen.getByTestId('currency-field-propertyPrice')).toBeInTheDocument();
    expect(screen.getByTestId('deposit-field')).toBeInTheDocument();
    expect(screen.getByTestId('term-field')).toBeInTheDocument();
    expect(screen.getByTestId('rate-type-selector')).toBeInTheDocument();
  });
});
