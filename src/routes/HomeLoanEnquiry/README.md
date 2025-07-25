# Home Loan Enquiry Form

This directory contains the implementation of the multi-page Home Loan Enquiry form based on the provided design specifications.

## Components

### 1. HomeLoanEnquiry.tsx
The main container component that manages the multi-page form workflow:
- **State Management**: Tracks current page and form data across pages
- **Navigation**: Handles transitions between form pages
- **Progress Indicator**: Visual progress tracker for user guidance
- **Data Persistence**: Maintains form state when navigating between pages

### 2. HomeLoanEnquiryPage1.tsx
The first page of the enquiry form containing:

#### Personal Information Fields:
- **Title**: Dropdown selection (Mr, Mrs, Ms, Dr, Prof)
- **First Name**: Text input with validation
- **Last Name**: Text input with validation  
- **Date of Birth**: Date picker with dd/mm/yyyy format
- **Phone Number**: Tel input with validation
- **Email**: Email input with format validation

#### Preference Questions (Radio Groups):
1. **Contact Preference**: "How would you like to discuss the next steps?"
   - Via email (default)
   - Over the phone

2. **Applicant Type**: "I am making this home loan enquiry?"
   - For myself (default)
   - With a joint applicant

3. **Dependants**: "Do you have any dependants?"
   - No (default)
   - Yes

4. **Existing Customer**: "Are you and/or the joint applicant already an customer?"
   - No (default)  
   - Yes

## Features

### ✅ Form Validation
- **Required Fields**: All personal information fields are mandatory
- **Email Validation**: Proper email format checking
- **Real-time Validation**: Validates on blur and submit
- **Error Display**: Clear error messages for invalid inputs

### ✅ User Experience
- **Progress Tracking**: Visual progress indicator
- **Navigation**: Previous/Next buttons with proper state management
- **Responsive Design**: Works across different screen sizes
- **Accessibility**: Proper ARIA labels and semantic HTML

### ✅ State Management
- **Form Persistence**: Data maintained across page navigation
- **Initial Data Support**: Can pre-populate with existing data
- **Clean Form State**: Uses react-hook-form for efficient state management

### ✅ TypeScript Support
- **Full Type Safety**: All props and data structures typed
- **Interface Definitions**: Clear contracts for all components
- **Export Types**: Available for external consumption

## File Structure

```
src/routes/HomeLoanEnquiry/
├── HomeLoanEnquiry.tsx              # Main container component
├── HomeLoanEnquiry.d.ts             # Type definitions
├── HomeLoanEnquiry.module.scss      # Container styles
├── HomeLoanEnquiryPage1.tsx         # Page 1 implementation
├── HomeLoanEnquiryPage1.module.scss # Page 1 styles
├── HomeLoanEnquiryPage1.test.tsx    # Unit tests
├── index.ts                         # Module exports
└── index.d.ts                       # Type exports
```

## Styling

### CSS Modules
- **Scoped Styles**: Component-specific styling to avoid conflicts
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Button States**: Proper hover and disabled states

### Design System Integration
- **FormFields**: Uses existing project FormField components
- **Consistent Spacing**: Follows established spacing patterns
- **Typography**: Matches project typography scale

## Testing

### Unit Tests (HomeLoanEnquiryPage1.test.tsx)
Comprehensive test coverage including:

- ✅ **Rendering Tests**: Component structure and content
- ✅ **User Interaction**: Form submission, navigation, input changes
- ✅ **Validation Testing**: Required fields and email format
- ✅ **State Management**: Default values and data persistence
- ✅ **Accessibility**: Button states and form structure
- ✅ **Props Handling**: Initial data and callback functions

**Test Categories:**
- Component rendering (title, branding, fields)
- Form field presence and functionality
- Radio group default selections
- Navigation button behavior
- Form validation (required fields, email format)
- Data persistence and initial value population
- User interaction workflows

## Usage

### Basic Implementation
```tsx
import { HomeLoanEnquiry } from '@/routes/HomeLoanEnquiry';

// In your routing configuration
<Route path="/home-loan-enquiry" element={<HomeLoanEnquiry />} />
```

### With Custom Navigation
```tsx
import { HomeLoanEnquiryPage1 } from '@/routes/HomeLoanEnquiry';

<HomeLoanEnquiryPage1
  onNext={(data) => {
    // Handle page 1 completion
    console.log('Page 1 data:', data);
  }}
  onPrevious={() => {
    // Handle back navigation
    history.back();
  }}
  initialData={{
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  }}
/>
```

## Integration

### Routing
The component is integrated into the app routing system:
- **Route Path**: `/home-loan-enquiry`
- **Navigation Item**: "Home Loan Enquiry" in main navigation
- **Route Configuration**: Added to `rootNavItems.tsx`

### Dependencies
- **react-hook-form**: Form state management and validation
- **FormFields**: Reuses existing form components
- **CSS Modules**: Scoped component styling

## Future Enhancements

### Page 2 Implementation
Ready for page 2 implementation when design is provided:
- Container already supports multi-page workflow
- State management prepared for additional pages  
- Navigation system extensible
- Type definitions ready for expansion

### Potential Features
- **Form Analytics**: Track user interaction patterns
- **Save Draft**: Allow users to save progress
- **Dynamic Validation**: Context-aware validation rules
- **Accessibility Enhancements**: Screen reader optimizations
- **Performance**: Code splitting for large forms

## Data Flow

```
HomeLoanEnquiry (Container)
    ↓
    ├── Page 1 Data → Store in state
    ├── Page 2 Data → Store in state  
    └── Complete → Submit combined data
```

The form follows a linear progression with data accumulated at each step and submitted as a complete package upon final submission.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement approach
- Graceful degradation for older browsers
