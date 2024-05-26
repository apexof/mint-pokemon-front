'use client'

import { FC } from 'react'

import { PokemonData } from '@/features/PokemonCard'
import loaderIcon from '@/shared/assets/loader.svg'
import Image from 'next/image'
import { useAccount } from 'wagmi'

import { usePokemonsByUser } from '../api/usePokemonsByUser'

import s from './pokemonList.module.scss'

export const PokemonList: FC = () => {
  const { address } = useAccount()

  const { isLoading, pokemonIds } = usePokemonsByUser(address)

  if (isLoading) {
    return <Image alt="" height={275} src={loaderIcon} width={275} />
  }
  if (!pokemonIds?.length) {
    return <h1 className={s.text}>You dont have any Pokemons yet</h1>
  }

  return (
    <div className={s.pokemonList}>
      {pokemonIds.map((id) => {
        return <PokemonData key={id} tokenId={id} />
      })}
    </div>
  )
}
