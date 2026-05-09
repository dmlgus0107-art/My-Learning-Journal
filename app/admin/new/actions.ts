'use server'

import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  await supabase.from('posts').insert({ title, content })
  redirect('/')
}
