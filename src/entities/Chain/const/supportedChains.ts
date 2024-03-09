import { Chain } from 'viem'
import { polygonMumbai, sepolia } from 'viem/chains'

export enum ChainId {
  SEPOLIA = sepolia.id,
  MUMBAI = polygonMumbai.id,
}

export const SUPPORTED_CHAINS: [Chain, ...Chain[]] = [sepolia, polygonMumbai]
export const SUPPORTED_CHAINS_IDS: ChainId[] = SUPPORTED_CHAINS.map((ch) => ch.id)
