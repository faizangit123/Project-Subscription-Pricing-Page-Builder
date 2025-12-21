// LocalStorage utilities for pricing plans

const STORAGE_KEY = 'pricing_plans_data';

export const defaultPlans = [
  {
    id: '1',
    name: 'Starter',
    description: 'Perfect for individuals and small projects',
    monthlyPrice: 9,
    yearlyPrice: 99,
    features: [
      '5 Projects',
      '10GB Storage',
      'Basic Analytics',
      'Email Support',
      'API Access'
    ],
    buttonText: 'Get Started',
    isPopular: false
  },
  {
    id: '2',
    name: 'Professional',
    description: 'Best for growing teams and businesses',
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      'Unlimited Projects',
      '100GB Storage',
      'Advanced Analytics',
      'Priority Support',
      'API Access',
      'Team Collaboration',
      'Custom Integrations'
    ],
    buttonText: 'Start Free Trial',
    isPopular: true
  },
  {
    id: '3',
    name: 'Enterprise',
    description: 'For large organizations with custom needs',
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      'Everything in Pro',
      'Unlimited Storage',
      'Custom Analytics',
      '24/7 Phone Support',
      'Dedicated Manager',
      'SLA Guarantee',
      'Custom Contracts',
      'On-premise Option'
    ],
    buttonText: 'Contact Sales',
    isPopular: false
  }
];

export const savePlans = (plans) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
    return true;
  } catch (error) {
    console.error('Error saving plans:', error);
    return false;
  }
};

export const loadPlans = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return defaultPlans;
  } catch (error) {
    console.error('Error loading plans:', error);
    return defaultPlans;
  }
};

export const resetPlans = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return defaultPlans;
  } catch (error) {
    console.error('Error resetting plans:', error);
    return defaultPlans;
  }
};

export const exportPlans = (plans) => {
  const dataStr = JSON.stringify(plans, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'pricing-plans.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
