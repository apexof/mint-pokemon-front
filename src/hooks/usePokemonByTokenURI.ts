import { Pokemon } from "@/types/pokemon";
import { useEffect, useState } from "react";

export const usePokemonByTokenURI = (tokenURI?: string) => {
  const [pokemonLoading, setPokemonLoading] = useState(false);
  const [pokemonError, setPokemonError] = useState<string>();
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    if (!tokenURI) {
      return;
    }
    fetch(tokenURI)
      .then(async (resJson) => {
        if (resJson.status !== 200) {
          console.error("Error", resJson);
          setPokemonError("Error while loading Pokemon by tokenURI");
          return;
        }
        const res: Pokemon = await resJson.json();
        setPokemon(res);
      })
      .catch((error: Error) => {
        console.log("Error", error);
        setPokemonError(error.message);
      })
      .finally(() => {
        setPokemonLoading(false);
      });
  }, [tokenURI]);

  return {
    pokemonLoading,
    pokemonError,
    pokemon,
  };
};
