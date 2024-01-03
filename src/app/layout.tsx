import './globals.css'

export const metadata = {
  title: 'Todo app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={`bg-slate-800 text-slate-100 container mx-auto p-4`}>
        {children}
      </body>
    </html>
  )
}
