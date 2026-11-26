import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useHandTracking, type HandCursor } from '../hooks/useHandTracking';

interface CameraTrackerProps {
  onCursorUpdate: (cursor: HandCursor) => void;
}

export function CameraTracker({ onCursorUpdate }: CameraTrackerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dotContainerRef = useRef<HTMLDivElement>(null);
  const dotInnerRef = useRef<HTMLDivElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const handleCursorUpdate = useCallback((cursor: HandCursor) => {
    // 1. Pass to parent (GamePlay -> GameCanvas)
    onCursorUpdate(cursor);

    // 2. Direct DOM manipulation for the visual dot (Bypass React state for 60fps)
    if (dotContainerRef.current && dotInnerRef.current) {
      if (cursor.isVisible) {
        dotContainerRef.current.style.display = 'block';
        dotContainerRef.current.style.left = `${cursor.x * 100}%`;
        dotContainerRef.current.style.top = `${cursor.y * 100}%`;
        
        if (cursor.isGrabbing) {
          dotInnerRef.current.className = "w-4 h-4 rounded-full border-2 transition-all bg-green-500 border-white scale-125";
        } else {
          dotInnerRef.current.className = "w-4 h-4 rounded-full border-2 transition-all bg-red-500 border-white/50";
        }
      } else {
        dotContainerRef.current.style.display = 'none';
      }
    }
  }, [onCursorUpdate]);

  const { isReady } = useHandTracking(videoRef, handleCursorUpdate);

  useEffect(() => {
    async function setupCamera() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasPermission(false);
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240, facingMode: "user" }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasPermission(false);
      }
    }

    setupCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      {!hasPermission && hasPermission !== null && (
        <p className="text-white text-sm text-center p-2">Mohon izinkan akses kamera</p>
      )}
      {!isReady && hasPermission && (
        <p className="text-white text-sm absolute z-10 animate-pulse">Memuat AI...</p>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover transform -scale-x-100" // Mirror the video
      />
      {/* Visual Feedback for Hand - updated directly via refs */}
      <div 
        ref={dotContainerRef}
        className="absolute z-20 pointer-events-none transition-transform duration-75"
        style={{ display: 'none', transform: 'translate(-50%, -50%)' }}
      >
        <div ref={dotInnerRef} className="w-4 h-4 rounded-full border-2 transition-all" />
      </div>
    </div>
  );
}
