import React from 'react';
import { BADGES } from '../../data/constants';

const Badge = ({ type, size = 'md', showName = true, className = '' }) => {
  const badge = BADGES.find(b => b.id === type);

  if (!badge) return null;

  const sizes = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-1',
    lg: 'text-lg px-4 py-2'
  };

  return (
    <span className={`inline-flex items-center gap-1 ${badge.class} rounded-full font-semibold ${sizes[size]} ${className}`}>
      <span>{badge.emoji}</span>
      {showName && <span>{badge.name}</span>}
    </span>
  );
};

export default Badge;
