'use client'

import loaderIcon from '@/assets/loader.svg'
import unknownPokemonImg from '@/assets/unknownPokemon.png'
import { Button } from '@/components/Button/Button'
import { ConnectBtnWrap } from '@/components/ConnectBtnWrap'
import { usePokemonAddress } from '@/entities/Pokemon/hooks/usePokemonAddress'
import { AddToMetaMask } from '@/features/AddToMetamask'
import { useOpenSeaLink } from '@/features/openSea/hooks/useOpenSeaLink'
import { useMint } from '@/hooks/useMint'
import { usePokemonByTokenId } from '@/hooks/usePokemonByTokenId'
import Image from 'next/image'
import { sepolia } from 'viem/chains'
import { useAccount, useWaitForTransactionReceipt } from 'wagmi'

import s from './home.module.scss'

function Home() {
  const { mint, txHash, txHashError, txHashLoading } = useMint()
  const { chainId } = useAccount()
  const pokemonContractAddress = usePokemonAddress()

  // wait tx
  const {
    data: mintTx,
    error: mintError,
    isLoading: mintLoading,
  } = useWaitForTransactionReceipt({
    chainId,
    hash: txHash,
  })
  const data = mintTx?.logs[0].data
  const tokenIdHash = data?.slice(2, 66)
  const tokenId = tokenIdHash ? parseInt(tokenIdHash, 16) : undefined
  const { pokemon, pokemonError, pokemonLoading } = usePokemonByTokenId(tokenId)

  const isLoading = mintLoading || pokemonLoading || txHashLoading
  const error = mintError?.message || pokemonError || txHashError
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
            : mintLoading
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
