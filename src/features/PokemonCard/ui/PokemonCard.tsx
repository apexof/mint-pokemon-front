import { FC } from 'react'

import { Pokemon } from '@/entities/Pokemon/types/pokemon'
import Image from 'next/image'

import s from './pokemonCard.module.scss'

type Props = {
  pokemon: Pokemon
}

export const PokemonCard: FC<Props> = (props) => {
  const { pokemon } = props

  return (
    <div className={s.pokemonCard}>
      <p className={s.name}>{pokemon.name}</p>
      <Image alt="" className={s.image} height={475} src={pokemon.image} width={475} />
    </div>
  )
}
