import React from 'react';
import { formatPrice } from '../utils/currency';

const CheckIcon = () => (
  <svg 
    className="feature-icon" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PricingCard = ({ plan, isYearly, currency = 'USD' }) => {
  const priceInUSD = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const period = isYearly ? '/year' : '/month';
  const formattedPrice = formatPrice(priceInUSD, currency);

  return (
    <div className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}>
      {plan.isPopular && (
        <span className="popular-badge">Most Popular</span>
      )}
      
      <div className="card-header">
        <h3 className="card-name">{plan.name}</h3>
        {plan.description && (
          <p className="card-description">{plan.description}</p>
        )}
      </div>

      <div className="card-price-wrapper">
        <span className="card-price">
          <span className="card-currency">{formattedPrice.symbol}</span>
          {formattedPrice.amount}
        </span>
        <span className="card-period">{period}</span>
      </div>

      <div className="card-features">
        {plan.features.map((feature, index) => (
          <div key={index} className="feature-row">
            <CheckIcon />
            <span className="feature-text">{feature}</span>
          </div>
        ))}
      </div>

      <button 
        className={`card-cta ${plan.isPopular ? 'card-cta-primary' : 'card-cta-default'}`}
      >
        {plan.buttonText || 'Get Started'}
      </button>
    </div>
  );
};

export default PricingCard;
