'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

export async function createPost(formData: FormData) {
  const supabase = await createClient()
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  console.log('[createPost] title:', title, '/ content length:', content?.length)

  const { data, error } = await supabase.from('posts').insert({ title, content }).select()

  console.log('[createPost] data:', data)
  console.log('[createPost] error:', error)

  if (error) {
    console.error('[createPost] Supabase insert failed:', error.message, error.details, error.hint)
    throw new Error(error.message)
  }

  redirect('/')
}
