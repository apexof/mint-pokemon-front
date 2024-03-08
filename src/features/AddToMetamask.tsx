import { FC, MouseEventHandler } from 'react'

import Image from 'next/image'

import metamaskIcon from '../assets/metamask.svg'

import s from './addToMetamask.module.scss'

type Props = {
  address: string
  tokenId?: string
}

export const AddToMetaMask: FC<Props> = (props) => {
  const { address, tokenId } = props

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
            options: {
              address,
              tokenId,
            },
            type: 'ERC1155',
          },
        })
        .catch(console.error)
    } else {
      // eslint-disable-next-line no-alert
      alert('Metamask Not Found')
    }
  }

  return (
    <>
      <button className={s.addToMetamask} onClick={handleClick}>
        <Image alt="" src={metamaskIcon} width={35} />
        Add to Metamask
      </button>
    </>
  )
}
