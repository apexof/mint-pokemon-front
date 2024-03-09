import { useAccount } from 'wagmi'

import { OPEN_SEA_CHAIN_NAME } from '../const/openSeaChainName'

export const useOpenSeaLink = (collection?: `0x${string}`, id?: number) => {
  const { chainId } = useAccount()
  const openSeaChainName = chainId ? OPEN_SEA_CHAIN_NAME[chainId] : undefined
  console.log('openSeaChainName', openSeaChainName)
  const openSeaLink =
    openSeaChainName && collection && id
      ? `https://testnets.opensea.io/assets/${openSeaChainName}/${collection}/${id}`
      : undefined

  return openSeaLink
}
