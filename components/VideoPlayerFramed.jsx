"use client";

import { useRef, useState, useEffect } from "react";

export default function VideoPlayerFramed({ src = "/videos/Aws Datamato Final.mp4" }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  const visibilityTimerRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolume, setShowVolume] = useState(false);

  const resetVisibilityTimer = () => {
    setControlsVisible(true);
    if (visibilityTimerRef.current) clearTimeout(visibilityTimerRef.current);
    if (videoRef.current && !videoRef.current.paused) {
      visibilityTimerRef.current = setTimeout(() => {
        setControlsVisible(false);
        setShowVolume(false);
      }, 2000);
    }
  };

  useEffect(() => {
    resetVisibilityTimer();
    if (videoRef.current) videoRef.current.pause();

    autoplayTimerRef.current = setTimeout(() => {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
        setIsPlaying(true);
        resetVisibilityTimer();
      }
    }, 5000);

    return () => {
      clearTimeout(autoplayTimerRef.current);
      clearTimeout(visibilityTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // update progress as video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100 || 0);
    };
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      const next = !isMuted;
      videoRef.current.muted = next;
      setIsMuted(next);
      if (!next && volume === 0) {
        setVolume(0.5);
        videoRef.current.volume = 0.5;
      }
      resetVisibilityTimer();
    }
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
    resetVisibilityTimer();
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * video.duration;
    resetVisibilityTimer();
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    resetVisibilityTimer();
  };

  const togglePlay = () => {
    clearTimeout(autoplayTimerRef.current);
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play();
      setIsPlaying(true);
      resetVisibilityTimer();
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setControlsVisible(true);
      if (visibilityTimerRef.current) clearTimeout(visibilityTimerRef.current);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-pointer overflow-hidden bg-black"
      onClick={togglePlay}
      onMouseMove={resetVisibilityTimer}
      onMouseLeave={() => {
        if (visibilityTimerRef.current) clearTimeout(visibilityTimerRef.current);
        if (isPlaying) {
          setControlsVisible(false);
          setShowVolume(false);
        }
      }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 transition-all duration-500 pointer-events-none ${
          isPlaying ? "bg-black/10" : "bg-black/20"
        }`}
      />

      {/* Center play/pause button */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
          controlsVisible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="relative">
          {!isPlaying && (
            <div className="absolute inset-0 rounded-full p-[2px] overflow-hidden">
              <div className="absolute inset-0 rounded-full border border-[#3FD9FB]/20" />
              <div className="absolute inset-0 rounded-full animate-[spin_5s_linear_forwards]">
                <div className="absolute top-0 left-0 h-full w-14 bg-[#3FD9FB] blur-[10px]" />
              </div>
            </div>
          )}
          <div className="relative z-10 flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black border border-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-105">
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
            <span className="text-sm lg:text-base font-semibold tracking-wide">
              {isPlaying ? "Pause Video" : "Watch Video"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom controls bar ── */}
      <div
        className={`absolute bottom-0 left-0 right-0 px-3 pb-3 pt-8 flex flex-col gap-2 transition-all duration-500 ease-in-out
          bg-gradient-to-t from-black/60 to-transparent
          ${controlsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
      >
        {/* Seeker */}
        <div
          className="relative w-full h-1 bg-white/20 rounded-full cursor-pointer group"
          onClick={handleSeek}
        >
          {/* filled track */}
          <div
            className="absolute top-0 left-0 h-full bg-white rounded-full pointer-events-none"
            style={{ width: `${progress}%` }}
          />
          {/* thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${progress}% - 6px)` }}
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between">

          {/* Left — time */}
          <span className="text-white/60 text-xs font-mono select-none">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Right — mute + volume + fullscreen */}
          <div className="flex items-center gap-2">

            {/* Volume control */}
            <div
              className="flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* mute toggle */}
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:scale-110 transition-transform duration-200"
              >
                {isMuted || volume === 0 ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>

              {/* volume slider — always visible in controls bar */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                onClick={(e) => e.stopPropagation()}
                className="w-20 h-1 accent-white cursor-pointer"
              />
            </div>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:scale-110 transition-transform duration-200"
            >
              {isFullscreen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                  <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                  <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                  <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7V3h4" />
                  <path d="M17 3h4v4" />
                  <path d="M21 17v4h-4" />
                  <path d="M7 21H3v-4" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}