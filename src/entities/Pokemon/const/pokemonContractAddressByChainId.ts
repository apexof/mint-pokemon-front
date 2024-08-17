import { ChainId } from '@/entities/Chain/const/supportedChains'

export const pokemonContractAddressByChainId: Record<ChainId, `0x${string}`> = {
  // 11_155_111: '0x4a75A899347959EDf4e031f7e8b2f1EeA7e2D66b', // proxy
  11_155_111: '0x78Fb3DE034CbDF746e5e101a9C994321BCD4D25A', // old
  137: '0xAD90C7F05FEEbFc7D6C733C71cA91D0659c258CF', // old
  80_002: '0xCfa00C27bEe9EA8Cd3c6461027575aB7049d10Ef', // old
}
