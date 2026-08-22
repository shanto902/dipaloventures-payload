import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { SiteLayout } from '@/components/SiteLayout'

import { MediaVideos } from '@/components/media/MediaVideos'
import { MediaInstagram } from '@/components/media/MediaInstagram'
import { MediaBlog } from '@/components/media/MediaBlog'
import { MediaSocialConnect } from '@/components/media/MediaSocialConnect'

export async function generateMetadata(): Promise<Metadata> {
  const defaultTitle = 'Media — Dipalo Ventures'
  const defaultDescription =
    'Tales From The Hard Side — honest conversations with the founders manufacturing the physical future.'

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
    })

    return {
      title: siteSettings?.pageMetadata?.media?.title || defaultTitle,
      description: siteSettings?.pageMetadata?.media?.description || defaultDescription,
    }
  } catch (error) {
    return {
      title: defaultTitle,
      description: defaultDescription,
    }
  }
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
