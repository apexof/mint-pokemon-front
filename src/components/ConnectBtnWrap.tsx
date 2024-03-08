import { FC } from 'react'

import { Button, ButtonProps } from './Button/Button'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Chain } from 'viem'
import { useSwitchChain } from 'wagmi'

type Props = ButtonProps & {
  targetChain: Chain
}

export const ConnectBtnWrap: FC<Props> = (props) => {
  const { children, targetChain } = props
  const { isPending, switchChain } = useSwitchChain()

  return (
    <ConnectButton.Custom>
      {(params) => {
        const { account, chain, mounted, openConnectModal } = params
        const connected = mounted && account && chain && switchChain

        return (
          <>
            {(() => {
              if (!connected) {
                return <Button onClick={openConnectModal}>Connect Wallet</Button>
              }
              if (isPending) {
                return <Button isLoading />
              }
              if (chain.id !== targetChain.id) {
                return (
                  <Button onClick={() => switchChain({ chainId: targetChain.id })}>Switch to {targetChain.name}</Button>
                )
              }

              return children
            })()}
          </>
        )
      }}
    </ConnectButton.Custom>
  )
}
