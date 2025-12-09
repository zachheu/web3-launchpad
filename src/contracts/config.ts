import { polygon } from 'wagmi/chains';

// Contract ABI - generated dari TrustRegistry.sol
export const TRUST_REGISTRY_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'wallet', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'score', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' },
    ],
    name: 'TrustScoreUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'wallet', type: 'address' },
      { indexed: false, internalType: 'bool', name: 'status', type: 'bool' },
    ],
    name: 'WalletVerified',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'address', name: '_wallet', type: 'address' }],
    name: 'getTrustData',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'score', type: 'uint256' },
          { internalType: 'uint256', name: 'lastUpdated', type: 'uint256' },
          { internalType: 'uint256', name: 'totalTx', type: 'uint256' },
          { internalType: 'uint256', name: 'walletAge', type: 'uint256' },
          { internalType: 'bool', name: 'isVerified', type: 'bool' },
        ],
        internalType: 'struct TrustRegistry.TrustData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_wallet', type: 'address' }],
    name: 'getTrustScore',
    outputs: [{ internalType: 'uint256', name: 'score', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalRegistered',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'isRegistered',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_wallet', type: 'address' },
      { internalType: 'uint256', name: '_score', type: 'uint256' },
      { internalType: 'uint256', name: '_totalTx', type: 'uint256' },
      { internalType: 'uint256', name: '_walletAge', type: 'uint256' },
    ],
    name: 'updateTrustScore',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_wallet', type: 'address' },
      { internalType: 'bool', name: '_status', type: 'bool' },
    ],
    name: 'setVerificationStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: '_wallets', type: 'address[]' },
      { internalType: 'uint256[]', name: '_scores', type: 'uint256[]' },
    ],
    name: 'batchUpdateScores',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

// Contract address - GANTI dengan address setelah deploy ke Polygon
// Untuk testing, ini placeholder address
export const TRUST_REGISTRY_ADDRESS = '0x0000000000000000000000000000000000000000' as `0x${string}`;

// Chain config
export const CONTRACT_CHAIN = polygon;

// Deployment instructions
export const DEPLOYMENT_GUIDE = `
## Cara Deploy Smart Contract ke Polygon Mainnet

### Prerequisites:
1. Install Foundry atau Hardhat
2. Siapkan wallet dengan MATIC untuk gas fees
3. Dapatkan RPC URL dari Alchemy/Infura

### Langkah Deploy dengan Foundry:

1. Install Foundry:
   curl -L https://foundry.paradigm.xyz | bash
   foundryup

2. Compile contract:
   forge build

3. Deploy ke Polygon:
   forge create --rpc-url https://polygon-rpc.com \\
     --private-key YOUR_PRIVATE_KEY \\
     src/contracts/TrustRegistry.sol:TrustRegistry

4. Verifikasi di Polygonscan:
   forge verify-contract CONTRACT_ADDRESS \\
     src/contracts/TrustRegistry.sol:TrustRegistry \\
     --chain polygon \\
     --etherscan-api-key YOUR_POLYGONSCAN_API_KEY

5. Update TRUST_REGISTRY_ADDRESS di file ini dengan address hasil deploy

### Estimasi Gas:
- Deployment: ~500,000 gas (~$0.10-0.50 di Polygon)
- Update Trust Score: ~50,000 gas (~$0.01-0.05)
`;
