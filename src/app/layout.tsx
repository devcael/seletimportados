import './globals.css'
import { Inter } from 'next/font/google'
import '@fortawesome/fontawesome-free/css/all.min.css';

const inter = Inter({ subsets: ['latin'] })
import StyledComponentsRegistry from './Registry'
import { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <StyledComponentsRegistry><body className={inter.className}>{children}</body></StyledComponentsRegistry>
    </html>
  )
}
