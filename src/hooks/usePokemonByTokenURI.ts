import { useEffect, useState } from 'react'

import { Pokemon } from '@/types/pokemon'

export const usePokemonByTokenURI = (tokenURI?: string) => {
  const [pokemonLoading, setPokemonLoading] = useState(false)
  const [pokemonError, setPokemonError] = useState<string>()
  const [pokemon, setPokemon] = useState<Pokemon>()

  useEffect(() => {
    if (!tokenURI) {
      return
    }
    setPokemonError(undefined)
    setPokemon(undefined)
    setPokemonLoading(true)
    fetch(tokenURI)
      .then(async (resJson) => {
        if (resJson.status !== 200) {
          console.error('Error', resJson)
          setPokemonError('Error while loading Pokemon by tokenURI')

          return
        }
        const res: Pokemon = await resJson.json()
        setPokemon(res)
      })
      .catch((error: Error) => {
        console.log('Error', error)
        setPokemonError(error.message)
      })
      .finally(() => {
        setPokemonLoading(false)
      })
  }, [tokenURI])

  return {
    pokemon,
    pokemonError,
    pokemonLoading,
  }
}
