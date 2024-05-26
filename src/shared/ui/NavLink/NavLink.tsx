import { FC, PropsWithChildren } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = PropsWithChildren<{
  className: string
  href: string
}>

export const NavLink: FC<Props> = (props) => {
  const { children, className, href } = props
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link className={`${className} ${isActive ? 'active' : ''}`} href={href}>
      {children}
    </Link>
  )
}
