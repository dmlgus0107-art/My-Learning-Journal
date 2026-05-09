import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '나의 학습 일지',
  description: '배운 것을 기록하는 공간',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.065) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        {children}
      </body>
    </html>
  )
}
