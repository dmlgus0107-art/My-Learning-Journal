import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '나의 학습 일지',
  description: '배운 것을 기록하는 공간',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
