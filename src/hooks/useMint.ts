import { pokemonFactory } from '@/constants/abi/pokemonFactory'
import { useCallback, useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'

export const useMint = () => {
  const { writeContract, data: txHash, error: txHashError, isPending: txHashLoading } = useWriteContract()
  const { address } = useAccount()

  const mint = useCallback(async () => {
    if (!address) {
      return
    }
    writeContract({
      abi: pokemonFactory.abi,
      address: pokemonFactory.address,
      functionName: 'mint',
      args: [address],
    })
  }, [address])

  return {
    txHashLoading,
    txHashError: txHashError?.message,
    mint,
    txHash,
  }
}
