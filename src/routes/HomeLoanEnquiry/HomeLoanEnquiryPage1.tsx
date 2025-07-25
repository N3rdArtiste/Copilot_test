// HomeLoanEnquiryPage1.tsx
// Usage: First page of the Home loan enquiry form
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormFieldWrapper,
  Input,
  Select,
  DateField,
  RadioGroup,
} from "../../features/FormFields";
import * as styles from "./HomeLoanEnquiryPage1.module.scss";

const TITLE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "mr", label: "Mr" },
  { value: "mrs", label: "Mrs" },
  { value: "ms", label: "Ms" },
  { value: "dr", label: "Dr" },
  { value: "prof", label: "Prof" },
];

const CONTACT_PREFERENCE_OPTIONS = [
  { value: "email", label: "Via email" },
  { value: "phone", label: "Over the phone" },
];

const APPLICANT_TYPE_OPTIONS = [
  { value: "myself", label: "For myself" },
  { value: "joint", label: "With a joint applicant" },
];

const YES_NO_OPTIONS = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes" },
];

// Zod schema for form validation
const homeLoanEnquiryPage1Schema = z.object({
  title: z.string().min(1, "Title is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      // Check if birthday has occurred this year
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }, "You must be at least 18 years old"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  contactPreference: z.enum(["email", "phone"]),
  applicantType: z.enum(["myself", "joint"]),
  hasDependants: z.enum(["no", "yes"]),
  isExistingCustomer: z.enum(["no", "yes"]),
});

export interface HomeLoanEnquiryPage1Data extends z.infer<typeof homeLoanEnquiryPage1Schema> {}

interface HomeLoanEnquiryPage1Props {
  onNext: (data: HomeLoanEnquiryPage1Data) => void;
  initialData?: Partial<HomeLoanEnquiryPage1Data>;
}

/**
 * HomeLoanEnquiryPage1 - First page of the home loan enquiry form.
 * Collects personal information and basic preferences for the loan enquiry.
 */
export const HomeLoanEnquiryPage1: React.FC<HomeLoanEnquiryPage1Props> = ({
  onNext,
  initialData,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HomeLoanEnquiryPage1Data>({
    resolver: zodResolver(homeLoanEnquiryPage1Schema),
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      contactPreference: "email",
      applicantType: "myself",
      hasDependants: "no",
      isExistingCustomer: "no",
      ...initialData,
    },
    mode: "onBlur",
  });

  const onSubmit = (data: HomeLoanEnquiryPage1Data) => {
    onNext(data);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <FormFieldWrapper label="Title" errorMessage={errors.title?.message}>
              <Select
                {...field}
                options={TITLE_OPTIONS}
                aria-invalid={!!errors.title}
              />
            </FormFieldWrapper>
          )}
        />

        {/* First Name */}
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <FormFieldWrapper
              label="First name"
              errorMessage={errors.firstName?.message}
            >
              <Input {...field} aria-invalid={!!errors.firstName} />
            </FormFieldWrapper>
          )}
        />

        {/* Last Name */}
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <FormFieldWrapper
              label="Last name"
              errorMessage={errors.lastName?.message}
            >
              <Input {...field} aria-invalid={!!errors.lastName} />
            </FormFieldWrapper>
          )}
        />

        {/* Date of Birth */}
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => (
            <FormFieldWrapper
              label="Date of birth"
              errorMessage={errors.dateOfBirth?.message}
            >
              <DateField {...field} aria-invalid={!!errors.dateOfBirth} />
            </FormFieldWrapper>
          )}
        />

        {/* Phone Number */}
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <FormFieldWrapper
              label="Phone number"
              errorMessage={errors.phoneNumber?.message}
            >
              <Input
                {...field}
                type="tel"
                aria-invalid={!!errors.phoneNumber}
              />
            </FormFieldWrapper>
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormFieldWrapper
              label="Email"
              errorMessage={errors.email?.message}
            >
              <Input
                {...field}
                type="email"
                aria-invalid={!!errors.email}
              />
            </FormFieldWrapper>
          )}
        />

        {/* Contact Preference */}
        <Controller
          name="contactPreference"
          control={control}
          render={({ field }) => (
            <RadioGroup
              options={CONTACT_PREFERENCE_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              name="contactPreference"
              legendText="How would you like to discuss the next steps of your enquiry?"
              aria-invalid={!!errors.contactPreference}
            />
          )}
        />

        {/* Applicant Type */}
        <Controller
          name="applicantType"
          control={control}
          render={({ field }) => (
            <RadioGroup
              options={APPLICANT_TYPE_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              name="applicantType"
              legendText="I am making this home loan enquiry?"
              aria-invalid={!!errors.applicantType}
            />
          )}
        />

        {/* Has Dependants */}
        <Controller
          name="hasDependants"
          control={control}
          render={({ field }) => (
            <RadioGroup
              options={YES_NO_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              name="hasDependants"
              legendText="Do you have any dependants?"
              aria-invalid={!!errors.hasDependants}
            />
          )}
        />

        {/* Existing Customer */}
        <Controller
          name="isExistingCustomer"
          control={control}
          render={({ field }) => (
            <RadioGroup
              options={YES_NO_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              name="isExistingCustomer"
              legendText="Are you and/or the joint applicant already an customer?"
              aria-invalid={!!errors.isExistingCustomer}
            />
          )}
        />

        {/* Navigation Buttons */}
        <div className={styles.navigationButtons}>
          <button
            type="submit"
            className={styles.nextButton}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};
