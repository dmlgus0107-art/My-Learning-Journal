import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { createClient } from '@/lib/supabase-server'
import { logout } from '@/app/login/actions'
import SearchBar from '@/components/SearchBar'

export const dynamic = 'force-dynamic'

type Tag = { id: string; name: string }
type Post = {
  id: string
  title: string
  content: string
  created_at: string
  post_tags: Array<{ tags: Tag | null }>
}

type Props = {
  searchParams: Promise<{ q?: string; tag?: string }>
}

export default async function Home({ searchParams }: Props) {
  const { q = '', tag = '' } = await searchParams

  // 태그 필터링: 해당 태그를 가진 post_id 목록 먼저 조회
  let filteredPostIds: string[] | null = null
  if (tag) {
    const { data: tagData } = await supabase.from('tags').select('id').eq('name', tag).single()
    if (tagData) {
      const { data: ptData } = await supabase
        .from('post_tags')
        .select('post_id')
        .eq('tag_id', tagData.id)
      filteredPostIds = (ptData ?? []).map((pt: { post_id: string }) => pt.post_id)
    } else {
      filteredPostIds = []
    }
  }

  // 글 목록 조회 (태그 포함)
  let postsQuery = supabase
    .from('posts')
    .select(`id, title, content, created_at, post_tags ( tags ( id, name ) )`)
    .order('created_at', { ascending: false })

  if (q) postsQuery = postsQuery.ilike('title', `%${q}%`)
  if (filteredPostIds !== null) {
    postsQuery = filteredPostIds.length > 0
      ? postsQuery.in('id', filteredPostIds)
      : postsQuery.in('id', ['00000000-0000-0000-0000-000000000000'])
  }

  const [{ data: posts }, { data: allTags }, serverClient] = await Promise.all([
    postsQuery,
    supabase.from('tags').select('id, name').order('name'),
    createClient(),
  ])

  const { data: { user } } = await serverClient.auth.getUser()

  // 태그 링크 생성 헬퍼
  const tagHref = (tagName: string) => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    params.set('tag', tagName)
    return `/?${params.toString()}`
  }
  const clearTagHref = q ? `/?q=${q}` : '/'

  return (
    <div className="min-h-screen">
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

        {/* 검색창 */}
        <div className="mb-6">
          <SearchBar defaultValue={q} currentTag={tag} />
        </div>

        {/* 태그 필터 */}
        {allTags && allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href={clearTagHref}
              className={`inline-flex items-center h-8 px-3 rounded-full text-xs font-medium transition-colors ${
                !tag
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              전체보기
            </Link>
            {allTags.map((t: Tag) => (
              <Link
                key={t.id}
                href={tagHref(t.name)}
                className={`inline-flex items-center h-8 px-3 rounded-full text-xs font-medium transition-colors ${
                  tag === t.name
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                #{t.name}
              </Link>
            ))}
          </div>
        )}

        {/* 글 목록 */}
        {!posts || posts.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-16">
            {q || tag ? '검색 결과가 없습니다.' : '아직 작성된 글이 없습니다.'}
          </p>
        ) : (
          <ul className="space-y-3">
            {(posts as unknown as Post[]).map((post) => {
              const tagNames = post.post_tags
                .map((pt) => pt.tags?.name)
                .filter(Boolean) as string[]

              return (
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
                    {tagNames.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {tagNames.map((name) => (
                          <span
                            key={name}
                            className="inline-flex items-center h-6 px-2.5 rounded-full bg-gray-100 text-xs text-gray-500"
                          >
                            #{name}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
