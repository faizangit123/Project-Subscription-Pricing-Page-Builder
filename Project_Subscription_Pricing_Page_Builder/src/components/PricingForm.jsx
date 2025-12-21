import React, { useState, useEffect } from 'react';
import FeatureList from './FeatureList';

const PricingForm = ({ plan, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [''],
    buttonText: 'Get Started',
    isPopular: false
  });

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  if (plan) {
    setFormData(plan);
  }
}, [plan]);


  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleFeaturesChange = (features) => {
    setFormData(prev => ({ ...prev, features }));
  };

  const handlePopularToggle = () => {
    setFormData(prev => ({ ...prev, isPopular: !prev.isPopular }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out empty features
    const cleanedData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== '')
    };
    onSave(cleanedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Plan Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., Professional"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-input"
          placeholder="Brief plan description"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Monthly Price ($)</label>
          <input
            type="number"
            name="monthlyPrice"
            value={formData.monthlyPrice}
            onChange={handleChange}
            className="form-input"
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Yearly Price ($)</label>
          <input
            type="number"
            name="yearlyPrice"
            value={formData.yearlyPrice}
            onChange={handleChange}
            className="form-input"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <FeatureList 
        features={formData.features} 
        onChange={handleFeaturesChange} 
      />

      <div className="form-group">
        <label className="form-label">Button Text</label>
        <input
          type="text"
          name="buttonText"
          value={formData.buttonText}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., Get Started"
        />
      </div>

      <div className="form-group">
        <div 
          className="checkbox-wrapper"
          onClick={handlePopularToggle}
        >
          <div className={`checkbox ${formData.isPopular ? 'checked' : ''}`}>
            {formData.isPopular && '✓'}
          </div>
          <span className="checkbox-label">Mark as Popular / Highlighted</span>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-save">
          {plan ? 'Update Plan' : 'Create Plan'}
        </button>
      </div>
    </form>
  );
};

export default PricingForm;
