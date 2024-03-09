import { useCallback } from 'react'

import { pokemonAbi } from '@/entities/Pokemon/const/pokemonAbi'
import { useWriteContract } from 'wagmi'

export const useMint = (address?: `0x${string}`) => {
  const { data: txHash, error: txHashError, isPending: txHashLoading, writeContract } = useWriteContract()

  const mint = useCallback(async () => {
    if (!address) {
      return
    }
    writeContract({
      abi: pokemonAbi,
      address,
      functionName: 'mint',
    })
  }, [writeContract, address])

  return {
    mint,
    txHash,
    txHashError: txHashError?.message,
    txHashLoading,
  }
}
