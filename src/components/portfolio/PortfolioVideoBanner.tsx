'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'

export function PortfolioVideoBanner() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)
  const ytPlayer = useRef<any>(null)

  useEffect(() => {
    // 1. Load the YouTube IFrame Player API code asynchronously.
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    }

    // 2. Define the onYouTubeIframeAPIReady function.
    ;(window as any).onYouTubeIframeAPIReady = () => {
      ytPlayer.current = new (window as any).YT.Player('yt-player', {
        videoId: '1F7HNG15VO4',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          loop: 1,
          playlist: '1F7HNG15VO4', // Required for loop
          playsinline: 1,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo()
            setIsPlaying(true)
          },
          onStateChange: (event: any) => {
            // If video ends or pauses unexpectedly, update state
            if (event.data === (window as any).YT.PlayerState.PAUSED) {
              setIsPlaying(false)
            } else if (event.data === (window as any).YT.PlayerState.PLAYING) {
              setIsPlaying(true)
            }
          },
        },
      })
    }

    return () => {
      if (ytPlayer.current) {
        ytPlayer.current.destroy()
      }
    }
  }, [])

  const toggleMute = () => {
    if (!ytPlayer.current) return
    if (isMuted) {
      ytPlayer.current.unMute()
      ytPlayer.current.setVolume(50)
      setIsMuted(false)
    } else {
      ytPlayer.current.mute()
      setIsMuted(true)
    }
  }

  const togglePlay = () => {
    if (!ytPlayer.current) return
    if (isPlaying) {
      ytPlayer.current.pauseVideo()
      setIsPlaying(false)
    } else {
      ytPlayer.current.playVideo()
      setIsPlaying(true)
    }
  }

  return (
    <section className="container mt-24 mx-auto px-4 pb-12">
      <div className="mx-auto w-full md:w-[90%] lg:w-[85%]">
        {/* Video Container */}
        <div
          className="relative overflow-hidden rounded-[24px] bg-neutral-900 aspect-video shadow-2xl group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* The YouTube Player */}
          <div
            id="yt-player"
            className="absolute inset-0 w-full h-full pointer-events-none scale-[1.01]"
          />

          {/* Overlay - Invisible click area for play/pause toggle */}
          <div className="absolute inset-0 z-10 cursor-pointer" onClick={togglePlay} />

          {/* Middle Pause/Play Button (Visible on Hover) */}
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
            <div
              className={`transition-all duration-300 ${
                isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl">
                {isPlaying ? (
                  <Pause size={24} fill="currentColor" />
                ) : (
                  <Play size={24} fill="currentColor" className="ml-1" />
                )}
              </div>
            </div>
          </div>

          {/* Subtle Gradient Overlays */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Clean Controls Underneath */}
        <div className="mt-5 flex items-center justify-between px-2">
          <button
            onClick={toggleMute}
            className="group flex items-center gap-3 text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <div
              className={`p-2 rounded-full border transition-all ${
                isMuted
                  ? 'border-amber-600/20 bg-amber-50 text-amber-600'
                  : 'border-neutral-200 text-neutral-500'
              }`}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] font-bold">
              {isMuted ? 'Unmute Audio' : 'Mute Audio'}
            </span>
          </button>

          <div className="hidden md:block font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-400 font-bold">
            Dipalo Portfolio Reel · 2026
          </div>
        </div>
      </div>
    </section>
  )
}
