import React, { useState } from 'react';
import PricingCard from './PricingCard';
import BillingToggle from './BillingToggle';
import CurrencySelector from './CurrencySelector';
import ViewToggle from './ViewToggle';
import CompareTable from './CompareTable';

const PreviewPanel = ({ plans, isYearly, onToggleBilling, currency, onCurrencyChange }) => {
  const [view, setView] = useState('cards');

  if (plans.length === 0) {
    return (
      <div className="preview-panel">
        <div className="preview-container">
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3 className="empty-title">No Pricing Plans Yet</h3>
            <p className="empty-description">
              Create your first pricing plan using the builder on the left.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="preview-panel">
      <div className="preview-container">
        <header className="preview-header">
          <h2 className="preview-title">
            Choose the perfect <span>plan</span> for you
          </h2>
          <p className="preview-subtitle">
            Simple, transparent pricing that grows with you. Try any plan free for 30 days.
          </p>
        </header>

        <div className="preview-controls">
          <BillingToggle isYearly={isYearly} onToggle={onToggleBilling} />
          <CurrencySelector 
            selectedCurrency={currency} 
            onCurrencyChange={onCurrencyChange} 
          />
          <ViewToggle view={view} onToggle={setView} />
        </div>

        {view === 'cards' ? (
          <div className="pricing-cards">
            {plans.map((plan) => (
              <PricingCard 
                key={plan.id} 
                plan={plan} 
                isYearly={isYearly}
                currency={currency}
              />
            ))}
          </div>
        ) : (
          <CompareTable 
            plans={plans} 
            isYearly={isYearly} 
            currency={currency} 
          />
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
