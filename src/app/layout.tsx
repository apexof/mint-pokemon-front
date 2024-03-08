import './globals.css'
import { FC, PropsWithChildren } from 'react'
import { Header } from '@/components/Header/Header'
import s from './layout.module.scss'
import { Web3Provider } from './providers/Web3Provider'

const RootLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <div className={s.pageContainer}>
            <Header />
            {children}
          </div>
        </Web3Provider>
      </body>
    </html>
  )
}

export default RootLayout
