import { NextResponse } from 'next/server'
import { getLatestVideos } from '@/lib/youtube'

export async function GET() {
  try {
    const videos = await getLatestVideos(10) // Fetch up to 10 from the playlist
    return NextResponse.json(videos)
  } catch (error) {
    console.error('YouTube API Route Error:', error)
    return NextResponse.json({ error: 'Failed to fetch YouTube videos' }, { status: 500 })
  }
}
