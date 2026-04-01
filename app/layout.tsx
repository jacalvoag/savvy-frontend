  openGraph: {
    title: 'Savvy — Smart Financial Management',
    description: 'Control financiero individual + ahorro colaborativo.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-[#0a0a0a] text-white antialiased font-sans">{children}</body>
    </html>
  )
}

