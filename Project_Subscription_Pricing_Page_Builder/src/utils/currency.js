// Currency formatting utilities

export const currencies = {
  USD: { symbol: '$', locale: 'en-US', position: 'before' },
  EUR: { symbol: '€', locale: 'de-DE', position: 'after' },
  GBP: { symbol: '£', locale: 'en-GB', position: 'before' },
  INR: { symbol: '₹', locale: 'en-IN', position: 'before' }
};

// Exchange rates relative to USD (approximate)
export const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.12
};

export const formatPrice = (priceInUSD, currencyCode) => {
  const currency = currencies[currencyCode] || currencies.USD;
  const rate = exchangeRates[currencyCode] || 1;
  const convertedPrice = Math.round(priceInUSD * rate);
  
  // Format with locale-specific number formatting
  const formattedNumber = new Intl.NumberFormat(currency.locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(convertedPrice);
  
  return {
    symbol: currency.symbol,
    amount: formattedNumber,
    full: currency.position === 'before' 
      ? `${currency.symbol}${formattedNumber}`
      : `${formattedNumber}${currency.symbol}`
  };
};

export const getCurrencySymbol = (currencyCode) => {
  return currencies[currencyCode]?.symbol || '$';
};
