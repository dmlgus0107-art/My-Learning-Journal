'use client'

import Link from 'next/link'

type Props = {
  action: (formData: FormData) => Promise<void>
}

export default function NewPostForm({ action }: Props) {
  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          제목
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="글 제목을 입력하세요"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="content" className="text-sm font-medium text-gray-700">
          본문
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={12}
          placeholder="오늘 배운 내용을 기록해보세요"
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors resize-y leading-relaxed"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          저장하기
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-11 px-6 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          취소
        </Link>
      </div>
    </form>
  )
}
