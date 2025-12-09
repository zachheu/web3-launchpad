import { useContractStatus, useTotalRegistered } from '@/hooks/useTrustRegistry';
import { AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ContractStatus() {
  const { isDeployed, address, chain } = useContractStatus();
  const { total } = useTotalRegistered();

  if (!isDeployed) {
    return (
      <Card className="p-4 border-yellow-500/50 bg-yellow-500/10">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-medium text-yellow-500">Smart Contract Belum Di-deploy</h4>
            <p className="text-sm text-muted-foreground">
              Contract TrustRegistry perlu di-deploy ke {chain.name} terlebih dahulu.
              Lihat file <code className="text-xs bg-muted px-1 py-0.5 rounded">src/contracts/config.ts</code> untuk panduan deployment.
            </p>
            <div className="pt-2">
              <Button variant="outline" size="sm" asChild>
                <a 
                  href="https://book.getfoundry.sh/getting-started/installation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Foundry Docs
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 border-green-500/50 bg-green-500/10">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-medium text-green-500">Contract Aktif</h4>
          <p className="text-sm text-muted-foreground">
            TrustRegistry deployed di {chain.name}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
            <span>Address: {address.slice(0, 6)}...{address.slice(-4)}</span>
            <span>Total Registered: {total}</span>
          </div>
          <Button variant="ghost" size="sm" asChild className="mt-2 h-7 px-2">
            <a 
              href={`https://polygonscan.com/address/${address}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs"
            >
              <ExternalLink className="w-3 h-3" />
              View on Polygonscan
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
