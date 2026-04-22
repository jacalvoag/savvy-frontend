import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Savvy — Smart Financial Management',
  description:
    'Savvy combines individual financial control with collaborative savings groups to help you reach your financial goals faster.',
  keywords: ['finanzas', 'ahorro', 'metas financieras', 'grupos de ahorro'],
  openGraph: {
    title: 'Savvy — Smart Financial Management',
    description: 'Control financiero individual + ahorro colaborativo.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full bg-[#0a0a0a] text-white antialiased font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}