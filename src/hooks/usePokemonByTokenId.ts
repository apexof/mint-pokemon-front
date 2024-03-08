import { usePokemonByTokenURI } from './usePokemonByTokenURI'
import { useTokenURIByTokenId } from './useTokenURIByTokenId'

export const usePokemonByTokenId = (tokenId?: number) => {
  const { tokenURI, tokenURIError, tokenURILoading } = useTokenURIByTokenId(tokenId)

  const { pokemon, pokemonError, pokemonLoading } = usePokemonByTokenURI(tokenURI)

  return {
    pokemon,
    pokemonError: tokenURIError || pokemonError,
    pokemonLoading: tokenURILoading || pokemonLoading,
  }
}
