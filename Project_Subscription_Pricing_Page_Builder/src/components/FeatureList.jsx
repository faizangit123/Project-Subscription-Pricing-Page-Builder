import React from 'react';

const FeatureList = ({ features, onChange }) => {
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    onChange(newFeatures);
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    onChange(newFeatures);
  };

  const handleAddFeature = () => {
    onChange([...features, '']);
  };

  return (
    <div className="form-group">
      <label className="form-label">Features</label>
      <div className="feature-list">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <input
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              placeholder={`Feature ${index + 1}`}
            />
            <button
              type="button"
              className="feature-remove-btn"
              onClick={() => handleRemoveFeature(index)}
              aria-label="Remove feature"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-feature-btn"
          onClick={handleAddFeature}
        >
          + Add Feature
        </button>
      </div>
    </div>
  );
};

export default FeatureList;
