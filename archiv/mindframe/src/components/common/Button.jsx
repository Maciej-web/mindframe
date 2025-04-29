const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    className = '', 
    onClick,
    ...props 
  }) => {
    const variants = {
      primary: 'bg-primary-600 hover:bg-primary-700 text-white',
      secondary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
      outline: 'bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50',
    };
  
    const sizes = {
      sm: 'py-1 px-3 text-sm',
      md: 'py-2 px-4 text-sm',
      lg: 'py-3 px-6 text-base',
    };
  
    return (
      <button
        className={`font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
          ${variants[variant]} 
          ${sizes[size]} 
          ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;