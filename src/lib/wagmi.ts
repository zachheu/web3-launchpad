import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Web3 Trust Score',
  projectId: 'demo-project-id',
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: false,
});
