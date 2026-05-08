const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const PLAYLIST_ID = 'PLLXglev6mg7N3u08iwdTS_B9zD7yRkqYB'

export interface YouTubeVideo {
  id: string
  title: string
  desc: string
  publishedAt: string
}

export async function getLatestVideos(limit = 3): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    console.warn('YOUTUBE_API_KEY is missing. Falling back to demo data.')
    return []
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=${limit}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!res.ok) throw new Error('Failed to fetch YouTube videos')

    const data = await res.json()
    return data.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      desc: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
    }))
  } catch (error) {
    console.error('YouTube Fetch Error:', error)
    return []
  }
}
