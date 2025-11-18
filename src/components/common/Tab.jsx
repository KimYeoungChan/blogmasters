import React from 'react';

const Tab = ({ tabs, activeTab, onTabChange, className = '' }) => {
  return (
    <div className={`inline-flex bg-gray-100 rounded-full p-1 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-8 py-3 rounded-full font-semibold transition ${
            activeTab === tab.id
              ? 'bg-primary text-white shadow-lg'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tab;
