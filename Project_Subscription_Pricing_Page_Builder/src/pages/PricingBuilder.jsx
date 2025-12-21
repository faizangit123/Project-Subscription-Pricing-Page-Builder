import React, { useState, useEffect } from 'react';
import PreviewPanel from '../components/PreviewPanel';
import PricingForm from '../components/PricingForm';
import ThemeToggle from '../components/ThemeToggle';
import { 
  loadPlans, 
  savePlans, 
  resetPlans, 
  exportPlans, 
  generateId 
} from '../utils/storage';
import '../styles/global.css';
import '../styles/builder.css';
import '../styles/pricing.css';

const PricingBuilder = () => {
  const [plans, setPlans] = useState([]);
  const [isYearly, setIsYearly] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [editingPlan, setEditingPlan] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [theme, setTheme] = useState('light');

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  const savedPlans = loadPlans();
  setPlans(savedPlans);
    
    // Load saved currency preference
    const savedCurrency = localStorage.getItem('pricing_currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('pricing_theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Auto-save plans when they change
  useEffect(() => {
    if (plans.length > 0) {
      savePlans(plans);
    }
  }, [plans]);

  // Save currency preference
  useEffect(() => {
    localStorage.setItem('pricing_currency', currency);
  }, [currency]);

  // Handle theme changes
  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('pricing_theme', newTheme);
  };

  const handleToggleBilling = () => {
    setIsYearly(!isYearly);
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const handleAddPlan = () => {
    setEditingPlan(null);
    setIsFormOpen(true);
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setIsFormOpen(true);
  };

  const handleDeletePlan = (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setPlans(plans.filter(p => p.id !== planId));
    }
  };

  const handleSavePlan = (planData) => {
    if (editingPlan) {
      // Update existing plan
      setPlans(plans.map(p => 
        p.id === editingPlan.id ? { ...planData, id: editingPlan.id } : p
      ));
    } else {
      // Add new plan
      setPlans([...plans, { ...planData, id: generateId() }]);
    }
    setIsFormOpen(false);
    setEditingPlan(null);
    showSaveStatus('Plan saved!');
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingPlan(null);
  };

  const handleReset = () => {
    if (window.confirm('Reset to default plans? This will delete your custom plans.')) {
      const defaultData = resetPlans();
      setPlans(defaultData);
      showSaveStatus('Reset to defaults!');
    }
  };

  const handleExport = () => {
    exportPlans(plans);
    showSaveStatus('Exported!');
  };

  const handleSave = () => {
    savePlans(plans);
    showSaveStatus('Saved!');
  };

  const showSaveStatus = (message) => {
    setSaveStatus(message);
    setTimeout(() => setSaveStatus(''), 2000);
  };

  return (
    <div className="pricing-builder">
      <header className="builder-header">
        <div className="header-title">
          <div className="header-icon">💎</div>
          <h1>Pricing Builder</h1>
        </div>
        <div className="header-actions">
          {saveStatus && (
            <span style={{ 
              color: '#10b981', 
              fontSize: '0.875rem', 
              fontWeight: 500,
              marginRight: 8 
            }}>
              ✓ {saveStatus}
            </span>
          )}
          <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
          <button className="btn btn-secondary" onClick={handleExport}>
            📤 Export
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            🔄 Reset
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            💾 Save
          </button>
        </div>
      </header>

      <div className="builder-content">
        <aside className="builder-sidebar">
          {isFormOpen ? (
            <div className="sidebar-section">
              <h3 className="sidebar-section-title">
                {editingPlan ? 'Edit Plan' : 'New Plan'}
              </h3>
              <PricingForm
                plan={editingPlan}
                onSave={handleSavePlan}
                onCancel={handleCancelForm}
              />
            </div>
          ) : (
            <>
              <div className="sidebar-section">
                <h3 className="sidebar-section-title">Your Plans</h3>
                <div className="plan-list">
                  {plans.map((plan) => (
                    <div key={plan.id} className="plan-item">
                      <div className="plan-item-header">
                        <span className="plan-item-name">{plan.name}</span>
                        {plan.isPopular && (
                          <span className="plan-item-badge">Popular</span>
                        )}
                      </div>
                      <div className="plan-item-price">
                        ${plan.monthlyPrice}/mo
                      </div>
                      <div className="plan-item-actions">
                        <button 
                          className="btn-edit"
                          onClick={() => handleEditPlan(plan)}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          className="btn-delete"
                          onClick={() => handleDeletePlan(plan.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="add-plan-btn" onClick={handleAddPlan}>
                ➕ Add New Plan
              </button>
            </>
          )}
        </aside>

        <PreviewPanel 
          plans={plans}
          isYearly={isYearly}
          onToggleBilling={handleToggleBilling}
          currency={currency}
          onCurrencyChange={handleCurrencyChange}
        />
      </div>
    </div>
  );
};

export default PricingBuilder;
