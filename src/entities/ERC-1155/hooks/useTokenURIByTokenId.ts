import { pokemonAbi } from '@/entities/Pokemon/const/pokemonAbi'
import { usePokemonAddress } from '@/entities/Pokemon/hooks/usePokemonAddress'
import { useAccount, useReadContract } from 'wagmi'

export const useTokenURIByTokenId = (tokenId?: number) => {
  const bigTokenId = tokenId ? BigInt(tokenId) : undefined
  const { chainId } = useAccount()
  const pokemonContractAddress = usePokemonAddress()

  const {
    data: tokenURI,
    error: tokenURIError,
    isLoading: tokenURILoading,
  } = useReadContract({
    abi: pokemonAbi,
    address: pokemonContractAddress,
    args: [bigTokenId as bigint],
    chainId,
    functionName: 'uri',
    query: {
      enabled: !!tokenId,
    },
  })

  return { tokenURI, tokenURIError: tokenURIError?.message, tokenURILoading }
}
