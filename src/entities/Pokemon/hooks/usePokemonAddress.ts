import { ChainId } from '@/entities/Chain'
import { useAccount } from 'wagmi'

import { pokemonContractAddressByChainId } from '../const/pokemonContractAddressByChainId'

export const usePokemonAddress = () => {
  const { chainId } = useAccount()
  const pokemonContractAddress = chainId ? pokemonContractAddressByChainId[chainId as ChainId] : undefined

  return pokemonContractAddress
}
