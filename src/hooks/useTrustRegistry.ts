import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { TRUST_REGISTRY_ABI, TRUST_REGISTRY_ADDRESS, CONTRACT_CHAIN } from '@/contracts/config';

export interface TrustData {
  score: bigint;
  lastUpdated: bigint;
  totalTx: bigint;
  walletAge: bigint;
  isVerified: boolean;
}

/**
 * Hook untuk membaca trust score dari smart contract
 */
export function useTrustScore(walletAddress: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: TRUST_REGISTRY_ADDRESS,
    abi: TRUST_REGISTRY_ABI,
    functionName: 'getTrustScore',
    args: walletAddress ? [walletAddress] : undefined,
    chainId: CONTRACT_CHAIN.id,
    query: {
      enabled: !!walletAddress && TRUST_REGISTRY_ADDRESS !== '0x0000000000000000000000000000000000000000',
    },
  });

  return {
    score: data ? Number(data) : null,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook untuk membaca semua data trust dari smart contract
 */
export function useTrustData(walletAddress: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: TRUST_REGISTRY_ADDRESS,
    abi: TRUST_REGISTRY_ABI,
    functionName: 'getTrustData',
    args: walletAddress ? [walletAddress] : undefined,
    chainId: CONTRACT_CHAIN.id,
    query: {
      enabled: !!walletAddress && TRUST_REGISTRY_ADDRESS !== '0x0000000000000000000000000000000000000000',
    },
  });

  const trustData = data as TrustData | undefined;

  return {
    trustData: trustData ? {
      score: Number(trustData.score),
      lastUpdated: new Date(Number(trustData.lastUpdated) * 1000),
      totalTx: Number(trustData.totalTx),
      walletAge: Number(trustData.walletAge),
      isVerified: trustData.isVerified,
    } : null,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook untuk cek apakah wallet sudah terdaftar
 */
export function useIsRegistered(walletAddress: `0x${string}` | undefined) {
  const { data, isLoading } = useReadContract({
    address: TRUST_REGISTRY_ADDRESS,
    abi: TRUST_REGISTRY_ABI,
    functionName: 'isRegistered',
    args: walletAddress ? [walletAddress] : undefined,
    chainId: CONTRACT_CHAIN.id,
    query: {
      enabled: !!walletAddress && TRUST_REGISTRY_ADDRESS !== '0x0000000000000000000000000000000000000000',
    },
  });

  return {
    isRegistered: data ?? false,
    isLoading,
  };
}

/**
 * Hook untuk update trust score (hanya owner)
 */
export function useUpdateTrustScore() {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const updateScore = (
    wallet: `0x${string}`,
    score: number,
    totalTx: number,
    walletAge: number
  ) => {
    if (!address) return;
    
    writeContract({
      abi: TRUST_REGISTRY_ABI,
      address: TRUST_REGISTRY_ADDRESS,
      functionName: 'updateTrustScore',
      args: [wallet, BigInt(score), BigInt(totalTx), BigInt(walletAge)],
      account: address,
      chain: CONTRACT_CHAIN,
    });
  };

  return {
    updateScore,
    isPending,
    isConfirming,
    isSuccess,
    error,
    txHash: hash,
  };
}

/**
 * Hook untuk mendapatkan total wallet terdaftar
 */
export function useTotalRegistered() {
  const { data, isLoading } = useReadContract({
    address: TRUST_REGISTRY_ADDRESS,
    abi: TRUST_REGISTRY_ABI,
    functionName: 'getTotalRegistered',
    chainId: CONTRACT_CHAIN.id,
    query: {
      enabled: TRUST_REGISTRY_ADDRESS !== '0x0000000000000000000000000000000000000000',
    },
  });

  return {
    total: data ? Number(data) : 0,
    isLoading,
  };
}

/**
 * Check if contract is deployed
 */
export function useContractStatus() {
  const isDeployed = TRUST_REGISTRY_ADDRESS !== '0x0000000000000000000000000000000000000000';
  
  return {
    isDeployed,
    address: TRUST_REGISTRY_ADDRESS,
    chain: CONTRACT_CHAIN,
  };
}
