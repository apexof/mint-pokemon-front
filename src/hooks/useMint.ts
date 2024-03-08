import { pokemonFactory } from "@/constants/abi/pokemonFactory";
import { useCallback, useState } from "react";
import { useWaitForTransaction } from "wagmi";
import { prepareWriteContract, writeContract } from "@wagmi/core";

export const useMint = () => {
  const [txHashLoading, setTxHashLoading] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}`>();
  const [txHashError, setTxHashError] = useState<string>();

  const mint = useCallback(async () => {
    setTxHashLoading(true);
    setTxHashError(undefined);
    setTxHash(undefined);
    try {
      const config = await prepareWriteContract({
        address: pokemonFactory.address,
        abi: pokemonFactory.abi,
        functionName: "mint",
        args: ["0xf00819804a51065D17f5e2EA4b2ffd8df4FB9fe8"],
      });
      const newTx = await writeContract<typeof pokemonFactory.abi, "safeMint">(
        config
      );
      setTxHash(newTx.hash);
    } catch (error) {
      const err = error as Error;
      console.error("sendTx Error:", error);
      setTxHashError(err.message);
    } finally {
      setTxHashLoading(false);
    }
  }, []);

  return {
    txHashLoading,
    txHashError,
    mint,
    txHash,
  };
};
