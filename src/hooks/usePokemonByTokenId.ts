import { Pokemon } from "@/types/pokemon";
import { useEffect, useState } from "react";
import { useTokenURIByTokenId } from "./useTokenURIByTokenId";
import { usePokemonByTokenURI } from "./usePokemonByTokenURI";

export const usePokemonByTokenId = (tokenId?: `0x${string}` | number) => {
  const { tokenURILoading, tokenURIError, tokenURI } =
    useTokenURIByTokenId(tokenId);

  const { pokemonLoading, pokemonError, pokemon } =
    usePokemonByTokenURI(tokenURI);

  return {
    pokemonLoading: tokenURILoading || pokemonLoading,
    pokemonError: tokenURIError || pokemonError,
    pokemon,
  };
};
