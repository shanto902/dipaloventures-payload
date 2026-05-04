const MEDIUM_USERNAME = 'dipaloventures' // User can update this

export interface MediumPost {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
}

export async function getMediumPosts(limit = 3): Promise<MediumPost[]> {
  try {
    // Using rss2json to convert Medium RSS to JSON
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    )

    if (!res.ok) throw new Error('Failed to fetch Medium posts')

    const data = await res.json()
    
    if (data.status !== 'ok') {
      console.warn('Medium RSS Error:', data.message)
      return []
    }

    return data.items.slice(0, limit)
  } catch (error) {
    console.error('Medium Fetch Exception:', error)
    return []
  }
}
