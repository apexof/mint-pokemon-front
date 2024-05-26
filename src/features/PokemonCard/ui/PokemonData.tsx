import { FC } from 'react'

import { PokemonCard } from './PokemonCard'
import { usePokemonByTokenId } from '@/entities/Pokemon/hooks/usePokemonByTokenId'
import loaderIcon from '@/shared/assets/loader.svg'
import Image from 'next/image'

type Props = {
  tokenId: number
}

export const PokemonData: FC<Props> = (props) => {
  const { tokenId } = props
  const { pokemon, pokemonLoading } = usePokemonByTokenId(tokenId)

  if (pokemonLoading) {
    return <Image alt="" height={275} src={loaderIcon} width={275} />
  }

  if (!pokemon) {
    return null
  }

  return <PokemonCard pokemon={pokemon} />
}
