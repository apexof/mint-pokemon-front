"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { usePokemonByTokenId } from "@/hooks/usePokemonByTokenId";
import { useMint } from "@/hooks/useMint";
import Image from "next/image";

export default function Home() {
  const { mintTx, mint, mintLoading, mintError } = useMint();
  const tokenId = mintTx?.logs[0].topics[3];

  const { pokemonLoading, pokemonError, pokemon } =
    usePokemonByTokenId(tokenId);

  const isLoading = mintLoading || pokemonLoading;
  const error = mintError || pokemonError;

  return (
    <main>
      <ConnectButton />
      <div>
        {isLoading ? (
          "loading"
        ) : error ? (
          error
        ) : pokemon ? (
          <img src={pokemon?.image} alt="" />
        ) : (
          "Mint free Pokemon NFT!"
        )}
      </div>
      <button onClick={mint}>Mint</button>
    </main>
  );
}
