import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'font-bold rounded-full transition-all';

  const variants = {
    primary: 'bg-primary text-white hover:opacity-90',
    secondary: 'bg-transparent border-2 border-white text-white hover:bg-white/10',
    white: 'bg-white text-blue-900 hover:bg-gray-100',
    yellow: 'bg-yellow-400 text-gray-900 hover:bg-yellow-300',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
