import { useEffect, useState } from 'react'

import { getUserNftDoc } from './getUserNftDoc'
import { ChainId } from '@/entities/Chain'
import request from 'graphql-request'
import { useAccount } from 'wagmi'

import { subgraphUrl } from '../const/graphUrls'

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
  const [isLoading, setLoading] = useState(false)
  const { chainId } = useAccount()

  useEffect(() => {
    if (!address || !chainId) {
      return
    }
    setLoading(true)
    request<Response>(subgraphUrl[chainId as ChainId], getUserNftDoc, {
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
  }, [address, chainId])

  return {
    isLoading,
    pokemonIds: data,
  }
}
