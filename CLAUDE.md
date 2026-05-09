# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run start    # production server
```

## Architecture

Next.js 16 App Router + Supabase + Tailwind CSS.

- `app/page.tsx` — 메인 페이지 (글 목록)
- `app/admin/new/page.tsx` — 글 작성 페이지 (Server Action으로 Supabase insert)
- `lib/supabase.ts` — Supabase 클라이언트 (환경변수로 초기화)

Server Actions은 `'use server'` 지시어와 함께 파일 상단 또는 인라인으로 선언. 저장 후 `redirect()`로 메인 페이지 이동.

## Environment Variables

`.env.local`에 설정:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Vercel 배포 시 동일한 변수를 Project Settings > Environment Variables에 추가.
