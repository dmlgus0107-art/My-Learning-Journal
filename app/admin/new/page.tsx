import NewPostForm from './NewPostForm'
import { createPost } from './actions'

export default function NewPostPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-[680px] px-5 py-12 sm:py-16">
        <h1 className="text-xl font-semibold text-gray-900 mb-8">새 글 쓰기</h1>
        <NewPostForm action={createPost} />
      </div>
    </div>
  )
}
