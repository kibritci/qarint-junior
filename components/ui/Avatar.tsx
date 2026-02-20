'use client';

interface AvatarProps {
  emoji: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-lg',
  lg: 'w-14 h-14 text-2xl',
  xl: 'w-20 h-20 text-4xl',
};

export default function Avatar({ emoji, size = 'md', selected = false, onClick, className = '' }: AvatarProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${sizeMap[size]} rounded-full flex items-center justify-center
        transition-all duration-300 ease-out
        ${selected
          ? 'bg-primary-100 ring-3 ring-primary ring-offset-2 scale-110'
          : 'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary-50 hover:to-primary-100 hover:scale-105'
        }
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <span>{emoji}</span>
    </button>
  );
}
