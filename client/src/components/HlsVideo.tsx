'use client';

import { useEffect, useRef, useState } from 'react';
import type Hls from 'hls.js';
import type { Level } from 'hls.js';

const PROGRESS_PREFIX = 'netflex:progress:';
const SAVE_EVERY_MS = 5000;

interface Props {
  src: string;
  /** Key for remembering the playback position */
  progressKey: string;
  title: string;
  poster?: string;
}

function readProgress(key: string): number {
  try {
    const value = Number(window.localStorage.getItem(PROGRESS_PREFIX + key));
    return Number.isFinite(value) && value > 0 ? value : 0;
  } catch {
    return 0;
  }
}

function writeProgress(key: string, seconds: number | null) {
  try {
    if (seconds === null) window.localStorage.removeItem(PROGRESS_PREFIX + key);
    else window.localStorage.setItem(PROGRESS_PREFIX + key, String(Math.floor(seconds)));
  } catch {
    // Storage unavailable: resume just won't be remembered.
  }
}

/**
 * Adaptive (HLS) video player. Uses the browser's native HLS where available (Safari, iOS)
 * and hls.js elsewhere. Remembers where the viewer stopped and offers a quality picker.
 */
export default function HlsVideo({ src, progressKey, title, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const [level, setLevel] = useState(-1); // -1 = auto
  const [error, setError] = useState<string | null>(null);
  const [resumeAt, setResumeAt] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;
    setError(null);
    setLevels([]);

    const saved = readProgress(progressKey);
    setResumeAt(saved);

    const startPlayback = () => {
      if (saved > 0) video.currentTime = saved;
      video.play().catch(() => {
        // Autoplay with sound can be blocked; the viewer can press play.
      });
    };

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', startPlayback, { once: true });
    } else {
      import('hls.js').then(({ default: HlsLib }) => {
        if (cancelled) return;
        if (!HlsLib.isSupported()) {
          setError('This browser can’t play adaptive video. Try Chrome, Edge, Firefox or Safari.');
          return;
        }
        const hls = new HlsLib({ capLevelToPlayerSize: true });
        hlsRef.current = hls;
        hls.on(HlsLib.Events.MANIFEST_PARSED, (_e, data) => {
          setLevels(data.levels);
          startPlayback();
        });
        hls.on(HlsLib.Events.ERROR, (_e, data) => {
          if (!data.fatal) return;
          if (data.type === HlsLib.ErrorTypes.NETWORK_ERROR && data.details !== 'manifestLoadError') {
            hls.startLoad();
          } else if (data.type === HlsLib.ErrorTypes.MEDIA_ERROR) {
            hls.recoverMediaError();
          } else {
            setError(
              data.details === 'manifestLoadError'
                ? 'This film isn’t available yet. If it was just uploaded, it may still be encoding.'
                : 'Playback failed. Please try again.'
            );
            hls.destroy();
          }
        });
        hls.loadSource(src);
        hls.attachMedia(video);
      });
    }

    // Save position periodically and when leaving; clear it once the film is finished.
    let lastSave = 0;
    const onTime = () => {
      const now = Date.now();
      if (now - lastSave > SAVE_EVERY_MS) {
        lastSave = now;
        writeProgress(progressKey, video.currentTime);
      }
    };
    const onEnded = () => writeProgress(progressKey, null);
    video.addEventListener('timeupdate', onTime);
    video.addEventListener('ended', onEnded);

    return () => {
      cancelled = true;
      if (video.currentTime > 0 && !video.ended) {
        // Near the end counts as finished.
        const nearEnd = video.duration && video.duration - video.currentTime < 30;
        writeProgress(progressKey, nearEnd ? null : video.currentTime);
      }
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('ended', onEnded);
      hlsRef.current?.destroy();
      hlsRef.current = null;
      video.removeAttribute('src');
      video.load();
    };
  }, [src, progressKey]);

  const chooseLevel = (value: number) => {
    setLevel(value);
    if (hlsRef.current) hlsRef.current.currentLevel = value;
  };

  const startOver = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setResumeAt(0);
    writeProgress(progressKey, null);
  };

  return (
    <div className="hls">
      {/* Captions can be added per film later via <track>; none are uploaded yet. */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video ref={videoRef} className="hls__video" controls playsInline poster={poster} aria-label={title} />

      {error && (
        <div className="hls__error" role="alert">
          {error}
        </div>
      )}

      <div className="hls__tools">
        {resumeAt > 0 && (
          <button className="hls__chip" onClick={startOver}>
            ↺ Start over
          </button>
        )}
        {levels.length > 1 && (
          <label className="hls__chip">
            Quality
            <select value={level} onChange={(e) => chooseLevel(Number(e.target.value))}>
              <option value={-1}>Auto</option>
              {levels
                .map((l, i) => ({ height: l.height, i }))
                .sort((a, b) => b.height - a.height)
                .map(({ height, i }) => (
                  <option key={i} value={i}>
                    {height}p
                  </option>
                ))}
            </select>
          </label>
        )}
      </div>
    </div>
  );
}
