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

export async function getInstagramPosts(limit = 24, filterPosters = true): Promise<InstagramPost[]> {
  if (!INSTAGRAM_TOKEN) {
    console.warn('INSTAGRAM_TOKEN is missing. Falling back to empty state.')
    return []
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${INSTAGRAM_TOKEN}&limit=${limit}`,
      { next: { revalidate: 900 } } // Cache for 15 minutes
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
    const posts: InstagramPost[] = data.data || []

    if (!filterPosters) return posts

    // Expanded "Free AI" Filter: Aggressively target corporate graphics/posters
    const POSTER_KEYWORDS = [
      'register',
      'link in bio',
      'join us',
      'webinar',
      'event',
      'hiring',
      'apply now',
      'tickets',
      'workshop',
      'conference',
      'save the date',
      'funding',
      'series a',
      'series b',
      'seed round',
      'investment',
      'portfolio company',
      'congratulations',
      'congrats',
      'proud to support',
      'announcing',
      'excited to share',
      'big news',
      'official',
      'summit',
      'forum',
    ]

    return posts.filter((post) => {
      const caption = (post.caption || '').toLowerCase()
      // Filter by keywords
      const isPoster = POSTER_KEYWORDS.some((word) => caption.includes(word))
      if (isPoster) return false

      // Filter by hashtag density (Posters often have 10+ hashtags)
      const hashtagCount = (post.caption || '').split('#').length - 1
      if (hashtagCount > 6) return false

      return true
    })
  } catch (error) {
    console.error('Instagram Fetch Exception:', error)
    return []
  }
}
