import { pokemonFactory } from '@/constants/abi/pokemonFactory'
import { useAccount, useReadContract } from 'wagmi'

export const useTokenURIByTokenId = (tokenId?: number) => {
  const bigTokenId = tokenId ? BigInt(tokenId) : undefined
  const { chainId } = useAccount()

  const {
    data: tokenURI,
    error: tokenURIError,
    isLoading: tokenURILoading,
  } = useReadContract({
    abi: pokemonFactory.abi,
    address: pokemonFactory.address,
    args: [bigTokenId as bigint],
    chainId,
    functionName: 'uri',
    query: {
      enabled: !!tokenId,
    },
  })

  return { tokenURI, tokenURILoading, tokenURIError: tokenURIError?.message }
}
