import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  color?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  action,
  color = 'primary',
  className = '',
}) => {
  // Farbzuordnungen für verschiedene Module
  const colorStyles = {
    primary: 'border-t-primary',
    purple: 'border-t-accent-purple',
    pink: 'border-t-accent-pink',
    orange: 'border-t-accent-orange',
    blue: 'border-t-accent-blue',
  };

  // Farbe des Icons
  const iconColorStyles = {
    primary: 'text-primary',
    purple: 'text-accent-purple',
    pink: 'text-accent-pink',
    orange: 'text-accent-orange',
    blue: 'text-accent-blue',
  };

  return (
    <div 
      className={`
        bg-white rounded-card shadow-card hover:shadow-card-hover 
        transition-card duration-200 p-6 border-t-4 h-full
        flex flex-col
        ${colorStyles[color as keyof typeof colorStyles]} ${className}
        hover:translate-y-[-4px]
      `}
    >
      {/* Icon */}
      {icon && (
        <div className={`mb-4 ${iconColorStyles[color as keyof typeof iconColorStyles]}`}>
          {icon}
        </div>
      )}
      
      {/* Content */}
      <div className="space-y-2 flex-grow">
        <h3 className="text-xl font-semibold text-navy-900">{title}</h3>
        <p className="text-navy-600">{description}</p>
      </div>
      
      {/* Action (Button etc.) */}
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};

export default Card;