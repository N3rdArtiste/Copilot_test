// HomeLoanEnquiry.tsx
// Usage: Main container for the multi-page home loan enquiry form
import React, { useState } from "react";
import { HomeLoanEnquiryPage1, HomeLoanEnquiryPage1Data } from "./HomeLoanEnquiryPage1";
import { HomeLoanEnquiryPage2, HomeLoanEnquiryPage2Data } from "./HomeLoanEnquiryPage2";
import  * as styles from "./HomeLoanEnquiry.module.scss";

export type HomeLoanEnquiryData = {
  page1: HomeLoanEnquiryPage1Data;
  page2: HomeLoanEnquiryPage2Data;
};

/**
 * HomeLoanEnquiry - Multi-page home loan enquiry form container.
 * Manages state and navigation between form pages.
 */
export const HomeLoanEnquiry: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [formData, setFormData] = useState<Partial<HomeLoanEnquiryData>>({});

  const handlePage1Next = (data: HomeLoanEnquiryPage1Data) => {
    setFormData(prev => ({ ...prev, page1: data }));
    setCurrentPage(2);
  };

  const handlePage2Next = (data: HomeLoanEnquiryPage2Data) => {
    setFormData(prev => ({ ...prev, page2: data }));
    // Submit the complete form or navigate to success page
    console.log("Complete form data:", { ...formData, page2: data });
    // Here you would typically submit to an API or navigate to a success page
    alert("Form submitted successfully!");
  };

  const handlePage2Previous = () => {
    setCurrentPage(1);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <HomeLoanEnquiryPage1
            onNext={handlePage1Next}
            initialData={formData.page1}
          />
        );
      case 2:
        return (
          <HomeLoanEnquiryPage2
            onNext={handlePage2Next}
            onPrevious={handlePage2Previous}
            initialData={formData.page2}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles?.container || 'min-h-screen bg-gray-100 py-8'}>
      <div className={styles?.innerContainer || 'container mx-auto px-4'}>
        {/* Progress indicator */}
        <div className={styles?.progressIndicator || 'max-w-2xl mx-auto mb-8'}>
          <div className={styles?.progressSteps || 'flex items-center justify-center space-x-4'}>
            <div
              className={`${styles?.stepCircle || 'flex items-center justify-center w-8 h-8 rounded-full'} ${
                currentPage >= 1 ? (styles?.active || 'bg-blue-600 text-white') : (styles?.inactive || 'bg-gray-300 text-gray-600')
              }`}
            >
              1
            </div>
            <div
              className={`${styles?.progressLine || 'h-1 w-16'} ${
                currentPage >= 2 ? (styles?.completed || 'bg-blue-600') : (styles?.incomplete || 'bg-gray-300')
              }`}
            />
            <div
              className={`${styles?.stepCircle || 'flex items-center justify-center w-8 h-8 rounded-full'} ${
                currentPage >= 2 ? (styles?.active || 'bg-blue-600 text-white') : (styles?.inactive || 'bg-gray-300 text-gray-600')
              }`}
            >
              2
            </div>
          </div>
        </div>

        {renderCurrentPage()}
      </div>
    </div>
  );
};
