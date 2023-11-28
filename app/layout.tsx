/* CSS */

import './globals.css'

/* META DATA */

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rolé',
  description: 'Seu Rolé Cultural em SP'
}
/* FONT */

import { Nunito } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'] })

/* PROVIDERS */

import { ToasterProvider } from './providers/ToasterProvider'

/* COMPONENTS */
import { Navbar } from './components/navbar/Navbar'
import { ClientOnly } from './components/ClientOnly'

/* MODALS */
import { RegisterModal } from './components/modals/RegisterModal'
import { LoginModal } from './components/modals/LoginModal'
import { PublishEventModal } from './components/modals/PublishEventModal'
import { SearchModal } from './components/modals/SearchModal'

/* SERVER ACTIONS */

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <LoginModal />
          <RegisterModal />
          <PublishEventModal />
          <Navbar />
        </ClientOnly>
        <div className="pb-20 pt-28"></div>
        {children}
      </body>
    </html>
  )
}
