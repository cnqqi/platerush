import { useEffect, useState, useRef } from 'react';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export type HandCursor = {
  x: number;
  y: number;
  isGrabbing: boolean;
  isVisible: boolean;
};

export function useHandTracking(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  onCursorUpdate?: (cursor: HandCursor) => void
) {
  const [isReady, setIsReady] = useState(false);
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    let active = true;

    async function initHandLandmarker() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1,
          minHandDetectionConfidence: 0.5,
          minHandPresenceConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        if (active) {
          landmarkerRef.current = landmarker;
          setIsReady(true);
        }
      } catch (err) {
        console.error("Failed to initialize MediaPipe HandLandmarker", err);
      }
    }

    initHandLandmarker();

    return () => {
      active = false;
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isReady || !videoRef.current) return;

    const video = videoRef.current;
    let lastVideoTime = -1;

    const predict = () => {
      if (video.currentTime !== lastVideoTime && landmarkerRef.current && video.readyState >= 2) {
        lastVideoTime = video.currentTime;
        const results = landmarkerRef.current.detectForVideo(video, performance.now());

        if (results.landmarks && results.landmarks.length > 0) {
          const landmarks = results.landmarks[0];
          
          // Index finger tip (8) and Thumb tip (4)
          const indexTip = landmarks[8];
          const thumbTip = landmarks[4];
          
          // Center of the palm approx (9) or just use index finger as cursor
          const cursorX = indexTip.x;
          const cursorY = indexTip.y;
          
          // Calculate distance between thumb and index to detect grab (pinch)
          const distance = Math.sqrt(
            Math.pow(indexTip.x - thumbTip.x, 2) + 
            Math.pow(indexTip.y - thumbTip.y, 2) +
            Math.pow(indexTip.z - thumbTip.z, 2)
          );
          
          // Threshold for grab (adjust based on testing)
          const isGrabbing = distance < 0.08;
          
          if (onCursorUpdate) {
            onCursorUpdate({
              x: 1 - cursorX, // Mirror X to match the mirrored video feed
              y: cursorY,
              isGrabbing,
              isVisible: true
            });
          }
        } else {
          if (onCursorUpdate) {
            onCursorUpdate({ x: 0, y: 0, isGrabbing: false, isVisible: false });
          }
        }
      }
      requestRef.current = requestAnimationFrame(predict);
    };

    video.addEventListener('loadeddata', () => {
      requestRef.current = requestAnimationFrame(predict);
    });

    // If video is already playing
    if (video.readyState >= 2 && !video.paused) {
      requestRef.current = requestAnimationFrame(predict);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isReady, videoRef, onCursorUpdate]);

  return { isReady };
}
