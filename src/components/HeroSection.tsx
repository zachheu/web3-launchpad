import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { TrustScoreRing } from './TrustScoreRing';
import { Shield, Sparkles, Activity } from 'lucide-react';

export const HeroSection = () => {
  const { address, isConnected } = useAccount();

  // Mock trust score - in real app, calculate from blockchain data
  const trustScore = isConnected ? 78 : 0;

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Web3 Trust Analytics</span>
            </motion.div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Verify Wallet
              <br />
              <span className="gradient-text">Trust Score</span>
            </h1>

            <p className="text-muted-foreground text-lg max-w-lg mb-8">
              Analyze any wallet's on-chain reputation before transacting. 
              Get detailed insights on transaction history, contract interactions, and more.
            </p>

            {isConnected && address && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 p-4 glass-card rounded-xl max-w-md"
              >
                <div className="p-3 rounded-lg bg-primary/20">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Connected Wallet</p>
                  <p className="font-mono text-foreground">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2 text-neon-green">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-sm">Live</span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right content - Trust Score Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute inset-0 scale-125">
                <div className="absolute inset-0 border border-primary/20 rounded-full animate-spin-slow" />
                <div className="absolute inset-4 border border-secondary/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />
              </div>
              
              <TrustScoreRing 
                score={trustScore} 
                size="lg"
                className="animate-float"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
