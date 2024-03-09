import { Chain } from 'viem'
import { polygon, polygonMumbai, sepolia } from 'viem/chains'

export enum ChainId {
  SEPOLIA = sepolia.id,
  MUMBAI = polygonMumbai.id,
  POLYGON = polygon.id,
}

export const SUPPORTED_CHAINS: [Chain, ...Chain[]] = [sepolia, polygonMumbai, polygon]
export const SUPPORTED_CHAINS_IDS: ChainId[] = SUPPORTED_CHAINS.map((ch) => ch.id)
