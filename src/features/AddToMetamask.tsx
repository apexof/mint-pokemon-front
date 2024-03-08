import { FC, MouseEventHandler } from 'react'

import metamaskIcon from '../assets/metamask.svg'
import Image from 'next/image'
import s from './addToMetamask.module.scss'

type Props = {
  address: string
  className?: string
  tokenId?: string
}

export const AddToMetaMask: FC<Props> = (props) => {
  const { tokenId, address, className } = props

  if (!tokenId) {
    return null
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()

    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC1155',
            options: {
              address,
              tokenId,
            },
          },
        })
        .catch(console.error)
    } else {
      alert('Metamask Not Found')
    }
  }

  return (
    <>
      <button className={s.addToMetamask} onClick={handleClick}>
        <Image width={35} src={metamaskIcon} alt="" />
        Add to Metamask
      </button>
    </>
  )
}
