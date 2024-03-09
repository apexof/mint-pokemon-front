import { useAccount } from 'wagmi'

import { OPEN_SEA_CHAIN_NAME } from '../const/openSeaChainName'

export const useOpenSeaLink = (collection?: `0x${string}`, id?: number) => {
  const { chain, chainId } = useAccount()
  const openSeaChainName = chainId ? OPEN_SEA_CHAIN_NAME[chainId] : undefined
  const isTestNet = chain?.testnet
  const testNetPrefix = isTestNet ? 'testnets.' : ''

  const openSeaLink =
    openSeaChainName && collection && id
      ? `https://${testNetPrefix}opensea.io/assets/${openSeaChainName}/${collection}/${id}`
      : undefined

  return openSeaLink
}
