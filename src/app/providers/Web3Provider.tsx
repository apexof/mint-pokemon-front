'use client'

import { FC, PropsWithChildren } from 'react'

import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { sepolia } from 'viem/chains'
import { WagmiProvider } from 'wagmi'

import '@rainbow-me/rainbowkit/styles.css'

const config = getDefaultConfig({
  appName: 'Pokemon Mint',
  chains: [sepolia],
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string,
  ssr: true,
})

const queryClient = new QueryClient()

export const Web3Provider: FC<PropsWithChildren> = (props) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en">{props.children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
