"use client";

import React, { useEffect } from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { polygon, sepolia } from "wagmi/chains";

const { chains, publicClient } = configureChains(
  [polygon, sepolia],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "pokemon-NFT",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string,
  chains,
});

const connectors = connectorsForWallets(wallets);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
