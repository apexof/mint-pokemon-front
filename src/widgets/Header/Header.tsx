'use client'

import { FC } from 'react'

import { NavLink } from '@/shared/ui'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import s from './header.module.scss'

export const Header: FC = () => {
  return (
    <div className={s.header}>
      <nav>
        <ul className={s.list}>
          <li>
            <NavLink className={s.link} href="/">
              Mint
            </NavLink>
          </li>
          <li>
            <NavLink className={s.link} href="/collection">
              Your Collection
            </NavLink>
          </li>
        </ul>
      </nav>
      <ConnectButton />
    </div>
  )
}
