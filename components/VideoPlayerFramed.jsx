"use client";

import { useRef, useState, useEffect, useCallback } from "react";

// Detect iOS once at module level
const isIOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !window.MSStream;

// Detect if fullscreen API is available (iOS Safari doesn't support it)
const supportsFullscreen =
  typeof document !== "undefined" &&
  !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);

export default function VideoPlayerFramed({
  src = "/videos/Aws Datamato Final.mp4",
  prismicVideoUrl = null,
  usePrismicLink = false,
  autoplay = false,
  autoplayDelay = 5000,
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  const visibilityTimerRef = useRef(null);
  const seekerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const lastTapRef = useRef(0); // iOS double-tap to seek

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [hasPlayed, setHasPlayed] = useState(false);

  const resolvedSrc = usePrismicLink && prismicVideoUrl ? prismicVideoUrl : src;

  const resetVisibilityTimer = useCallback(() => {
    setControlsVisible(true);
    clearTimeout(visibilityTimerRef.current);
    if (videoRef.current && !videoRef.current.paused) {
      visibilityTimerRef.current = setTimeout(() => setControlsVisible(false), 2000);
    }
  }, []);

  // Mount / autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();

    if (autoplay) {
      autoplayTimerRef.current = setTimeout(() => {
        if (video.paused) {
          video.muted = true;
          // FIX: properly handle the play() promise (iOS may reject silently)
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
                setIsMuted(true);
                setHasPlayed(true);
                resetVisibilityTimer();
              })
              .catch((err) => {
                // Autoplay blocked (e.g. iOS Low Power Mode) — reset to paused state cleanly
                console.log("Autoplay blocked:", err);
                setIsPlaying(false);
                setControlsVisible(true);
              });
          }
        }
      }, autoplayDelay);
    }

    return () => {
      clearTimeout(autoplayTimerRef.current);
      clearTimeout(visibilityTimerRef.current);
    };
  }, [autoplay, autoplayDelay, resetVisibilityTimer]);

  // Pause when scrolled out of view
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
          setIsPlaying(false);
          setControlsVisible(true);
          clearTimeout(visibilityTimerRef.current);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Fullscreen sync — listen for both standard and webkit events (iOS)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!(document.fullscreenElement || document.webkitFullscreenElement)
      );
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange); // iOS Safari
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Auto fullscreen on rotate
  useEffect(() => {
    const handleOrientationChange = () => {
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      const fsElement = document.fullscreenElement || document.webkitFullscreenElement;
      if (isLandscape && isPlaying && !fsElement) {
        const el = containerRef.current;
        if (el) {
          // FIX: try webkit fallback for iOS
          const req = el.requestFullscreen || el.webkitRequestFullscreen;
          if (req) req.call(el, { navigationUI: "hide" }).catch(() => {});
        }
      } else if (!isLandscape && (document.fullscreenElement || document.webkitFullscreenElement)) {
        const exit = document.exitFullscreen || document.webkitExitFullscreen;
        if (exit) exit.call(document);
      }
    };

    window.addEventListener("orientationchange", handleOrientationChange);
    return () => window.removeEventListener("orientationchange", handleOrientationChange);
  }, [isPlaying]);

  // Progress + duration tracking — added 'canplay' for iOS which fires late loadedmetadata
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!video.duration || isNaN(video.duration)) return;
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };
    const handleLoadedMetadata = () => {
      if (!isNaN(video.duration)) setDuration(video.duration);
    };
    // FIX: iOS Safari sometimes skips loadedmetadata; canplay is more reliable
    const handleCanPlay = () => {
      if (!isNaN(video.duration)) setDuration(video.duration);
    };

    if (video.readyState >= 1 && !isNaN(video.duration)) setDuration(video.duration);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("durationchange", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay); // FIX: iOS fallback
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("durationchange", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [resolvedSrc]);

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Seeker
  const seekToRatio = useCallback((clientX) => {
    const video = videoRef.current;
    const el = seekerRef.current;
    if (!video || !el || !video.duration || isNaN(video.duration)) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    video.currentTime = ratio * video.duration;
    setProgress(ratio * 100);
    resetVisibilityTimer();
  }, [resetVisibilityTimer]);

  const handleSeekerPointerDown = (e) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    seekToRatio(e.clientX);
  };

  const handleSeekerPointerMove = (e) => {
    if (!isDraggingRef.current) return;
    e.stopPropagation();
    seekToRatio(e.clientX);
  };

  const handleSeekerPointerUp = (e) => {
    e.stopPropagation();
    isDraggingRef.current = false;
  };

  // Double-tap to seek ±10s on iOS only; PC/Android use original togglePlay behaviour
  const handleTap = (e) => {
    clearTimeout(autoplayTimerRef.current);

    if (isIOS) {
      const now = Date.now();
      const rect = containerRef.current?.getBoundingClientRect();

      if (now - lastTapRef.current < 300 && rect) {
        // Double tap — seek ±10s
        const x = e.clientX - rect.left;
        const isRightSide = x > rect.width / 2;
        const video = videoRef.current;
        if (video) {
          video.currentTime = Math.max(0, video.currentTime + (isRightSide ? 10 : -10));
          resetVisibilityTimer();
        }
        lastTapRef.current = now;
        return; // don't toggle play on double tap
      }

      lastTapRef.current = now;
    }

    // Original togglePlay logic — always runs on non-iOS, runs on single tap on iOS
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = false;
      setIsMuted(false);
      video.play();
      setIsPlaying(true);
      setHasPlayed(true);
      resetVisibilityTimer();
    } else {
      video.pause();
      setIsPlaying(false);
      setControlsVisible(true);
      clearTimeout(visibilityTimerRef.current);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const next = !isMuted;
    video.muted = next;
    setIsMuted(next);
    if (!next && volume === 0) { setVolume(0.5); video.volume = 0.5; }
    resetVisibilityTimer();
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setVolume(val);
    const video = videoRef.current;
    if (!video) return;
    video.volume = val;
    video.muted = val === 0;
    setIsMuted(val === 0);
    resetVisibilityTimer();
  };

  // FIX: webkit fullscreen fallback for iOS
  const toggleFullscreen = async (e) => {
    e.stopPropagation();
    const fsElement = document.fullscreenElement || document.webkitFullscreenElement;
    if (!fsElement) {
      try {
        const el = containerRef.current;
        if (el.requestFullscreen) {
          await el.requestFullscreen({ navigationUI: "hide" });
        } else if (el.webkitRequestFullscreen) {
          await el.webkitRequestFullscreen(); // iOS Safari fallback
        }
      } catch (err) {
        console.log("Fullscreen request failed:", err);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen(); // iOS Safari fallback
      }
    }
    resetVisibilityTimer();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-pointer overflow-hidden bg-black"
      onClick={handleTap} // FIX: was onClick={togglePlay}, now handles double-tap too
      onMouseMove={resetVisibilityTimer}
      onMouseLeave={() => {
        clearTimeout(visibilityTimerRef.current);
        if (isPlaying) setControlsVisible(false);
      }}
    >
      <video
        ref={videoRef}
        src={resolvedSrc}
        muted
        loop
        playsInline
        preload="metadata"
        webkit-playsinline="true" // FIX: covers iOS < 10
        x-webkit-airplay="allow"  // FIX: optional AirPlay support
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
        <div className="relative ">
          {!isPlaying && (
            <div className="absolute inset-0 rounded-full p-0.5 overflow-hidden">
              <div className="absolute inset-0 rounded-full border border-[#3FD9FB]/20" />
              <div className="absolute inset-0 rounded-full animate-[spin_5s_linear_forwards]">
                <div className="absolute top-0 left-0 h-full w-14 bg-[#3FD9FB] blur-[10px]" />
              </div>
            </div>
          )}
          <div className="relative z-10 flex items-center gap-3 px-4 py-2 lg:px-6 lg:py-3 rounded-full bg-white text-black border border-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-105">
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
            <span className="text-xs md:text-sm lg:text-base font-semibold tracking-wide">
              {isPlaying ? "Pause Video" : "Watch Video"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom controls bar — hidden until video has been played at least once */}
      {hasPlayed && (
        <div
          className={` absolute bottom-0 left-0 right-0 px-3 pb-1 md:pb-3 lg:pt-8 flex flex-col md:gap-2 transition-all duration-500 ease-in-out
            bg-gradient-to-t from-black/60 to-transparent
            ${controlsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Seeker */}
          <div
            ref={seekerRef}
            className="relative  py-1.5 md:py-2.5 w-full cursor-pointer group"
            onPointerDown={handleSeekerPointerDown}
            onPointerMove={handleSeekerPointerMove}
            onPointerUp={handleSeekerPointerUp}
          >
            <div className="relative w-full h-1.5 bg-white/25 rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-white rounded-full pointer-events-none"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md pointer-events-none
                           opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity"
                style={{ left: `calc(${progress}% - 8px)` }}
              />
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-[10px] md:text-xs font-mono select-none">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className="flex items-center gap-2">
              {/* FIX: hide volume controls on iOS — they have no effect on that platform */}
              {!isIOS && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:scale-110 active:scale-95 transition-transform duration-200"
                  >
                    {isMuted || volume === 0 ? (
                      <svg className="w-3 h-3 lg:w-4 lg:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    ) : volume < 0.5 ? (
                      <svg className="w-3 h-3 lg:w-4 lg:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 lg:w-4 lg:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    onClick={(e) => e.stopPropagation()}
                    className="w-14 lg:w-20 h-1 accent-white cursor-pointer"
                  />
                </div>
              )}

              {/* FIX: hide fullscreen button if the API isn't available (iOS Safari) */}
              {supportsFullscreen && (
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:scale-110 active:scale-95 transition-transform duration-200"
                >
                  {isFullscreen ? (
                    <svg className="w-3 h-3 lg:w-4 lg:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                      <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                      <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 lg:w-4 lg:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 7V3h4" />
                      <path d="M17 3h4v4" />
                      <path d="M21 17v4h-4" />
                      <path d="M7 21H3v-4" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}