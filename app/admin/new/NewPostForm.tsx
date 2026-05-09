'use client'

import Link from 'next/link'

type Props = {
  action: (formData: FormData) => Promise<void>
}

export default function NewPostForm({ action }: Props) {
  return (
    <form action={action} className="flex flex-col gap-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          제목
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="글 제목을 입력하세요"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          본문
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={10}
          placeholder="오늘 배운 내용을 기록해보세요"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black resize-y"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
        >
          저장하기
        </button>
        <Link
          href="/"
          className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          취소
        </Link>
      </div>
    </form>
  )
}
