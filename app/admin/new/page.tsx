import NewPostForm from './NewPostForm'
import { createPost } from './actions'

export default function NewPostPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">새 글 쓰기</h1>
      <NewPostForm action={createPost} />
    </main>
  )
}
