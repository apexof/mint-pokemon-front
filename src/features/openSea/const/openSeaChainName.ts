import { polygonMumbai, sepolia } from 'viem/chains'

export const OPEN_SEA_CHAIN_NAME: Record<number, string> = {
  [polygonMumbai.id]: 'mumbai',
  [sepolia.id]: 'sepolia',
}
