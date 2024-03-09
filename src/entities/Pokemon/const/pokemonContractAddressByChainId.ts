import { ChainId } from '@/entities/Chain/const/supportedChains'
import { polygon, polygonMumbai, sepolia } from 'viem/chains'

export const pokemonContractAddressByChainId: Record<ChainId, `0x${string}`> = {
  [polygon.id]: '0x8D053860a12B57CdC78A33A0a69B59b21CEEFD2f',
  [polygonMumbai.id]: '0x2aC3d5E409272f4D6917ae15cA24Af8a606ecEB0',
  [sepolia.id]: '0x53963f3da917dFD4eF654B7Ace7Cef88753ae3A6',
}
