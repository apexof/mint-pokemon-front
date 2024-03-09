import { ChainId } from '@/entities/Chain/const/supportedChains'
import { polygonMumbai, sepolia } from 'viem/chains'

export const OPEN_SEA_CHAIN_NAME: Record<ChainId, string> = {
  [polygonMumbai.id]: 'mumbai',
  [sepolia.id]: 'sepolia',
}
