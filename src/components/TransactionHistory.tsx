import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Transaction {
  hash: string;
  type: 'in' | 'out';
  amount: string;
  token: string;
  from: string;
  to: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
}

const mockTransactions: Transaction[] = [
  {
    hash: '0x1234...5678',
    type: 'in',
    amount: '0.5',
    token: 'ETH',
    from: '0xabcd...efgh',
    to: '0x1234...5678',
    timestamp: '2 hours ago',
    status: 'success',
  },
  {
    hash: '0x2345...6789',
    type: 'out',
    amount: '100',
    token: 'USDC',
    from: '0x1234...5678',
    to: '0xijkl...mnop',
    timestamp: '5 hours ago',
    status: 'success',
  },
  {
    hash: '0x3456...7890',
    type: 'in',
    amount: '250',
    token: 'MATIC',
    from: '0xqrst...uvwx',
    to: '0x1234...5678',
    timestamp: '1 day ago',
    status: 'success',
  },
  {
    hash: '0x4567...8901',
    type: 'out',
    amount: '0.1',
    token: 'ETH',
    from: '0x1234...5678',
    to: '0xyzab...cdef',
    timestamp: '2 days ago',
    status: 'pending',
  },
  {
    hash: '0x5678...9012',
    type: 'in',
    amount: '1.2',
    token: 'ETH',
    from: '0xghij...klmn',
    to: '0x1234...5678',
    timestamp: '3 days ago',
    status: 'success',
  },
];

interface TransactionHistoryProps {
  isConnected: boolean;
}

export const TransactionHistory = ({ isConnected }: TransactionHistoryProps) => {
  if (!isConnected) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-6"
    >
      <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        Recent Transactions
      </h3>

      <div className="space-y-3">
        {mockTransactions.map((tx, index) => (
          <motion.div
            key={tx.hash}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'p-2 rounded-lg',
                  tx.type === 'in'
                    ? 'bg-neon-green/20 text-neon-green'
                    : 'bg-neon-purple/20 text-neon-purple'
                )}
              >
                {tx.type === 'in' ? (
                  <ArrowDownLeft className="w-4 h-4" />
                ) : (
                  <ArrowUpRight className="w-4 h-4" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {tx.type === 'in' ? 'Received' : 'Sent'} {tx.amount} {tx.token}
                </p>
                <p className="text-xs text-muted-foreground">
                  {tx.type === 'in' ? `From ${tx.from}` : `To ${tx.to}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
                <span
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full',
                    tx.status === 'success' && 'bg-neon-green/20 text-neon-green',
                    tx.status === 'pending' && 'bg-neon-orange/20 text-neon-orange',
                    tx.status === 'failed' && 'bg-destructive/20 text-destructive'
                  )}
                >
                  {tx.status}
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-primary" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
