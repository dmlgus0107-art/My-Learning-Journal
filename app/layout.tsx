import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '나의 학습 일지',
  description: '배운 것을 기록하는 공간',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <body style={{ backgroundColor: 'transparent' }}>{children}</body>
    </html>
  )
}
