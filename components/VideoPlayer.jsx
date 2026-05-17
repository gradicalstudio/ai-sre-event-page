"use client";

import { useRef, useState, useEffect } from "react";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showIcon, setShowIcon] = useState(true);

  const flashIcon = () => {
    setShowIcon(true);
    // Clear any existing timer before setting a new one
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowIcon(false), 2000);
  };

  // Show icon on mount then fade after 3s
  useEffect(() => {
    flashIcon();
    return () => clearTimeout(timerRef.current);
  }, []);

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    flashIcon();
  };

  return (
    <div
      className="relative w-full aspect-video cursor-pointer"
      onClick={toggleMute}
    >
      <video
        ref={videoRef}
        src="/videos/Aws Datamato Final.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full rounded-2xl object-cover"
      />

      {/* Speaker icon - fades in/out */}
      <div
        className={`absolute bottom-2 right-2 p-0.5 lg:p-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white transition-opacity duration-500 ${
          showIcon ? "opacity-100" : "opacity-0"
        }`}
      >
        {isMuted ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </div>
    </div>
  );
}