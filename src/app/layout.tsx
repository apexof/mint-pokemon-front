import { FC, PropsWithChildren } from 'react'

import { Web3Provider } from './providers/Web3Provider'
import { Header } from '@/widgets/Header/Header'
import Head from 'next/head'

import './globals.css'
import s from './layout.module.scss'

const RootLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props

  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
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
