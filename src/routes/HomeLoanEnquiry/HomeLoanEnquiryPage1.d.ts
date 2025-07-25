import React from "react";
import { z } from "zod";
declare const homeLoanEnquiryPage1Schema: z.ZodObject<{
    title: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    dateOfBirth: z.ZodEffects<z.ZodString, string, string>;
    phoneNumber: z.ZodString;
    email: z.ZodString;
    contactPreference: z.ZodEnum<["email", "phone"]>;
    applicantType: z.ZodEnum<["myself", "joint"]>;
    hasDependants: z.ZodEnum<["no", "yes"]>;
    isExistingCustomer: z.ZodEnum<["no", "yes"]>;
}, "strip", z.ZodTypeAny, {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    phoneNumber: string;
    contactPreference: "email" | "phone";
    applicantType: "myself" | "joint";
    hasDependants: "yes" | "no";
    isExistingCustomer: "yes" | "no";
}, {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    phoneNumber: string;
    contactPreference: "email" | "phone";
    applicantType: "myself" | "joint";
    hasDependants: "yes" | "no";
    isExistingCustomer: "yes" | "no";
}>;
export interface HomeLoanEnquiryPage1Data extends z.infer<typeof homeLoanEnquiryPage1Schema> {
}
interface HomeLoanEnquiryPage1Props {
    onNext: (data: HomeLoanEnquiryPage1Data) => void;
    initialData?: Partial<HomeLoanEnquiryPage1Data>;
}
/**
 * HomeLoanEnquiryPage1 - First page of the home loan enquiry form.
 * Collects personal information and basic preferences for the loan enquiry.
 */
export declare const HomeLoanEnquiryPage1: React.FC<HomeLoanEnquiryPage1Props>;
export {};
