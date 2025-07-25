# Project Specification: ai-test

## Overview
This document outlines the structure, conventions, and best practices for the `ai-test` codebase. It is intended to help current and future developers understand the organization of the project and maintain consistency when contributing new features or refactoring existing code.

---

## Project Structure

```
root/
├── public/                # Static assets and HTML entry point
├── src/                   # Source code
│   ├── assets/            # Images, fonts, and other static resources
│   ├── features/          # Feature-based modules (grouped by domain)
│   │   └── app/           # Example feature module
│   │       ├── AppLayout/ # Layout components for the app
│   │       ├── AppDrawer/ # Drawer UI components
│   │       └── AppHeader/ # Header UI components
│   ├── redux/             # Redux store setup and hooks
│   ├── routes/            # Route-based code organization
│   │   └── RegisterCard/  # Example route module
│   │       └── CardDetailsForm/ # Nested feature/component
│   ├── settings/          # App-wide settings and configuration
│   └── utils/             # Shared utility functions and helpers
├── __mocks__/             # Jest and testing mocks
├── coverage/              # Test coverage reports
├── package.json           # Project metadata and dependencies
├── tsconfig.json          # TypeScript configuration
├── webpack.config.js      # Webpack configuration
└── ...                    # Other config and meta files
```

---

## Naming Conventions
- **Folders:** Use `PascalCase` for component and feature folders (e.g., `CardDetailsForm/`).
- **Files:**
  - Components: `ComponentName.tsx`
  - Styles: `ComponentName.module.scss`
  - Tests: `ComponentName.spec.tsx`
  - Index files: `index.ts` for re-exports
- **Hooks:** Custom hooks are placed in `redux/` and named as `useSomething.ts`.

---

## Component & Feature Organization
- **Feature-based structure:** Group related components, logic, and styles by feature or domain.
- **Component folders:** Each component/feature folder contains:
  - Main component file (`.tsx`)
  - Styles (`.module.scss`)
  - Tests (`.spec.tsx`)
  - Context or helpers as needed
- **Re-exports:** Use `index.ts` files for clean imports.

---

## State Management
- **Redux Toolkit:** Centralized state is managed in `src/redux/` using Redux Toolkit.
- **Hooks:** Use `useAppDispatch`, `useAppSelector`, and other custom hooks for interacting with the store.
- **Slices:** Feature-specific state logic is organized in `slice.ts` files within feature folders.

---

## Styling
- **Tailwind CSS:** Use Tailwind CSS utility classes for styling components. Prefer Tailwind for layout, spacing, color, and responsive design. Use custom CSS Modules (`.module.scss`) only for complex or reusable styles that cannot be achieved with Tailwind.
- **CSS Modules:** Use `.module.scss` files for component-scoped styles when Tailwind is insufficient.
- **Naming:** Use BEM or clear, descriptive class names for any custom CSS.
- **No global styles:** Avoid global CSS except for resets or base styles.

---

## Testing
- **Jest & React Testing Library:** All components and logic should have corresponding `.spec.tsx` or `.spec.ts` files.
- **Mocks:** Place reusable mocks in `__mocks__/`.
- **Coverage:** Aim for high test coverage; reports are generated in `coverage/`.

---

## Adding New Features
1. **Create a new folder** under `features/` or `routes/` as appropriate.
2. **Follow the naming conventions** for files and folders.
3. **Add tests** for all new components and logic.
4. **Use CSS Modules** for styling.
5. **Update exports** in `index.ts` files for easy imports.
6. **Document any new patterns** in this spec if needed.

---

## Best Practices
- Keep components small and focused.
- Prefer function components and hooks.
- Use TypeScript for type safety. Always write explicit TypeScript types for props, state, and function signatures. Avoid using `any` types; keep their usage to an absolute minimum.
- Add a usage comment at the top of every component and function, describing its purpose and usage.
- Write clear, descriptive commit messages.
- Keep dependencies up to date.
- Document complex logic with comments or README updates.

---

## FORM PATTERN
Always use react-hook-form's `<Controller>` and `<FormFieldWrapper>` for all form fields in all forms/routes.

### Example:
```tsx
<Controller
  name="fieldName"
  control={control}
  render={({ field }) => (
    <FormFieldWrapper label="Field label" errorMessage={errors.fieldName?.message}>
      <Input {...field} />
    </FormFieldWrapper>
  )}
/>
```

This ensures accessibility, validation, and consistent UI/UX across the app.
