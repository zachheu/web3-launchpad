import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock, Shield, Zap, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  delay?: number;
  variant?: 'cyan' | 'purple' | 'green' | 'orange';
}

const variantClasses = {
  cyan: 'from-neon-cyan/20 to-transparent border-neon-cyan/30',
  purple: 'from-neon-purple/20 to-transparent border-neon-purple/30',
  green: 'from-neon-green/20 to-transparent border-neon-green/30',
  orange: 'from-neon-orange/20 to-transparent border-neon-orange/30',
};

const iconVariantClasses = {
  cyan: 'text-neon-cyan',
  purple: 'text-neon-purple',
  green: 'text-neon-green',
  orange: 'text-neon-orange',
};

const StatCard = ({ icon, label, value, subValue, delay = 0, variant = 'cyan' }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={cn(
      'glass-card p-4 bg-gradient-to-br border',
      variantClasses[variant]
    )}
  >
    <div className="flex items-start justify-between mb-3">
      <div className={cn('p-2 rounded-lg bg-muted/50', iconVariantClasses[variant])}>
        {icon}
      </div>
    </div>
    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{label}</p>
    <p className="font-display text-xl font-bold text-foreground">{value}</p>
    {subValue && (
      <p className="text-muted-foreground text-xs mt-1">{subValue}</p>
    )}
  </motion.div>
);

interface WalletStatsProps {
  address?: string;
  isConnected: boolean;
}

export const WalletStats = ({ address, isConnected }: WalletStatsProps) => {
  // Mock data - in real app, fetch from blockchain
  const stats = {
    totalTx: '1,247',
    incoming: '892',
    outgoing: '355',
    walletAge: '2.3 years',
    contractInteractions: '156',
    gasSpent: '2.45 ETH',
    uniqueTokens: '23',
    nftCount: '47',
  };

  if (!isConnected) {
    return (
      <div className="glass-card p-8 text-center">
        <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Connect your wallet to view analytics</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<TrendingUp className="w-5 h-5" />}
        label="Total Transactions"
        value={stats.totalTx}
        delay={0.1}
        variant="cyan"
      />
      <StatCard
        icon={<ArrowDownLeft className="w-5 h-5" />}
        label="Incoming Tx"
        value={stats.incoming}
        delay={0.2}
        variant="green"
      />
      <StatCard
        icon={<ArrowUpRight className="w-5 h-5" />}
        label="Outgoing Tx"
        value={stats.outgoing}
        delay={0.3}
        variant="purple"
      />
      <StatCard
        icon={<Clock className="w-5 h-5" />}
        label="Wallet Age"
        value={stats.walletAge}
        delay={0.4}
        variant="cyan"
      />
      <StatCard
        icon={<Shield className="w-5 h-5" />}
        label="Contract Interactions"
        value={stats.contractInteractions}
        subValue="Verified contracts"
        delay={0.5}
        variant="green"
      />
      <StatCard
        icon={<Zap className="w-5 h-5" />}
        label="Gas Spent"
        value={stats.gasSpent}
        subValue="≈ $4,521"
        delay={0.6}
        variant="orange"
      />
      <StatCard
        icon={<Wallet className="w-5 h-5" />}
        label="Unique Tokens"
        value={stats.uniqueTokens}
        delay={0.7}
        variant="purple"
      />
      <StatCard
        icon={<Shield className="w-5 h-5" />}
        label="NFT Holdings"
        value={stats.nftCount}
        delay={0.8}
        variant="cyan"
      />
    </div>
  );
};
