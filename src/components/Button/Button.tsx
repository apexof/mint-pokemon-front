import { FC, MouseEventHandler, PropsWithChildren } from 'react'

import loaderIcon from '@/assets/loader.svg'
import Image from 'next/image'

import s from './button.module.scss'

export type ButtonProps = PropsWithChildren<{
  isLoading?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}>

export const Button: FC<ButtonProps> = (props) => {
  const { children, isLoading, onClick } = props

  return (
    <button className={s.button} disabled={isLoading} onClick={onClick}>
      {isLoading && <Image alt="" src={loaderIcon} width={25} />}
      {children}
    </button>
  )
}
