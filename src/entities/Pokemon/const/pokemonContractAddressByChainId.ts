import { ChainId } from '@/entities/Chain/const/supportedChains'
import { polygon, polygonMumbai, sepolia } from 'viem/chains'

export const pokemonContractAddressByChainId: Record<ChainId, `0x${string}`> = {
  [polygon.id]: '0xAD90C7F05FEEbFc7D6C733C71cA91D0659c258CF',
  [polygonMumbai.id]: '0xC43a4c45a660B761cE0a926532589F2b27DC688E',
  [sepolia.id]: '0x78Fb3DE034CbDF746e5e101a9C994321BCD4D25A',
}
