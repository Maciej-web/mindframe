import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button-Variante bestimmt primäres Erscheinungsbild
   */
  variant?: 'primary' | 'accent' | 'secondary' | 'outline' | 'ghost';
  
  /**
   * Button-Größe
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Zeigt Ladezustand an
   */
  isLoading?: boolean;
  
  /**
   * Optionales Icon vor dem Text
   */
  startIcon?: React.ReactNode;
  
  /**
   * Optionales Icon nach dem Text
   */
  endIcon?: React.ReactNode;
  
  /**
   * Volle Breite des Containers nutzen
   */
  fullWidth?: boolean;
}

/**
 * Button-Komponente entsprechend des MindFrame Design-Systems
 * 
 * Nutzt unsere Design-Tokens für konsistentes Look & Feel
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  startIcon,
  endIcon,
  fullWidth = false,
  className = '',
  disabled,
  type = 'button',
  ...props
}) => {
  // Basis-Klassen für alle Buttons
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-button transition-button duration-button focus:outline-none';
  
  // Größen-Klassen
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  };
  
  // Varianten-Klassen
  const variantClasses = {
    // Navy-basierte Primärbuttons
    primary: 'bg-primary text-white shadow-button hover:bg-primary-hover hover:shadow-button-hover focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 disabled:bg-primary-100 disabled:text-primary-300 disabled:shadow-none',
    
    // Türkis-basierte Akzentbuttons
    accent: 'bg-accent text-white shadow-button hover:bg-accent-hover hover:shadow-button-hover focus:ring-2 focus:ring-offset-2 focus:ring-accent-300 disabled:bg-accent-100 disabled:text-accent-300 disabled:shadow-none',
    
    // Beige-basierte Sekundärbuttons
    secondary: 'bg-secondary-light text-primary shadow-button hover:bg-secondary hover:shadow-button-hover focus:ring-2 focus:ring-offset-2 focus:ring-secondary-300 disabled:bg-secondary-50 disabled:text-secondary-300 disabled:shadow-none',
    
    // Outline Variante
    outline: 'bg-white border border-primary text-primary shadow-sm hover:bg-primary-50 hover:shadow-button-hover focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 disabled:bg-white disabled:text-primary-200 disabled:border-primary-100 disabled:shadow-none',
    
    // Ghost Variante (transparent)
    ghost: 'bg-transparent text-primary hover:bg-primary-50 focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 disabled:text-primary-200',
  };
  
  // Breiten-Klasse
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Kombination aller Klassen
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {!isLoading && startIcon && <span className="mr-2">{startIcon}</span>}
      
      {children}
      
      {!isLoading && endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;