import { Chain } from 'viem'
import { polygon, polygonAmoy, sepolia } from 'viem/chains'

export enum ChainId {
  SEPOLIA = 11_155_111,
  AMOY = 80_002,
  POLYGON = 137,
}

export const SUPPORTED_CHAINS: [Chain, ...Chain[]] = [sepolia, polygonAmoy, polygon]
export const SUPPORTED_CHAINS_IDS: ChainId[] = SUPPORTED_CHAINS.map((ch) => ch.id)
