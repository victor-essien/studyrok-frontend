import React from 'react'
import {Loader2} from 'lucide-react'
import type { ButtonProps } from './Button.types'



const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled = false,
  className = '',
  ...props
}) => {
 
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    const variantStyles = {
         primary: 'bg-[#1E1B4B] text-white hover:bg-[#2d2865] focus:ring-[#1E1B4B]',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400',
    outline: 'border-2 border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-50 focus:ring-gray-400',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
    google: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-400'
    }

     const sizeStyles = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-3'
  };
   const widthStyles = fullWidth ? 'w-full' : '';
     
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="flex items-center">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex items-center">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}

export default Button;