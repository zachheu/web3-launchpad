import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { TrustScoreRing } from './TrustScoreRing';
import { toast } from '@/hooks/use-toast';

interface AnalysisResult {
  address: string;
  score: number;
  walletAge: string;
  totalTx: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export const AnalyzeWallet = () => {
  const [address, setAddress] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!address) {
      toast({
        title: 'Error',
        description: 'Please enter a wallet address',
        variant: 'destructive',
      });
      return;
    }

    // Basic validation
    if (!address.startsWith('0x') || address.length !== 42) {
      toast({
        title: 'Invalid Address',
        description: 'Please enter a valid Ethereum address',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock result
    setResult({
      address,
      score: Math.floor(Math.random() * 40) + 50, // Random score 50-90
      walletAge: '1.5 years',
      totalTx: Math.floor(Math.random() * 1000) + 100,
      riskLevel: 'low',
    });

    setIsAnalyzing(false);
    toast({
      title: 'Analysis Complete',
      description: 'Wallet trust score calculated successfully',
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="py-12"
    >
      <div className="glass-card p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Analyze Any Wallet
        </h2>
        <p className="text-muted-foreground mb-6">
          Enter any Ethereum address to calculate its trust score
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="0x..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="pl-10 h-12 bg-muted/50 border-border/50 font-mono text-sm"
            />
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            variant="neon"
            size="lg"
            className="min-w-[160px]"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze'
            )}
          </Button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-muted/30 border border-border/50"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <TrustScoreRing score={result.score} size="md" />

              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Address</p>
                  <p className="font-mono text-sm text-foreground">
                    {result.address.slice(0, 10)}...{result.address.slice(-8)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Wallet Age</p>
                  <p className="font-display text-lg font-semibold text-foreground">{result.walletAge}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Transactions</p>
                  <p className="font-display text-lg font-semibold text-foreground">{result.totalTx.toLocaleString()}</p>
                </div>
                <div className="col-span-2 md:col-span-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Risk Assessment</p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-neon-green/20 text-neon-green text-sm font-medium">
                      Low Risk
                    </span>
                    <span className="text-xs text-muted-foreground">
                      This wallet has a clean transaction history
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {!result && !isAnalyzing && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/20 border border-border/30">
            <AlertCircle className="w-5 h-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Enter a wallet address above to analyze its trust score and on-chain reputation
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
};
