'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export function ResidencyHero() {
  const [isMuted, setIsMuted] = useState(true)
  const [videoReady, setVideoReady] = useState(false)
  const ytPlayer = useRef<any>(null)

  useEffect(() => {
    const initPlayer = () => {
      if (ytPlayer.current) return
      ytPlayer.current = new (window as any).YT.Player('residency-yt-player', {
        videoId: 'ruRze-ZMNr4',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          loop: 1,
          playlist: 'ruRze-ZMNr4',
          playsinline: 1,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo()
            setVideoReady(true)
          },
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.PLAYING) {
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
    <section className="relative px-5 md:px-12 pt-24 pb-8  overflow-hidden min-h-[60vh] flex items-center bg-white">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center">
          {/* Left Column: Content Stack */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8 md:mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <div className="px-2.5 py-1 rounded-md text-xs md:text-xs font-mono uppercase tracking-[0.2em] text-neutral-600 font-bold">
                Technical Studio
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 leading-[1.2] tracking-tight mb-8">
              A technical diligence + <br className="hidden md:block" />
              product development <br />
              <span className="text-amber-500 italic">program.</span>
            </h1>

            <p className="text-base md:text-lg text-neutral-500 leading-relaxed max-w-xl mb-8 md:mb-16">
              Engineering audits, supply chain mapping, and manufacturing support — applied before
              we invest and continued long after.
            </p>

            {/* Technical Metadata Bar */}
            <div className="flex flex-wrap gap-10 md:gap-16 pt-1">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-bold">
                  Artifact ID
                </span>
                <span className="font-mono text-xs text-neutral-600 font-bold uppercase">
                  RES-VUMO-026
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-bold">
                  Location
                </span>
                <span className="font-mono text-xs text-neutral-600 font-bold uppercase">
                  Studio B / Shenzhen
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Video Reel */}
          <div className="relative group">
            {/* Architectural Accent Background */}
            <div
              className="absolute -inset-4 bg-amber-400/5 rounded-[2.5rem] rotate-1 transition-transform duration-700 group-hover:rotate-0"
              aria-hidden
            />
            {/* Video Container */}
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-neutral-900 shadow-sm border border-neutral-100">
              {!videoReady && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-neutral-900">
                  <div className="w-8 h-8 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin" />
                </div>
              )}
              <div
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
              >
                <div
                  id="residency-yt-player"
                  className="absolute inset-0 w-full h-full scale-[1.05]"
                />
              </div>

              {/* Mute Toggle */}
              <button
                onClick={toggleMute}
                className="absolute bottom-6 right-6 z-30 p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
