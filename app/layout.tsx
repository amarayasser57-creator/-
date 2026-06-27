import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'CodeMaster 500 — تعلّم البرمجة باحتراف',
  description:
    'منصة تعليمية شاملة لإتقان Java و Python و C++ عبر 1500 درس متدرّج من المبتدئ إلى الاحترافي مع بحث فوري وتتبّع للتقدم وتلميحات ذكية.',
}

export const viewport: Viewport = {
  themeColor: '#0F6CBD',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
