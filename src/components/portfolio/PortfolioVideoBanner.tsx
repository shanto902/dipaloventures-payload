'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'

export function PortfolioVideoBanner() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)
  const ytPlayer = useRef<any>(null)

  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const initPlayer = () => {
      if (ytPlayer.current) return
      ytPlayer.current = new (window as any).YT.Player('yt-player', {
        videoId: '1F7HNG15VO4',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          loop: 1,
          playlist: '1F7HNG15VO4',
          playsinline: 1,
          iv_load_policy: 3,
          start: 11,
          showinfo: 0,
          autohide: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.seekTo(11)
            event.target.playVideo()
            // Set ready on init so we don't get stuck if state change is slow
            setVideoReady(true)
          },
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.PAUSED) {
              setIsPlaying(false)
            } else if (event.data === (window as any).YT.PlayerState.PLAYING) {
              setIsPlaying(true)
              setVideoReady(true)
            }
          },
        },
      })
    }

    if (!(window as any).YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      }
      ;(window as any).onYouTubeIframeAPIReady = initPlayer
    } else {
      initPlayer()
    }

    return () => {
      if (ytPlayer.current) {
        ytPlayer.current.destroy()
        ytPlayer.current = null
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

  return (
    <div className="px-5 md:px-12">
      <section className="container  mx-auto px-4 pt-24  pb-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <div className=" text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 font-bold">
                The Portfolio
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.05] tracking-tight">
              Companies <span className="italic text-amber-400">of the</span>
              <br /> physical world.
            </h1>
            <p className="mt-6 md:mt-8 text-base md:text-lg text-neutral-800 leading-relaxed font-light max-w-xl">
              Breakthrough technologies for people and the planet. Supporting 16 companies across
              Fund I, Fund II, and SPVs.
            </p>

            {/* Reel Metadata */}
            <div className="mt-8 md:mt-12 flex items-center gap-4">
              <button
                onClick={toggleMute}
                className="group flex items-center gap-3 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <div
                  className={`p-2 rounded-full border transition-all ${
                    isMuted
                      ? 'border-amber-400/20 bg-amber-50 text-amber-400'
                      : 'border-neutral-200 text-neutral-500'
                  }`}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.15em] font-bold">
                  {isMuted ? 'Unmute Audio' : 'Mute Reel'}
                </span>
              </button>
              <div className="h-px w-8 bg-neutral-200" />
              <div className="font-mono text-xs uppercase tracking-[0.15em] text-neutral-600 font-bold">
                Portfolio Reel 2026
              </div>
            </div>
          </div>

          {/* Video Reel with Homepage Pattern Framing */}
          <div className="relative group">
            <div
              className="absolute -inset-4 bg-amber-400/5 rounded-4xl rotate-1 transition-transform duration-700 group-hover:rotate-0"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-3xl aspect-video shadow-2xl border border-neutral-200/50 bg-neutral-900">
              {/* Shimmer Placeholder */}
              {!videoReady && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-neutral-900 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin" />
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold">
                      Initializing Reel
                    </span>
                  </div>
                </div>
              )}

              {/* The YouTube Player Container */}
              <div
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
              >
                <div id="yt-player" className="absolute inset-0 w-full h-full scale-[1.05]" />
              </div>

              {/* Cinematic Gradient Overlays */}
              <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/20 via-transparent to-transparent z-10" />
            </div>
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `,
          }}
        />
      </section>
    </div>
  )
}
