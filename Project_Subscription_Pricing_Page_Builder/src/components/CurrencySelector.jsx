import React, { useState, useRef, useEffect } from 'react';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE' },
  { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' }
];

const CurrencySelector = ({ selectedCurrency, onCurrencyChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentCurrency = currencies.find(c => c.code === selectedCurrency) || currencies[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (currency) => {
    onCurrencyChange(currency.code);
    setIsOpen(false);
  };

  return (
    <div className="currency-selector" ref={dropdownRef}>
      <button 
        className="currency-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="currency-symbol">{currentCurrency.symbol}</span>
        <span className="currency-code">{currentCurrency.code}</span>
        <svg 
          className={`currency-chevron ${isOpen ? 'open' : ''}`}
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="none"
        >
          <path 
            d="M3 4.5L6 7.5L9 4.5" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="currency-dropdown" role="listbox">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              className={`currency-option ${currency.code === selectedCurrency ? 'selected' : ''}`}
              onClick={() => handleSelect(currency)}
              role="option"
              aria-selected={currency.code === selectedCurrency}
            >
              <span className="currency-option-symbol">{currency.symbol}</span>
              <div className="currency-option-info">
                <span className="currency-option-code">{currency.code}</span>
                <span className="currency-option-name">{currency.name}</span>
              </div>
              {currency.code === selectedCurrency && (
                <svg className="currency-check" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
