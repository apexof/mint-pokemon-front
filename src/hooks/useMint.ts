import { pokemonFactory } from '@/constants/abi/pokemonFactory'
import { useCallback, useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'

export const useMint = () => {
  const { writeContract, data: txHash, error: txHashError, isPending: txHashLoading } = useWriteContract()

  const mint = useCallback(async () => {
    writeContract({
      abi: pokemonFactory.abi,
      address: pokemonFactory.address,
      functionName: 'mint',
    })
  }, [])

  return {
    txHashLoading,
    txHashError: txHashError?.message,
    mint,
    txHash,
  }
}
