import { useEffect, useState } from 'react'

import { getUserNftDoc } from './getUserNftDoc'
import request from 'graphql-request'

type Pokemon = {
  id: string
}

type Response = {
  user?: {
    pokemons: Pokemon[]
  }
}

export const usePokemonsByUser = (address?: `0x${string}`) => {
  const [data, setData] = useState<number[]>()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (!address) {
      return
    }
    request<Response>('https://api.studio.thegraph.com/query/44553/pokemon-graph/version/latest', getUserNftDoc, {
      account: address?.toLowerCase(),
    })
      .then((res) => {
        const numberArray = res.user?.pokemons.map((item) => +item.id)
        setData(numberArray)
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [address])

  return {
    isLoading,
    pokemonIds: data,
  }
}
