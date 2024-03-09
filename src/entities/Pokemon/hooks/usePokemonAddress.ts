import { useAccount } from 'wagmi'

import { pokemonContractAddressByChainId } from '../const/pokemonContractAddressByChainId'

export const usePokemonAddress = () => {
  const { chainId } = useAccount()
  const pokemonContractAddress = chainId ? pokemonContractAddressByChainId[chainId] : undefined

  return pokemonContractAddress
}
