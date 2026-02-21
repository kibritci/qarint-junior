interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'green' | 'blue' | 'orange';
  showLabel?: boolean;
  className?: string;
}

const colorMap = {
  primary: 'from-primary-400 to-primary',
  green: 'from-green-400 to-emerald-500',
  blue: 'from-blue-400 to-blue-500',
  orange: 'from-orange-400 to-orange-500',
};

const sizeMap = {
  sm: 'h-1.5',
  md: 'h-3',
  lg: 'h-4',
};

export default function ProgressBar({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = false,
  className = '',
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{Math.round(percent)}%</span>
        </div>
      )}
      <div className={`${sizeMap[size]} bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden`}>
        <div
          className={`h-full bg-gradient-to-r ${colorMap[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
