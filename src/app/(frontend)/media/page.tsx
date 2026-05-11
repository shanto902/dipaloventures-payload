import React from 'react'
import { SiteLayout } from '@/components/SiteLayout'

import { MediaVideos } from '@/components/media/MediaVideos'
import { MediaInstagram } from '@/components/media/MediaInstagram'
import { MediaBlog } from '@/components/media/MediaBlog'
import { MediaSocialConnect } from '@/components/media/MediaSocialConnect'

export const metadata = {
  title: 'Media — Dipalo Ventures',
  description:
    'Tales From The Hard Side — honest conversations with the founders manufacturing the physical future.',
}

import { getLatestVideos } from '@/lib/youtube'
import { getInstagramPosts } from '@/lib/instagram'
import { getMediumPosts } from '@/lib/medium'

export default async function MediaPage() {
  const latestVideos = await getLatestVideos(3)
  const instagramPosts = await getInstagramPosts(8, false)
  const mediumPosts = await getMediumPosts(3)

  return (
    <>
      <MediaVideos initialVideos={latestVideos} />
      <MediaInstagram initialPosts={instagramPosts} />
      <MediaBlog initialPosts={mediumPosts} />
      <MediaSocialConnect />
    </>
  )
}
