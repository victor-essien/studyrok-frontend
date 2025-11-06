import type { ButtonHTMLAttributes, ReactNode } from "react";


export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'google';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string
    children: ReactNode;
    isLoading?: boolean;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    disabled?: boolean
}