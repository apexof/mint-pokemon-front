import { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { pokemonFactory } from "@/constants/abi/pokemonFactory";

export const useTokenURIByTokenId = (tokenId?: `0x${string}` | number) => {
  const [tokenURILoading, setTokenURILoading] = useState(false);
  const [tokenURIError, setTokenURIError] = useState();
  const [tokenURI, setTokenURI] = useState<string>();

  useEffect(() => {
    if (!tokenId) {
      return;
    }
    setTokenURILoading(true);

    const bigTokenId = BigInt(tokenId);

    readContract({
      address: pokemonFactory.address,
      abi: pokemonFactory.abi,
      functionName: "tokenURI",
      args: [bigTokenId],
    })
      .then((result) => {
        setTokenURI(result);
      })
      .catch((error) => {
        console.log("Error", error);
        setTokenURIError(error);
      })
      .finally(() => {
        setTokenURILoading(false);
      });
  }, [tokenId]);

  return { tokenURI, tokenURILoading, tokenURIError };
};
