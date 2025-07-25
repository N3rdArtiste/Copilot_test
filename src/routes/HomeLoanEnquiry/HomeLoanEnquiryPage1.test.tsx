import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { HomeLoanEnquiryPage1, HomeLoanEnquiryPage1Data } from './HomeLoanEnquiryPage1';

// Mock the FormFields components
jest.mock('../../features/FormFields', () => ({
  FormFieldWrapper: ({ label, errorMessage, children }: any) => (
    <div data-testid={`field-wrapper-${label?.toLowerCase().replace(/\s+/g, '-')}`}>
      <label>{label}</label>
      {children}
      {errorMessage && <span data-testid="error-message">{errorMessage}</span>}
    </div>
  ),
  Input: ({ ...props }: any) => (
    <input {...props} data-testid={`input-${props.name || 'input'}`} />
  ),
  Select: React.forwardRef(({ options, value, onChange, name, ...props }: any, ref) => (
    <select 
      {...props} 
      ref={ref}
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      data-testid={`select-${name || 'select'}`}
    >
      {options?.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )),
  DateField: ({ ...props }: any) => (
    <input 
      {...props} 
      type="date" 
      data-testid={`date-${props.name || 'date'}`}
    />
  ),
  RadioGroup: ({ options, value, onChange, name, legendText }: any) => (
    <fieldset data-testid={`radio-group-${name}`}>
      <legend>{legendText}</legend>
      {options?.map((option: any) => (
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

describe('HomeLoanEnquiryPage1', () => {
  const user = userEvent.setup();
  const mockOnNext = jest.fn();

  const defaultProps = {
    onNext: mockOnNext,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all required form fields', () => {
    render(<HomeLoanEnquiryPage1 {...defaultProps} />);
    
    // Check all form field wrappers are present
    expect(screen.getByTestId('field-wrapper-title')).toBeInTheDocument();
    expect(screen.getByTestId('field-wrapper-first-name')).toBeInTheDocument();
    expect(screen.getByTestId('field-wrapper-last-name')).toBeInTheDocument();
    expect(screen.getByTestId('field-wrapper-date-of-birth')).toBeInTheDocument();
    expect(screen.getByTestId('field-wrapper-phone-number')).toBeInTheDocument();
    expect(screen.getByTestId('field-wrapper-email')).toBeInTheDocument();
  });

  it('renders all radio group questions', () => {
    render(<HomeLoanEnquiryPage1 {...defaultProps} />);
    
    expect(screen.getByTestId('radio-group-contactPreference')).toBeInTheDocument();
    expect(screen.getByTestId('radio-group-applicantType')).toBeInTheDocument();
    expect(screen.getByTestId('radio-group-hasDependants')).toBeInTheDocument();
    expect(screen.getByTestId('radio-group-isExistingCustomer')).toBeInTheDocument();
  });

  it('displays correct radio group questions text', () => {
    render(<HomeLoanEnquiryPage1 {...defaultProps} />);
    
    expect(screen.getByText('How would you like to discuss the next steps of your enquiry?')).toBeInTheDocument();
    expect(screen.getByText('I am making this home loan enquiry?')).toBeInTheDocument();
    expect(screen.getByText('Do you have any dependants?')).toBeInTheDocument();
    expect(screen.getByText('Are you and/or the joint applicant already an customer?')).toBeInTheDocument();
  });

  it('has correct default values for radio groups', () => {
    render(<HomeLoanEnquiryPage1 {...defaultProps} />);
    
    expect(screen.getByTestId('radio-contactPreference-email')).toBeChecked();
    expect(screen.getByTestId('radio-applicantType-myself')).toBeChecked();
    expect(screen.getByTestId('radio-hasDependants-no')).toBeChecked();
    expect(screen.getByTestId('radio-isExistingCustomer-no')).toBeChecked();
  });

  it('renders navigation buttons correctly', () => {
    render(<HomeLoanEnquiryPage1 {...defaultProps} />);
    
    const nextButton = screen.getByText('Next');
    
    expect(nextButton).toBeInTheDocument();
    // Page 1 should not have a previous button
    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
  });

  it('calls onNext with form data when form is submitted with valid data', async () => {
    render(<HomeLoanEnquiryPage1 {...defaultProps} />);
    
    // Fill out required fields
    await user.selectOptions(screen.getByTestId('select-title'), 'mr');
    await user.type(screen.getByTestId('input-firstName'), 'John');
    await user.type(screen.getByTestId('input-lastName'), 'Doe');
    await user.type(screen.getByTestId('date-dateOfBirth'), '1990-01-01');
    await user.type(screen.getByTestId('input-phoneNumber'), '0211234567');
    await user.type(screen.getByTestId('input-email'), 'john.doe@example.com');
    
    const nextButton = screen.getByText('Next');
    await user.click(nextButton);
    
    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'mr',
          firstName: 'John',
          lastName: 'Doe',
          phoneNumber: '0211234567',
          email: 'john.doe@example.com',
          contactPreference: 'email',
          applicantType: 'myself',
          hasDependants: 'no',
          isExistingCustomer: 'no',
        })
      );
    });
  });

  it('displays validation errors for required fields', async () => {
    render(<HomeLoanEnquiryPage1 {...defaultProps} />);
    
    const nextButton = screen.getByText('Next');
    await user.click(nextButton);
    
    await waitFor(() => {
      const errorMessages = screen.getAllByTestId('error-message');
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  it('validates email format', async () => {
    render(<HomeLoanEnquiryPage1 {...defaultProps} />);
    
    const emailInput = screen.getByTestId('input-email');
    await user.type(emailInput, 'invalid-email');
    
    const nextButton = screen.getByText('Next');
    await user.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('populates form with initial data when provided', () => {
    const initialData: Partial<HomeLoanEnquiryPage1Data> = {
      title: 'mrs',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      contactPreference: 'phone' as 'phone',
      applicantType: 'joint' as 'joint',
      hasDependants: 'yes' as 'yes',
      isExistingCustomer: 'yes' as 'yes',
    };
    
    render(<HomeLoanEnquiryPage1 {...defaultProps} initialData={initialData} />);
    
    expect(screen.getByTestId('input-firstName')).toHaveValue('Jane');
    expect(screen.getByTestId('input-lastName')).toHaveValue('Smith');
    expect(screen.getByTestId('input-email')).toHaveValue('jane.smith@example.com');
    expect(screen.getByTestId('radio-contactPreference-phone')).toBeChecked();
    expect(screen.getByTestId('radio-applicantType-joint')).toBeChecked();
    expect(screen.getByTestId('radio-hasDependants-yes')).toBeChecked();
    expect(screen.getByTestId('radio-isExistingCustomer-yes')).toBeChecked();
  });

  it('allows user to change radio selections', async () => {
    render(<HomeLoanEnquiryPage1 {...defaultProps} />);
    
    const phoneRadio = screen.getByTestId('radio-contactPreference-phone');
    const jointRadio = screen.getByTestId('radio-applicantType-joint');
    
    await user.click(phoneRadio);
    await user.click(jointRadio);
    
    expect(phoneRadio).toBeChecked();
    expect(jointRadio).toBeChecked();
    expect(screen.getByTestId('radio-contactPreference-email')).not.toBeChecked();
    expect(screen.getByTestId('radio-applicantType-myself')).not.toBeChecked();
  });

  it('has correct input types for specific fields', () => {
    render(<HomeLoanEnquiryPage1 {...defaultProps} />);
    
    expect(screen.getByTestId('input-phoneNumber')).toHaveAttribute('type', 'tel');
    expect(screen.getByTestId('input-email')).toHaveAttribute('type', 'email');
    expect(screen.getByTestId('date-dateOfBirth')).toHaveAttribute('type', 'date');
  });

  it('renders with proper form structure', () => {
    render(<HomeLoanEnquiryPage1 {...defaultProps} />);
    
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
  });
});
