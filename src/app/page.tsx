"use client";

import { usePokemonByTokenId } from "@/hooks/usePokemonByTokenId";
import { useMint } from "@/hooks/useMint";
import Image from "next/image";
import loaderIcon from "@/assets/loader.svg";
import { Button } from "@/components/Button/Button";
import { ConnectBtnWrap } from "@/components/ConnectBtnWrap";
import { sepolia, useWaitForTransaction } from "wagmi";
import unknownPokemonImg from "@/assets/unknownPokemon.png";
import { pokemonFactory } from "@/constants/abi/pokemonFactory";
import s from "./home.module.scss";

function Home() {
  const { txHashError, mint, txHashLoading, txHash } = useMint();

  // wait tx
  const {
    data: mintTx,
    error: mintError,
    isLoading: mintLoading,
  } = useWaitForTransaction({
    hash: txHash,
    chainId: sepolia.id,
  });

  const tokenIdHash = mintTx?.logs[0].topics[3];
  const tokenId = tokenIdHash ? parseInt(tokenIdHash, 16) : undefined;

  const { pokemonLoading, pokemonError, pokemon } =
    usePokemonByTokenId(tokenId);

  const isLoading = mintLoading || pokemonLoading || txHashLoading;
  const error = mintError?.message || pokemonError || txHashError;
  console.log("pokemon", pokemon);
  return (
    <main className={s.homePage}>
      {isLoading ? 
        <Image width={275} height={275} src={loaderIcon} alt="" /> :
      pokemon ? (
        <Image width={475} height={475} src={pokemon?.image} alt="" />
      ) : (
        <Image width={700} src={unknownPokemonImg} alt="" />
      )}
      {txHashLoading ? (
        <p>Proceed In Your Wallet</p>
      ) : isLoading ? (
        <>Loading...</>
      ) : error ? (
        <div className={s.error}>{error}</div>
      ) : pokemon ? (
        <>
          <a
            target="_blank"
            href={`https://testnets.opensea.io/assets/sepolia/${pokemonFactory.address}/${tokenId}`}
          >
            View on OpenSea
          </a>
        </>
      ) : txHash ? (
        <>
          <p>Transaction sent successfully!</p>
          <a target="_blank" href={`https://sepolia.etherscan.io/tx/${txHash}`}>
            View in Explorer!
          </a>
        </>
      ) : (
        <p>Mint free Pokemon NFT!</p>
      )}

      <ConnectBtnWrap targetChain={sepolia}>
        <Button isLoading={isLoading} onClick={mint}>
          {txHashLoading
            ? "Proceed In Your Wallet"
            : mintLoading
            ? "Minting"
            : pokemonLoading
            ? "Getting Pokemon Image"
            : pokemon
            ? "Mint Again"
            : "Mint"}
        </Button>
      </ConnectBtnWrap>
    </main>
  );
}

export default Home;
