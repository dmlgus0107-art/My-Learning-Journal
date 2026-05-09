import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { createClient } from '@/lib/supabase-server'
import { logout } from '@/app/login/actions'

export const dynamic = 'force-dynamic'

type Post = {
  id: string
  title: string
  content: string
  created_at: string
}

export default async function Home() {
  const [{ data: posts }, serverClient] = await Promise.all([
    supabase
      .from('posts')
      .select('id, title, content, created_at')
      .order('created_at', { ascending: false }),
    createClient(),
  ])

  const { data: { user } } = await serverClient.auth.getUser()

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[680px] px-5 py-12 sm:py-16">

        {/* 헤더 */}
        <header className="mb-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                나의 학습 일지
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                에코델타 독거노인의 Claude 성장 일기
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {user ? (
                <>
                  <Link
                    href="/admin/new"
                    className="inline-flex items-center justify-center h-11 px-4 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    새 글 쓰기
                  </Link>
                  <form action={logout}>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center h-11 px-4 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      로그아웃
                    </button>
                  </form>
                </>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center h-11 px-4 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  로그인
                </Link>
              )}
            </div>
          </div>
          <div className="mt-8 h-px bg-gray-100" />
        </header>

        {/* 글 목록 */}
        {!posts || posts.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-24">아직 작성된 글이 없습니다.</p>
        ) : (
          <ul className="space-y-3">
            {posts.map((post: Post) => (
              <li key={post.id}>
                <Link
                  href={`/posts/${post.id}`}
                  className="block rounded-xl border border-gray-100 bg-white px-6 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-gray-200"
                >
                  <time className="text-xs text-gray-400 font-medium">
                    {new Date(post.created_at).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <h2 className="mt-1.5 text-base font-semibold text-gray-900 leading-snug">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {post.content}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
