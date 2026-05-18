"use client";

import { useRef, useState, useEffect } from "react";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const autoplayTimerRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [showIcon, setShowIcon] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const flashIcon = () => {
    setShowIcon(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setShowIcon(false);
    }, 2000);
  };

  useEffect(() => {
    flashIcon();

    // Start paused
    if (videoRef.current) {
      videoRef.current.pause();
    }

    // Autoplay after 5s
    autoplayTimerRef.current = setTimeout(() => {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }, 5000);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(autoplayTimerRef.current);
    };
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);

    flashIcon();
  };

  const togglePlay = () => {
    clearTimeout(autoplayTimerRef.current);

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="group relative w-full aspect-video cursor-pointer overflow-hidden rounded-2xl"
      onClick={togglePlay}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src="/videos/Aws Datamato Final.mp4"
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div
        className={`
          absolute inset-0 transition-all duration-500
          ${isPlaying ? "bg-black/10 group-hover:bg-black/20" : "bg-black/10"}
        `}
      />

      {/* Center Button */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-500
          ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}
        `}
      >
        <div className="relative">
          {/* Moving Border */}
          {!isPlaying && (
            <div className="absolute inset-0 rounded-full p-[2px] overflow-hidden">
              {/* Background Border */}
              <div className="absolute inset-0 rounded-full border border-[#3FD9FB]/20" />

              {/* Moving Glow */}
              <div className="absolute inset-0 rounded-full animate-[spin_5s_linear_forwards]">
                <div
                  className="
                    absolute
                    top-0 left-0
                    h-full w-14
                    bg-[#3FD9FB]
                    blur-[10px]
                    opacity-100
                  "
                />
              </div>
            </div>
          )}

          {/* White Button */}
          <div
            className="
              relative z-10
              flex items-center gap-3
              px-6 py-3
              rounded-full
              bg-white
              text-black
              border border-white/60
              shadow-[0_10px_40px_rgba(0,0,0,0.35)]
              transition-all duration-300
              group-hover:scale-105
            "
          >
            {/* Icon */}
            <div className="flex items-center justify-center">
              {isPlaying ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>

            {/* Text */}
            <span className="text-sm lg:text-base font-semibold tracking-wide">
              {isPlaying ? "Pause Video" : "Watch Video"}
            </span>
          </div>
        </div>
      </div>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className={`
          absolute bottom-3 right-3
          p-2 lg:p-3
          rounded-full
          bg-black/40
          backdrop-blur-md
          border border-white/10
          text-white
          transition-opacity duration-500
          hover:scale-110
          ${showIcon ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}
      >
        {isMuted ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
    </div>
  );
}
