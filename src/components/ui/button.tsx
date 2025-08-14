import React from 'react';

// Defina as propriedades do botão
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost';
}

// Componente Button
export const Button: React.FC<ButtonProps> = ({ variant = 'default', children, ...props }) => {
  // Classe CSS com base no tipo de variante
  const className = variant === 'ghost' 
    ? 'bg-transparent border border-slate-300 hover:bg-slate-200 dark:border-slate-600 dark:hover:bg-slate-700'
    : 'bg-indigo-600 text-white hover:bg-indigo-700';

  return (
    <button className={`py-2 px-4 rounded ${className}`} {...props}>
      {children}
    </button>
  );
};