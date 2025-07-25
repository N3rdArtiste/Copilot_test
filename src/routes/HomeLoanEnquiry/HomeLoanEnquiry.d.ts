import React from "react";
import { HomeLoanEnquiryPage1Data } from "./HomeLoanEnquiryPage1";
import { HomeLoanEnquiryPage2Data } from "./HomeLoanEnquiryPage2";
export type HomeLoanEnquiryData = {
    page1: HomeLoanEnquiryPage1Data;
    page2: HomeLoanEnquiryPage2Data;
};
/**
 * HomeLoanEnquiry - Multi-page home loan enquiry form container.
 * Manages state and navigation between form pages.
 */
export declare const HomeLoanEnquiry: React.FC;
