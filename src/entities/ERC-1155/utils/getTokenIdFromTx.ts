import { TransactionReceipt } from 'viem'

export const getTokenIdFromTx = (tx?: TransactionReceipt): number | undefined => {
  const data = tx?.logs[0].data
  const tokenIdHash = data?.slice(2, 66)
  const tokenId = tokenIdHash ? parseInt(tokenIdHash, 16) : undefined

  return tokenId
}
