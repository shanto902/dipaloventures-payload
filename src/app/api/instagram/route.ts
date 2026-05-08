import { NextResponse } from 'next/server'
import { getInstagramPosts } from '@/lib/instagram'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const shouldFilter = searchParams.get('filter') !== 'false'
    const posts = await getInstagramPosts(12, shouldFilter)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Instagram API Route Error:', error)
    return NextResponse.json({ error: 'Failed to fetch instagram posts' }, { status: 500 })
  }
}
