import { useCallback } from 'react'

import { pokemonAbi } from '@/constants/abi/pokemonFactory'
import { usePokemonAddress } from '@/entities/Pokemon/hooks/usePokemonAddress'
import { useWriteContract } from 'wagmi'

export const useMint = () => {
  const { data: txHash, error: txHashError, isPending: txHashLoading, writeContract } = useWriteContract()
  const pokemonContractAddress = usePokemonAddress()

  const mint = useCallback(async () => {
    if (!pokemonContractAddress) {
      return
    }
    writeContract({
      abi: pokemonAbi,
      address: pokemonContractAddress,
      functionName: 'mint',
    })
  }, [writeContract, pokemonContractAddress])

  return {
    mint,
    txHash,
    txHashError: txHashError?.message,
    txHashLoading,
  }
}
