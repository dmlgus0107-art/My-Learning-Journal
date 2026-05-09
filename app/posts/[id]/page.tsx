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
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[680px] px-5 py-12 sm:py-16">

        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-400 hover:text-gray-900 transition-colors"
        >
          ← 목록으로
        </Link>

        <article className="mt-10">
          <time className="text-xs text-gray-400 font-medium">
            {new Date(post.created_at).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h1 className="mt-2 text-2xl font-bold text-gray-900 leading-tight sm:text-3xl">
            {post.title}
          </h1>
          <div className="mt-1 h-px bg-gray-100" />
          <p className="mt-8 text-base text-gray-700 leading-8 whitespace-pre-wrap">
            {post.content}
          </p>
        </article>

      </div>
    </div>
  )
}
