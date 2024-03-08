import { useTokenURIByTokenId } from './useTokenURIByTokenId'
import { usePokemonByTokenURI } from './usePokemonByTokenURI'

export const usePokemonByTokenId = (tokenId?: number) => {
  const { tokenURILoading, tokenURIError, tokenURI } = useTokenURIByTokenId(tokenId)

  const { pokemonLoading, pokemonError, pokemon } = usePokemonByTokenURI(tokenURI)

  return {
    pokemonLoading: tokenURILoading || pokemonLoading,
    pokemonError: tokenURIError || pokemonError,
    pokemon,
  }
}
