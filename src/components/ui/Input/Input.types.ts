import type { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> { 

    label?: string;
    error?:string;
    helperText?:string;
    leftIcon?:ReactNode;
    rightIcon?:ReactNode;
    placeholder?:string;
    fullWidth?:boolean;
     inputSize?: 'sm' | 'md' | 'lg';
     required?: boolean;
     className?: string;
     disabled?:boolean

}