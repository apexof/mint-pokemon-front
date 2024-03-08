'use client'

import { usePokemonByTokenId } from '@/hooks/usePokemonByTokenId'
import { useMint } from '@/hooks/useMint'
import Image from 'next/image'
import loaderIcon from '@/assets/loader.svg'
import { Button } from '@/components/Button/Button'
import { ConnectBtnWrap } from '@/components/ConnectBtnWrap'
import { useAccount, useWaitForTransactionReceipt } from 'wagmi'
import unknownPokemonImg from '@/assets/unknownPokemon.png'
import { pokemonFactory } from '@/constants/abi/pokemonFactory'
import s from './home.module.scss'
import { sepolia } from 'viem/chains'
import { AddToMetaMask } from '@/features/AddToMetamask'

function Home() {
  const { txHashError, mint, txHashLoading, txHash } = useMint()
  const { chainId } = useAccount()
  // wait tx
  const {
    data: mintTx,
    error: mintError,
    isLoading: mintLoading,
  } = useWaitForTransactionReceipt({
    hash: txHash,
    chainId,
  })
  const data = mintTx?.logs[0].data
  const tokenIdHash = data?.slice(2, 66)
  const tokenId = tokenIdHash ? parseInt(tokenIdHash, 16) : undefined
  const { pokemonLoading, pokemonError, pokemon } = usePokemonByTokenId(tokenId)

  const isLoading = mintLoading || pokemonLoading || txHashLoading
  const error = mintError?.message || pokemonError || txHashError
  return (
    <main className={s.homePage}>
      {isLoading ? (
        <Image width={275} height={275} src={loaderIcon} alt="" />
      ) : pokemon ? (
        <Image width={475} height={475} src={pokemon.image} alt="" />
      ) : (
        <Image width={700} src={unknownPokemonImg} alt="" />
      )}
      {txHashLoading ? (
        <p className={s.text}>Proceed In Your Wallet</p>
      ) : isLoading ? (
        <p className={s.text}>Loading...</p>
      ) : error ? (
        <div className={s.error}>{error}</div>
      ) : pokemon ? (
        <>
          <a
            className={s.text}
            target="_blank"
            href={`https://testnets.opensea.io/assets/sepolia/${pokemonFactory.address}/${tokenId}`}
          >
            View on OpenSea
          </a>
          <AddToMetaMask tokenId={tokenId?.toString()} address={pokemonFactory.address} />
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
