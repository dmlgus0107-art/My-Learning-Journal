import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: Props) {
  const { id } = await params

  const { data: post } = await supabase
    .from('posts')
    .select('id, title, content, created_at')
    .eq('id', id)
    .single()

  if (!post) notFound()

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
        ← 목록으로
      </Link>

      <p className="text-xs text-gray-400 mt-8 mb-2">
        {new Date(post.created_at).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{post.title}</h1>
      <p className="text-gray-700 whitespace-pre-wrap leading-8">{post.content}</p>
    </main>
  )
}
