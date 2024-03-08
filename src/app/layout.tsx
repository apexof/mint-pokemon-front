import './globals.css'
import { Web3Provider } from './providers'
import { FC, PropsWithChildren } from 'react'
import { Header } from '@/components/Header/Header'

const RootLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <Header />
          {children}
        </Web3Provider>
      </body>
    </html>
  )
}

export default RootLayout
