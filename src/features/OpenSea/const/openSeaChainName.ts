import { ChainId } from '@/entities/Chain/const/supportedChains'
import { polygon, polygonMumbai, sepolia } from 'viem/chains'

export const OPEN_SEA_CHAIN_NAME: Record<ChainId, string> = {
  [polygon.id]: 'matic',
  [polygonMumbai.id]: 'mumbai',
  [sepolia.id]: 'sepolia',
}
