import { FC, MouseEventHandler } from 'react'

import errorIcon from '#assets/icons/check-circle-error.svg'
import metamaskIcon from '#assets/icons/metamask.svg'
// import { message } from 'antd'
import { useTranslation } from 'react-i18next'

// import { Hint } from '../Hint/Hint'

import s from './addToMetaMask.module.scss'

type Props = {
  address?: string
  className?: string
  decimals?: number
  hint?: boolean
  image?: string
  symbol?: string
}

export const AddToMetaMask: FC<Props> = (props) => {
  const { address, className, decimals, hint, image, symbol } = props
  // const [messageApi, contextHolder] = message.useMessage()

  if (!symbol || !address || !decimals) {
    return <img alt="" className={className} src={metamaskIcon} />
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
              decimals,
              image,
              symbol,
            },
            type: 'ERC20',
          },
        })
        .catch(console.error)
    } else {
      // messageApi.open({
      //   content: t('metamaskNotFound'),
      //   icon: <img alt="" src={errorIcon} />,
      //   type: 'error',
      // })
    }
  }

  return (
    <>
      {/* {contextHolder} */}
      {/* <Hint text={hint ? t('addToMetamask') : null}> */}
      <button className={s.addToMetaMaskBtn} onClick={handleClick}>
        <img alt="" className={className} src={metamaskIcon} />
      </button>
      {/* </Hint> */}
    </>
  )
}
