import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input label
   */
  label?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Input is required
   */
  required?: boolean;
  /**
   * Start icon
   */
  startIcon?: React.ReactNode;
  /**
   * End icon
   */
  endIcon?: React.ReactNode;
}

/**
 * Input component for form controls
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      required = false,
      className = '',
      startIcon,
      endIcon,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    // Generate an id if one isn't provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    // Base input classes
    const inputBaseClasses = 'w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500';
    
    // State specific classes
    const inputStateClasses = error
      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
      : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500';
    
    // Icon specific padding
    const iconPaddingClasses = startIcon
      ? 'pl-10'
      : endIcon
      ? 'pr-10'
      : '';
    
    // Disabled state
    const disabledClasses = disabled ? 'bg-neutral-100 cursor-not-allowed' : '';
    
    // Combine all classes
    const inputClasses = `${inputBaseClasses} ${inputStateClasses} ${iconPaddingClasses} ${disabledClasses} ${className}`;
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-neutral-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative rounded-md shadow-sm">
          {startIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-neutral-500 sm:text-sm">{startIcon}</span>
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          
          {endIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-neutral-500 sm:text-sm">{endIcon}</span>
            </div>
          )}
        </div>
        
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-neutral-500">
            {helperText}
          </p>
        )}
        
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;