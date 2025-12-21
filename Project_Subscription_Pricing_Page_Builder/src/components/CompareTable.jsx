import React from 'react';
import { Check, X } from 'lucide-react';
import { formatPrice } from '../utils/currency';

const CompareTable = ({ plans, isYearly, currency }) => {
  // Get all unique features across all plans
  const allFeatures = [...new Set(plans.flatMap(plan => plan.features))].filter(f => f.trim());

  return (
    <div className="compare-table-wrapper">
      <table className="compare-table">
        <thead>
          <tr>
            <th className="feature-header">Features</th>
            {plans.map(plan => (
              <th key={plan.id} className={`plan-header ${plan.isPopular ? 'popular' : ''}`}>
                {plan.isPopular && <span className="table-popular-badge">Most Popular</span>}
                <span className="plan-header-name">{plan.name}</span>
                <span className="plan-header-price">
                  {formatPrice(isYearly ? plan.yearlyPrice : plan.monthlyPrice, currency)}
                  <span className="plan-header-period">/{isYearly ? 'year' : 'mo'}</span>
                </span>
                <button className={`table-cta ${plan.isPopular ? 'primary' : ''}`}>
                  {plan.buttonText || 'Get Started'}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allFeatures.map((feature, index) => (
            <tr key={index} className="feature-row-table">
              <td className="feature-name">{feature}</td>
              {plans.map(plan => (
                <td key={plan.id} className={`feature-check ${plan.isPopular ? 'popular' : ''}`}>
                  {plan.features.includes(feature) ? (
                    <span className="check-icon">
                      <Check size={20} />
                    </span>
                  ) : (
                    <span className="x-icon">
                      <X size={20} />
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
