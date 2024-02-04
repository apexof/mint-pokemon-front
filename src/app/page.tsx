"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { usePokemonByTokenId } from "@/hooks/usePokemonByTokenId";
import { useMint } from "@/hooks/useMint";
import Image from "next/image";
import { Button } from "@/components/Button";
import { ConnectBtnWrap } from "@/components/ConnectBtnWrap";
import { sepolia } from "wagmi";
import unknownPokemonImg from "@/assets/unknownPokemon.png";

function Home() {
  const { mintTx, mint, mintLoading, mintError } = useMint();
  const tokenId16 = mintTx?.logs[0].topics[3];
  const tokenId = tokenId16 ? parseInt(tokenId16, 16) : undefined;

  const { pokemonLoading, pokemonError, pokemon } =
    usePokemonByTokenId(tokenId);

  const isLoading = mintLoading || pokemonLoading;
  const error = mintError || pokemonError;

  return (
    <main className="flex flex-col gap-4 justify-center items-center flex-1">
      <div>
        {isLoading ? (
          "loading"
        ) : error ? (
          error
        ) : pokemon ? (
          <>
            <img src={pokemon?.image} alt="" />
            <a
              href={`https://testnets.opensea.io/assets/sepolia/${pokemonFactory.address}/${tokenId}`}
            >
              View on OpenSea
            </a>
          </>
        ) : (
          <div className="flex flex-col gap-4 items-center">
            <Image width={700} src={unknownPokemonImg} alt="" />
            <p>Mint free Pokemon NFT!</p>
          </div>
        )}
      </div>
      <ConnectBtnWrap targetChain={sepolia}>
        <Button onClick={mint}>Mint</Button>
      </ConnectBtnWrap>
    </main>
  );
}

export default Home;
