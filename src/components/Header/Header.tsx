import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React, { FC } from "react";
import s from "./header.module.scss";

export const Header: FC = () => {
  return (
    <div className="flex items-center justify-between py-4 px-6">
      <nav>
        <ul className="flex items-center gap-6">
          <li>
            <Link href="/" className={s.link}>
              Mint
            </Link>
          </li>
          <li>
            <Link className={s.link} href="/collection">
              Your Collection
            </Link>
          </li>
        </ul>
      </nav>
      <ConnectButton />
    </div>
  );
};
