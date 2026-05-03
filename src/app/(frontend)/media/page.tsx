import React from 'react'
import { SiteLayout } from '@/components/SiteLayout'
import { MediaHero } from '@/components/media/MediaHero'
import { MediaVideos } from '@/components/media/MediaVideos'
import { MediaInstagram } from '@/components/media/MediaInstagram'
import { MediaBlog } from '@/components/media/MediaBlog'
import { MediaSocialConnect } from '@/components/media/MediaSocialConnect'

export const metadata = {
  title: 'Media — Dipalo Ventures',
  description:
    'Tales From The Hard Side — honest conversations with the founders manufacturing the physical future.',
}

export default function MediaPage() {
  return (
    <SiteLayout>
      <MediaHero />
      <MediaVideos />
      <MediaInstagram />
      <MediaBlog />
      <MediaSocialConnect />
    </SiteLayout>
  )
}
