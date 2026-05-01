import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '旅程管理アプリ',
  description: '個人手配旅行の旅程を管理するアプリ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}
