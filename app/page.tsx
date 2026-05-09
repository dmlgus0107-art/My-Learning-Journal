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
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-900">나의 학습 일지</h1>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/admin/new"
                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
              >
                새 글 쓰기
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  로그아웃
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              로그인
            </Link>
          )}
        </div>
      </div>

      {!posts || posts.length === 0 ? (
        <p className="text-gray-400 text-center mt-20">아직 작성된 글이 없습니다.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post: Post) => (
            <li key={post.id} className="border border-gray-100 rounded-xl p-6 shadow-sm">
              <p className="text-xs text-gray-400 mb-1">
                {new Date(post.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                <Link href={`/posts/${post.id}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 whitespace-pre-wrap line-clamp-3">{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
