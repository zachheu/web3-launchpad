import { useAccount } from 'wagmi';
import { useTrustData, useContractStatus } from '@/hooks/useTrustRegistry';
import { Card } from '@/components/ui/card';
import { TrustScoreRing } from './TrustScoreRing';
import { Shield, Clock, Activity, CheckCircle2, XCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function OnChainTrustScore() {
  const { address, isConnected } = useAccount();
  const { isDeployed } = useContractStatus();
  const { trustData, isLoading, error } = useTrustData(address as `0x${string}`);

  if (!isConnected) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">Connect wallet untuk melihat on-chain trust score</p>
      </Card>
    );
  }

  if (!isDeployed) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-2">
          <Shield className="w-12 h-12 mx-auto text-muted-foreground/50" />
          <p className="text-muted-foreground">
            On-chain trust score akan tersedia setelah contract di-deploy
          </p>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-6">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="space-y-3 flex-1">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border-destructive/50">
        <p className="text-destructive text-sm">Error: {error.message}</p>
      </Card>
    );
  }

  if (!trustData || trustData.score === 0) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-2">
          <Shield className="w-12 h-12 mx-auto text-muted-foreground/50" />
          <p className="font-medium">Wallet Belum Terdaftar</p>
          <p className="text-sm text-muted-foreground">
            Trust score untuk wallet ini belum tercatat di blockchain
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <TrustScoreRing score={trustData.score} size="lg" />
          {trustData.isVerified && (
            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 justify-center md:justify-start">
              On-Chain Trust Score
              {trustData.isVerified ? (
                <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              ) : (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                  Unverified
                </span>
              )}
            </h3>
            <p className="text-sm text-muted-foreground">
              Data tersimpan di Polygon blockchain
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <Activity className="w-4 h-4 mx-auto text-primary" />
              <p className="text-lg font-semibold">{trustData.totalTx}</p>
              <p className="text-xs text-muted-foreground">Transactions</p>
            </div>
            <div className="space-y-1">
              <Clock className="w-4 h-4 mx-auto text-primary" />
              <p className="text-lg font-semibold">{trustData.walletAge}</p>
              <p className="text-xs text-muted-foreground">Days Old</p>
            </div>
            <div className="space-y-1">
              {trustData.isVerified ? (
                <CheckCircle2 className="w-4 h-4 mx-auto text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 mx-auto text-muted-foreground" />
              )}
              <p className="text-lg font-semibold">{trustData.isVerified ? 'Yes' : 'No'}</p>
              <p className="text-xs text-muted-foreground">Verified</p>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Last updated: {trustData.lastUpdated.toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </Card>
  );
}
