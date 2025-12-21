import React from 'react';
import { LayoutGrid, Table } from 'lucide-react';

const ViewToggle = ({ view, onToggle }) => {
  return (
    <div className="view-toggle">
      <button 
        className={`view-toggle-btn ${view === 'cards' ? 'active' : ''}`}
        onClick={() => onToggle('cards')}
        aria-label="Card view"
      >
        <LayoutGrid size={18} />
        <span>Cards</span>
      </button>
      <button 
        className={`view-toggle-btn ${view === 'table' ? 'active' : ''}`}
        onClick={() => onToggle('table')}
        aria-label="Table view"
      >
        <Table size={18} />
        <span>Compare</span>
      </button>
    </div>
  );
};

export default ViewToggle;
