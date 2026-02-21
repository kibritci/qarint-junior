import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = true, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-gray-100 dark:border-gray-700
        ${hover ? 'hover:shadow-card-hover hover:-translate-y-1 dark:hover:shadow-lg dark:hover:border-gray-600' : ''}
        transition-all duration-300 ease-out
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
