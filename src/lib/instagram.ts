const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN

export interface InstagramPost {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  permalink: string
  thumbnail_url?: string
  timestamp: string
}

export async function getInstagramPosts(limit = 8): Promise<InstagramPost[]> {
  if (!INSTAGRAM_TOKEN) {
    console.warn('INSTAGRAM_TOKEN is missing. Falling back to empty state.')
    return []
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${INSTAGRAM_TOKEN}&limit=${limit}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    )

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      console.error('Instagram API Error Details:', {
        status: res.status,
        statusText: res.statusText,
        error: errorData.error,
      })
      return [] // Fallback to empty array instead of throwing
    }

    const data = await res.json()
    return data.data || []
  } catch (error) {
    console.error('Instagram Fetch Exception:', error)
    return []
  }
}
