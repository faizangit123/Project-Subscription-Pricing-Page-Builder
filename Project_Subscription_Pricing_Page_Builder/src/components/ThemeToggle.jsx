import React from 'react';

const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button 
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="theme-toggle-track">
        <span className="theme-icon sun">☀️</span>
        <span className="theme-icon moon">🌙</span>
        <div className={`theme-toggle-thumb ${theme}`} />
      </div>
    </button>
  );
};

export default ThemeToggle;
