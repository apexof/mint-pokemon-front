'use client'

import { useMint } from '@/entities/ERC-1155/hooks/useMint'
import { getTokenIdFromTx } from '@/entities/ERC-1155/utils/getTokenIdFromTx'
import unknownPokemonImg from '@/entities/Pokemon/assets/unknownPokemon.png'
import { usePokemonAddress } from '@/entities/Pokemon/hooks/usePokemonAddress'
import { usePokemonByTokenId } from '@/entities/Pokemon/hooks/usePokemonByTokenId'
import { useOpenSeaLink } from '@/features/1OpenSea/hooks/useOpenSeaLink'
import { AddToMetaMask } from '@/features/AddToMetamask/AddToMetamask'
import { ConnectBtnWrap } from '@/features/ConnectBtnWrap/ConnectBtnWrap'
import loaderIcon from '@/shared/assets/loader.svg'
import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import { sepolia } from 'viem/chains'
import { useAccount, useWaitForTransactionReceipt } from 'wagmi'

import s from './home.module.scss'

function Home() {
  const { chainId } = useAccount()
  const pokemonContractAddress = usePokemonAddress()
  const { mint, txHash, txHashError, txHashLoading } = useMint(pokemonContractAddress)

  // wait tx
  const { data: tx, error: txError, isLoading: txLoading } = useWaitForTransactionReceipt({ chainId, hash: txHash })
  const tokenId = getTokenIdFromTx(tx)
  const { pokemon, pokemonError, pokemonLoading } = usePokemonByTokenId(tokenId)

  const isLoading = txLoading || pokemonLoading || txHashLoading
  const error = txError?.message || pokemonError || txHashError
  const openSeaLink = useOpenSeaLink(pokemonContractAddress, tokenId)

  return (
    <main className={s.homePage}>
      {isLoading ? (
        <Image alt="" height={275} src={loaderIcon} width={275} />
      ) : pokemon ? (
        <>
          <p className={s.name}>{pokemon.name}</p>
          <Image alt="" height={475} src={pokemon.image} width={475} />
        </>
      ) : (
        <Image alt="" src={unknownPokemonImg} width={700} />
      )}
      {txHashLoading ? (
        <p className={s.text}>Proceed In Your Wallet</p>
      ) : isLoading ? (
        <p className={s.text}>Loading...</p>
      ) : error ? (
        <div className={s.error}>{error}</div>
      ) : pokemon ? (
        <>
          <a className={s.text} href={openSeaLink} rel="noreferrer" target="_blank">
            View on OpenSea
          </a>
          <AddToMetaMask address={pokemonContractAddress} tokenId={tokenId?.toString()} />
        </>
      ) : (
        <p className={s.text}>Mint free Pokemon NFT!</p>
      )}

      <ConnectBtnWrap targetChain={sepolia}>
        <Button isLoading={isLoading} onClick={mint}>
          {txHashLoading
            ? 'Proceed In Your Wallet'
            : txLoading
              ? 'Minting'
              : pokemonLoading
                ? 'Getting Pokemon Image'
                : pokemon
                  ? 'Mint Again'
                  : 'Mint'}
        </Button>
      </ConnectBtnWrap>
    </main>
  )
}

export default Home
