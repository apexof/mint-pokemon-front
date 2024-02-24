import { FC } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Chain, useSwitchNetwork } from "wagmi";
import { Button, ButtonProps } from "./Button/Button";

type Props = ButtonProps & {
  targetChain: Chain;
};

export const ConnectBtnWrap: FC<Props> = (props) => {
  const { children, targetChain } = props;
  const { isLoading: switchNetworkLoading, switchNetwork } = useSwitchNetwork();

  const isLoading = switchNetworkLoading;

  return (
    <ConnectButton.Custom>
      {(params) => {
        const { account, chain, mounted, openConnectModal } = params;
        const connected = mounted && account && chain && switchNetwork;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal}>Connect Wallet</Button>
                );
              }
              if (isLoading) {
                return <Button isLoading />;
              }
              if (chain.id !== targetChain.id) {
                return (
                  <Button onClick={() => switchNetwork(targetChain.id)}>
                    Switch to {targetChain.name}
                  </Button>
                );
              }

              return children;
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
