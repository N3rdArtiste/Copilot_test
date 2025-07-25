import React from "react";
import { z } from "zod";
declare const homeLoanEnquiryPage2Schema: z.ZodObject<{
    loanPurpose: z.ZodEnum<["buying-first-home", "buying-new-house", "buying-investment-property", "building-new-home", "switching-mortgage"]>;
    borrowAmount: z.ZodEffects<z.ZodNumber, number, number>;
    depositAmount: z.ZodEffects<z.ZodNumber, number, number>;
    annualIncome: z.ZodEffects<z.ZodNumber, number, number>;
}, "strip", z.ZodTypeAny, {
    loanPurpose: "buying-first-home" | "buying-new-house" | "buying-investment-property" | "building-new-home" | "switching-mortgage";
    borrowAmount: number;
    depositAmount: number;
    annualIncome: number;
}, {
    loanPurpose: "buying-first-home" | "buying-new-house" | "buying-investment-property" | "building-new-home" | "switching-mortgage";
    borrowAmount: number;
    depositAmount: number;
    annualIncome: number;
}>;
export interface HomeLoanEnquiryPage2Data extends z.infer<typeof homeLoanEnquiryPage2Schema> {
}
interface HomeLoanEnquiryPage2Props {
    onNext: (data: HomeLoanEnquiryPage2Data) => void;
    onPrevious: () => void;
    initialData?: Partial<HomeLoanEnquiryPage2Data>;
}
/**
 * HomeLoanEnquiryPage2 - Second page of the home loan enquiry form.
 * Collects loan details including purpose, borrow amount, deposit, and income information.
 */
export declare const HomeLoanEnquiryPage2: React.FC<HomeLoanEnquiryPage2Props>;
export {};
