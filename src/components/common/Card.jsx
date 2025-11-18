import React from 'react';

const Card = ({
  children,
  hover = false,
  gradient = null,
  padding = 'md',
  className = ''
}) => {
  const baseClasses = 'rounded-2xl';
  const hoverClass = hover ? 'card-hover' : '';

  const gradients = {
    blue: 'bg-gradient-to-br from-blue-50 to-white border border-blue-100',
    green: 'bg-gradient-to-br from-green-50 to-white border border-green-100',
    yellow: 'bg-gradient-to-br from-yellow-50 to-white border border-yellow-100',
    pink: 'bg-gradient-to-br from-pink-50 to-white border border-pink-100',
    indigo: 'bg-gradient-to-br from-indigo-50 to-white border border-indigo-100',
    white: 'bg-white shadow-sm'
  };

  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const gradientClass = gradient ? gradients[gradient] : gradients.white;

  return (
    <div className={`${baseClasses} ${gradientClass} ${paddings[padding]} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
