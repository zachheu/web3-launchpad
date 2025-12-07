import { motion } from 'framer-motion';
import { Check, X, AlertTriangle, Shield, Clock, Users, FileCode, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustFactor {
  id: string;
  label: string;
  status: 'positive' | 'negative' | 'warning';
  description: string;
  icon: React.ReactNode;
  weight: number;
}

const trustFactors: TrustFactor[] = [
  {
    id: 'wallet-age',
    label: 'Wallet Age',
    status: 'positive',
    description: 'Active for over 2 years',
    icon: <Clock className="w-4 h-4" />,
    weight: 15,
  },
  {
    id: 'verified-contracts',
    label: 'Contract Interactions',
    status: 'positive',
    description: 'Primarily interacts with verified contracts',
    icon: <FileCode className="w-4 h-4" />,
    weight: 20,
  },
  {
    id: 'transaction-volume',
    label: 'Transaction Volume',
    status: 'positive',
    description: 'Consistent transaction history',
    icon: <Coins className="w-4 h-4" />,
    weight: 15,
  },
  {
    id: 'ens-identity',
    label: 'ENS Domain',
    status: 'positive',
    description: 'Has registered ENS domain',
    icon: <Users className="w-4 h-4" />,
    weight: 10,
  },
  {
    id: 'nft-holdings',
    label: 'NFT Holdings',
    status: 'warning',
    description: 'Some unverified collections',
    icon: <Shield className="w-4 h-4" />,
    weight: 10,
  },
  {
    id: 'defi-activity',
    label: 'DeFi Activity',
    status: 'positive',
    description: 'Active in major DeFi protocols',
    icon: <Coins className="w-4 h-4" />,
    weight: 20,
  },
];

interface TrustFactorsProps {
  isConnected: boolean;
}

export const TrustFactors = ({ isConnected }: TrustFactorsProps) => {
  if (!isConnected) {
    return null;
  }

  const getStatusIcon = (status: TrustFactor['status']) => {
    switch (status) {
      case 'positive':
        return <Check className="w-4 h-4" />;
      case 'negative':
        return <X className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: TrustFactor['status']) => {
    switch (status) {
      case 'positive':
        return 'text-neon-green bg-neon-green/20 border-neon-green/30';
      case 'negative':
        return 'text-destructive bg-destructive/20 border-destructive/30';
      case 'warning':
        return 'text-neon-orange bg-neon-orange/20 border-neon-orange/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6"
    >
      <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        Trust Factors
      </h3>

      <div className="space-y-3">
        {trustFactors.map((factor, index) => (
          <motion.div
            key={factor.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={cn('p-2 rounded-lg border', getStatusColor(factor.status))}>
                {factor.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{factor.label}</p>
                <p className="text-xs text-muted-foreground">{factor.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-display">+{factor.weight}pts</span>
              <div className={cn('p-1 rounded-full', getStatusColor(factor.status))}>
                {getStatusIcon(factor.status)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
