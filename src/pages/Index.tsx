import { useAccount } from 'wagmi';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { WalletStats } from '@/components/WalletStats';
import { TrustFactors } from '@/components/TrustFactors';
import { TransactionHistory } from '@/components/TransactionHistory';
import { AnalyzeWallet } from '@/components/AnalyzeWallet';
import { Footer } from '@/components/Footer';

const Index = () => {
  const { address, isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pb-12">
        <HeroSection />
        
        {/* Dashboard Grid */}
        <section className="py-12">
          <WalletStats address={address} isConnected={isConnected} />
        </section>

        {/* Trust Factors & Transactions */}
        <section className="grid lg:grid-cols-2 gap-6 py-6">
          <TrustFactors isConnected={isConnected} />
          <TransactionHistory isConnected={isConnected} />
        </section>

        {/* Analyze Other Wallets */}
        <AnalyzeWallet />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
