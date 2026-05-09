'use client'

import { useRouter } from 'next/navigation'
import { useRef } from 'react'

type Props = {
  defaultValue?: string
  currentTag?: string
}

export default function SearchBar({ defaultValue = '', currentTag = '' }: Props) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = inputRef.current?.value.trim() ?? ''
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (currentTag) params.set('tag', currentTag)
    router.push(`/?${params.toString()}`)
  }

  function handleClear() {
    if (inputRef.current) inputRef.current.value = ''
    const params = new URLSearchParams()
    if (currentTag) params.set('tag', currentTag)
    router.push(`/?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex gap-2">
      <div className="relative flex-1">
        <input
          ref={inputRef}
          key={defaultValue}
          defaultValue={defaultValue}
          name="q"
          type="text"
          placeholder="제목으로 검색..."
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors pr-10"
        />
        {defaultValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors shrink-0"
      >
        검색
      </button>
    </form>
  )
}
