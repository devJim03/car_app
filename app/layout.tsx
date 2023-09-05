import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar, Footer } from '@/components'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Car Hub',
  description: 'Like a certain other hub, but for cars.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative'>
        {/*instead of putting this in page.tsx we are putting the navbar and footer here, I guess its bc children is only supposed to hold page.tsx*/}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
