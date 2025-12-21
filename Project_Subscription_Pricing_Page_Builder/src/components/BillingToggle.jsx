import React from 'react';

const BillingToggle = ({ isYearly, onToggle }) => {
  return (
    <div className="billing-toggle-wrapper">
      <span className={`billing-label ${!isYearly ? 'active' : ''}`}>
        Monthly
      </span>
      
      <button 
        className={`billing-toggle ${isYearly ? 'yearly' : ''}`}
        onClick={onToggle}
        aria-label="Toggle billing period"
      >
        <div className="billing-toggle-thumb" />
      </button>
      
      <span className={`billing-label ${isYearly ? 'active' : ''}`}>
        Yearly
      </span>
      
      {isYearly && (
        <span className="billing-savings">Save 20%</span>
      )}
    </div>
  );
};

export default BillingToggle;
