"use client";

import { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import Hls from "hls.js";

interface VideoPlayerProps {
  src: string; // The HLS signed URL (.m3u8)
  title: string;
  watermarkText?: string;
  onProgress?: (time: number) => void;
  onEnded?: () => void;
}

export const VideoPlayer = ({ src, title, watermarkText, onProgress, onEnded }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxMaxBufferLength: 100, // optimize for education videos
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        // Initialize Plyr once HLS is ready
        playerRef.current = new Plyr(video, {
          title,
          controls: [
            "play-large", "play", "progress", "current-time", "duration",
            "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"
          ],
          settings: ["quality", "speed"],
          speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
          quality: { default: 720, options: [1080, 720, 480, 360], forced: true, onChange: (e: any) => updateQuality(e) },
        } as Plyr.Options);

        // Event hooks
        playerRef.current.on('timeupdate', () => {
           if(onProgress) onProgress(playerRef.current?.currentTime || 0);
        });

        playerRef.current.on('ended', () => {
           if(onEnded) onEnded();
        });
      });

      const updateQuality = (newQuality: number) => {
        hls.levels.forEach((level, levelIndex) => {
          if (level.height === newQuality) {
            hls.currentLevel = levelIndex;
          }
        });
      };

      return () => {
        hls.destroy();
        if (playerRef.current) {
          playerRef.current.destroy();
        }
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Fallback for native HLS support (Safari)
      video.src = src;
      playerRef.current = new Plyr(video, { title } as Plyr.Options);
      
      return () => {
        if (playerRef.current) {
          playerRef.current.destroy();
        }
      };
    }
  }, [src, title, onEnded, onProgress]);

  return (
    <div className="relative rounded-lg overflow-hidden group border border-border/50 shadow-xl bg-black">
      {/* Dynamic Watermark for Piracy Protection */}
      {watermarkText && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center opacity-0 group-hover:opacity-20 transition-opacity duration-1000">
           <span className="text-white/30 text-2xl md:text-5xl font-bold rotate-[-30deg] tracking-widest mix-blend-overlay break-words w-full text-center px-4">
              {watermarkText}
           </span>
        </div>
      )}
      
      <video ref={videoRef} id="player" controls crossOrigin="anonymous" playsInline></video>
    </div>
  );
};
