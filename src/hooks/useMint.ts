import { useCallback } from 'react'

import { pokemonFactory } from '@/constants/abi/pokemonFactory'
import { useWriteContract } from 'wagmi'

export const useMint = () => {
  const { data: txHash, error: txHashError, isPending: txHashLoading, writeContract } = useWriteContract()

  const mint = useCallback(async () => {
    writeContract({
      abi: pokemonFactory.abi,
      address: pokemonFactory.address,
      functionName: 'mint',
    })
  }, [writeContract])

  return {
    mint,
    txHash,
    txHashError: txHashError?.message,
    txHashLoading,
  }
}
