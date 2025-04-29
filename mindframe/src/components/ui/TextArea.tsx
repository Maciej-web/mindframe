import React, { forwardRef } from 'react';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * TextArea label
   */
  label?: string;
  /**
   * Helper text to display below the textarea
   */
  helperText?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * TextArea is required
   */
  required?: boolean;
}

/**
 * TextArea component for multi-line text input
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      error,
      required = false,
      className = '',
      disabled,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    // Generate an id if one isn't provided
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    
    // Base textarea classes
    const textareaBaseClasses = 'block w-full rounded-md shadow-sm';
    
    // State specific classes
    const textareaStateClasses = error
      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
      : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500';
    
    // Disabled state
    const disabledClasses = disabled ? 'bg-neutral-100 cursor-not-allowed' : '';
    
    // Combine all classes
    const textareaClasses = `${textareaBaseClasses} ${textareaStateClasses} ${disabledClasses} ${className}`;
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-neutral-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClasses}
          rows={rows}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="mt-1 text-sm text-neutral-500">
            {helperText}
          </p>
        )}
        
        {error && (
          <p id={`${textareaId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;