import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ResultsSummary } from './ResultsSummary';

describe('ResultsSummary', () => {
  const mockFormatCurrency = jest.fn((n: number) => 
    n.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    })
  );

  const defaultProps = {
    loanAmount: 400000,
    deposit: 100000,
    totalInterest: 200000,
    formatCurrency: mockFormatCurrency,
    resultRef: React.createRef<HTMLDivElement>(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the results summary with correct heading', () => {
    render(<ResultsSummary {...defaultProps} />);
    
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByText('Your loan')).toBeInTheDocument();
  });

  it('displays loan amount with label', () => {
    render(<ResultsSummary {...defaultProps} />);
    
    expect(screen.getByText('Loan amount')).toBeInTheDocument();
    expect(mockFormatCurrency).toHaveBeenCalledWith(400000);
    expect(screen.getByText('$400,000')).toBeInTheDocument();
  });

  it('displays deposit amount with label', () => {
    render(<ResultsSummary {...defaultProps} />);
    
    expect(screen.getByText('Deposit amount')).toBeInTheDocument();
    expect(mockFormatCurrency).toHaveBeenCalledWith(100000);
    expect(screen.getByText('$100,000')).toBeInTheDocument();
  });

  it('displays total interest with label and asterisk', () => {
    render(<ResultsSummary {...defaultProps} />);
    
    expect(screen.getByText('Total interest*')).toBeInTheDocument();
    expect(mockFormatCurrency).toHaveBeenCalledWith(200000);
    expect(screen.getByText('$200,000')).toBeInTheDocument();
  });

  it('displays disclaimer text', () => {
    render(<ResultsSummary {...defaultProps} />);
    
    expect(screen.getByText('*Estimated total interest over the loan term. Actual repayments may vary.')).toBeInTheDocument();
  });

  it('calls formatCurrency for all monetary values', () => {
    render(<ResultsSummary {...defaultProps} />);
    
    expect(mockFormatCurrency).toHaveBeenCalledTimes(3);
    expect(mockFormatCurrency).toHaveBeenCalledWith(400000);
    expect(mockFormatCurrency).toHaveBeenCalledWith(100000);
    expect(mockFormatCurrency).toHaveBeenCalledWith(200000);
  });

  it('applies ref to the container div', () => {
    const ref = React.createRef<HTMLDivElement>();
    const props = { ...defaultProps, resultRef: ref };
    
    render(<ResultsSummary {...props} />);
    
    expect(ref.current).toBeInTheDocument();
    expect(ref.current).toHaveClass('mt-8', 'border-t', 'pt-6');
  });

  it('handles zero values correctly', () => {
    const zeroProps = {
      ...defaultProps,
      loanAmount: 0,
      deposit: 0,
      totalInterest: 0,
    };
    
    render(<ResultsSummary {...zeroProps} />);
    
    expect(mockFormatCurrency).toHaveBeenCalledWith(0);
    // Since all three values are $0, we expect 3 instances
    const zeroElements = screen.getAllByText('$0');
    expect(zeroElements).toHaveLength(3);
  });

  it('handles large values correctly', () => {
    const largeProps = {
      ...defaultProps,
      loanAmount: 1500000,
      deposit: 300000,
      totalInterest: 800000,
    };
    
    render(<ResultsSummary {...largeProps} />);
    
    expect(mockFormatCurrency).toHaveBeenCalledWith(1500000);
    expect(mockFormatCurrency).toHaveBeenCalledWith(300000);
    expect(mockFormatCurrency).toHaveBeenCalledWith(800000);
  });

  it('has correct structure and styling', () => {
    const ref = React.createRef<HTMLDivElement>();
    const props = { ...defaultProps, resultRef: ref };
    
    render(<ResultsSummary {...props} />);
    
    const container = ref.current;
    expect(container).toHaveClass('mt-8', 'border-t', 'pt-6');
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass('text-xl', 'font-bold', 'mb-4');
    
    const contentDiv = container?.querySelector('.flex.flex-col.gap-2');
    expect(contentDiv).toBeInTheDocument();
    
    const disclaimer = screen.getByText('*Estimated total interest over the loan term. Actual repayments may vary.');
    expect(disclaimer).toHaveClass('text-xs', 'text-gray-500', 'mt-2');
  });

  it('displays all result rows with correct structure', () => {
    render(<ResultsSummary {...defaultProps} />);
    
    // Check that each row has the correct justify-between layout
    const loanAmountRow = screen.getByText('Loan amount').closest('.flex.justify-between');
    const depositRow = screen.getByText('Deposit amount').closest('.flex.justify-between');
    const interestRow = screen.getByText('Total interest*').closest('.flex.justify-between');
    
    expect(loanAmountRow).toBeInTheDocument();
    expect(depositRow).toBeInTheDocument();
    expect(interestRow).toBeInTheDocument();
    
    // Check that the values have font-semibold class
    const values = document.querySelectorAll('.font-semibold');
    expect(values).toHaveLength(3);
  });
});
