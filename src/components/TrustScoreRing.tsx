import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TrustScoreRingProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-24 h-24',
  md: 'w-40 h-40',
  lg: 'w-56 h-56',
};

const strokeWidths = {
  sm: 6,
  md: 8,
  lg: 10,
};

const fontSizes = {
  sm: 'text-xl',
  md: 'text-3xl',
  lg: 'text-5xl',
};

export const TrustScoreRing = ({ score, size = 'md', className }: TrustScoreRingProps) => {
  const normalizedScore = Math.min(100, Math.max(0, score));
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;
  
  const getScoreColor = () => {
    if (normalizedScore >= 80) return 'hsl(var(--neon-green))';
    if (normalizedScore >= 60) return 'hsl(var(--neon-cyan))';
    if (normalizedScore >= 40) return 'hsl(var(--neon-orange))';
    return 'hsl(var(--destructive))';
  };

  const getScoreLabel = () => {
    if (normalizedScore >= 80) return 'Excellent';
    if (normalizedScore >= 60) return 'Good';
    if (normalizedScore >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className={cn('relative flex items-center justify-center', sizeClasses[size], className)}>
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-xl opacity-30"
        style={{ backgroundColor: getScoreColor() }}
      />
      
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidths[size]}
          className="opacity-30"
        />
        
        {/* Score circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={getScoreColor()}
          strokeWidth={strokeWidths[size]}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            filter: `drop-shadow(0 0 10px ${getScoreColor()})`,
          }}
        />
      </svg>
      
      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className={cn('font-display font-bold', fontSizes[size])}
          style={{ color: getScoreColor() }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {normalizedScore}
        </motion.span>
        <motion.span
          className="text-muted-foreground text-xs uppercase tracking-wider mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {getScoreLabel()}
        </motion.span>
      </div>
    </div>
  );
};
