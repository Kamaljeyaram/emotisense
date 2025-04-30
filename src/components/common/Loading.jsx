import React from 'react';

const Loading = ({ size = 'md', color = 'primary', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const colorClasses = {
    primary: 'border-primary-500',
    secondary: 'border-secondary-500',
    white: 'border-white',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizeClasses[size]} rounded-full border-t-4 ${colorClasses[color]} border-solid animate-spin`}></div>
      {text && <div className="text-gray-600 font-medium">{text}</div>}
    </div>
  );
};

export default Loading;