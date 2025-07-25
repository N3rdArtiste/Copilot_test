# HomeLoanCalculator Test Suite

This directory contains comprehensive unit tests for the HomeLoanCalculator component and its related components.

## Test Files

### 1. HomeLoanCalculator.test.tsx
Comprehensive unit tests for the main `HomeLoanCalculator` component covering:

- **Rendering Tests**: Component structure, headings, form fields
- **User Interaction Tests**: Form submission, button clicks, state changes  
- **Business Logic Tests**: Loan calculations, interest calculations, currency formatting
- **Edge Cases**: Zero/negative loan amounts, different rate types
- **Integration Tests**: Child component interactions, form validation

**Key Test Categories:**
- ✅ Component rendering and structure
- ✅ Form field presence and functionality  
- ✅ Calculate button behavior
- ✅ Results display after submission
- ✅ Loan amount and interest calculations
- ✅ Currency formatting
- ✅ Rate type selection (fixed vs custom)
- ✅ Deposit field updates based on property price
- ✅ CSS classes and styling validation

### 2. ResultsSummary.test.tsx
Unit tests for the `ResultsSummary` component covering:

- **Display Tests**: Proper rendering of loan results
- **Currency Formatting**: Correct formatting of monetary values
- **Props Handling**: Proper handling of all props including refs
- **Edge Cases**: Zero values, large numbers
- **Styling Tests**: CSS classes and component structure

**Key Test Categories:**
- ✅ Heading and labels display
- ✅ Currency formatting for all monetary values
- ✅ Disclaimer text display
- ✅ Ref forwarding functionality
- ✅ Component structure and styling
- ✅ Edge case handling (zero and large values)

## Mocking Strategy

The tests use a comprehensive mocking strategy:

### External Dependencies
- **react-hook-form**: Mocked with jest functions to control form state
- **@testing-library/user-event**: For simulating user interactions

### Child Components
All child components are mocked to:
- Isolate the component under test
- Control component behavior predictably
- Focus on integration points rather than implementation details

Mock components include:
- `CurrencyInputField`
- `TermField` 
- `RateTypeSelector`
- `DepositField`
- `RadioGroup`

## Test Features

### Business Logic Testing
Tests verify the core loan calculation logic:
```javascript
loanAmount = Math.max(propertyPrice - deposit, 0)
selectedRate = rateType === 'custom' ? customRate : fixedTermRate
totalInterest = loanAmount * (selectedRate / 100) * term
```

### Currency Formatting
Tests verify the `formatCurrency` function:
```javascript
formatCurrency(600000) // "$600,000"
```

### User Interactions
Tests simulate real user workflows:
1. User fills out form fields
2. User clicks Calculate button
3. Results are displayed with smooth scrolling
4. Form state is properly managed

## Running the Tests

```bash
# Run all tests
npm test

# Run with verbose output
npx jest --verbose

# Run specific test file
npx jest HomeLoanCalculator.test.tsx

# Run with coverage
npx jest --coverage

# Run in watch mode
npx jest --watch
```

## Test Configuration

Tests use the following setup:
- **Framework**: Jest with jsdom environment
- **Testing Library**: @testing-library/react for component testing
- **Assertions**: @testing-library/jest-dom for DOM assertions
- **User Events**: @testing-library/user-event for interaction simulation

## Coverage Goals

The test suite aims for high coverage across:
- **Statements**: All business logic and rendering code
- **Branches**: All conditional logic and edge cases
- **Functions**: All component methods and event handlers
- **Lines**: Comprehensive line coverage

## Best Practices Demonstrated

1. **Isolation**: Each component is tested in isolation with mocked dependencies
2. **User-Centric**: Tests focus on user behavior rather than implementation details
3. **Edge Cases**: Comprehensive edge case testing for robustness
4. **Readable**: Clear test descriptions and organized test structure
5. **Maintainable**: Mock strategy that survives refactoring
6. **Fast**: Efficient tests that run quickly in CI/CD pipelines

## Future Enhancements

Potential additions to the test suite:
- **Integration Tests**: Full form submission workflows
- **Visual Regression**: Screenshot comparison testing
- **Accessibility Tests**: ARIA compliance and keyboard navigation
- **Performance Tests**: Rendering performance benchmarks
- **E2E Tests**: Full user journey testing with Cypress/Playwright
