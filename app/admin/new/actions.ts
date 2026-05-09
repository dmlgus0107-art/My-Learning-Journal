'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

export async function createPost(formData: FormData) {
  const supabase = await createClient()
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const tagsRaw = (formData.get('tags') as string) ?? ''

  const { data: post, error } = await supabase
    .from('posts')
    .insert({ title, content })
    .select()
    .single()

  if (error) {
    console.error('[createPost] insert failed:', error.message)
    throw new Error(error.message)
  }

  // 태그 처리
  const tagNames = tagsRaw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

  if (tagNames.length > 0) {
    const { data: tagRows, error: tagError } = await supabase
      .from('tags')
      .upsert(tagNames.map((name) => ({ name })), { onConflict: 'name' })
      .select()

    if (tagError) {
      console.error('[createPost] tag upsert failed:', tagError.message)
    } else if (tagRows && tagRows.length > 0) {
      const { error: ptError } = await supabase
        .from('post_tags')
        .insert(tagRows.map((tag: { id: string }) => ({ post_id: post.id, tag_id: tag.id })))

      if (ptError) {
        console.error('[createPost] post_tags insert failed:', ptError.message)
      }
    }
  }

  redirect('/')
}
