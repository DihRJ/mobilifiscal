import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'MobiliFiscal',
  description: 'Fiscalização de transporte — MobiliFiscal'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Script id="mf-sw" strategy="afterInteractive">{`
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', ()=> navigator.serviceWorker.register('/sw.js').catch(()=>{}));
          }
        `}</Script>
      </body>
    </html>
  )
}
