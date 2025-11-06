import type { ReactNode } from 'react';

export interface DropdownOption {
  value: string | number;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {

  options: DropdownOption[];
  

  value?: string | number;
  
 
  onChange: (value: string | number) => void;
  
  
  placeholder?: string;
  
  
  label?: string;
  
  
  error?: string;
  
  
  disabled?: boolean;
  
 
  fullWidth?: boolean;
  
  
  size?: 'sm' | 'md' | 'lg';
}