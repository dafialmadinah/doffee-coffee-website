"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

const TOTAL_FRAMES = 192;

function getFramePath(index: number): string {
  const clamped = Math.min(Math.max(index, 0), TOTAL_FRAMES - 1);
  const frameNumber = String(clamped).padStart(3, "0");
  const delay = clamped % 3 === 0 ? "0.041s" : "0.042s";
  return `/sequence/frame_${frameNumber}_delay-${delay}.webp`;
}

/* ─── Text beats ─── */
interface Beat {
  label: string;
  start: number;
  end: number;
}

const beats: Beat[] = [
  { label: "THE PERFECT POUR", start: 0.0, end: 0.2 },
  { label: "GRAVITY IN MOTION", start: 0.25, end: 0.45 },
  { label: "CRYSTALLINE CHILL", start: 0.5, end: 0.7 },
  { label: "READY TO DRINK", start: 0.75, end: 0.95 },
];

/* ─── Beat overlay component ─── */
function BeatOverlay({
  beat,
  scrollYProgress,
}: {
  beat: Beat;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const fadeIn = beat.start;
  const peak1 = beat.start + (beat.end - beat.start) * 0.25;
  const peak2 = beat.start + (beat.end - beat.start) * 0.75;
  const fadeOut = beat.end;

  const opacity = useTransform(
    scrollYProgress,
    [fadeIn, peak1, peak2, fadeOut],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [fadeIn, peak1, peak2, fadeOut],
    [20, 0, 0, -20]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
    >
      <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-light tracking-[0.15em] text-[#F9F4EF] sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
        {beat.label}
      </h2>
    </motion.div>
  );
}

/* ─── Main component ─── */
export default function CoffeeScrollSequence() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0001,
  });

  /* ── Draw a frame onto the canvas ── */
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Resize canvas to match container
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Crop source image: trim left/right sides to remove Veo watermark
    const cropX = img.naturalWidth * 0.10;          // crop 10% from each side
    const cropW = img.naturalWidth - cropX * 2;     // remaining center width
    const srcX = cropX;
    const srcY = 0;
    const srcW = cropW;
    const srcH = img.naturalHeight;

    // No zoom — fixed 0.7x scale (far away)
    const scale = 0.7;

    // Cover-fit the cropped source onto the canvas
    const croppedAspect = srcW / srcH;
    const canvasAspect = rect.width / rect.height;

    let drawW: number, drawH: number, drawX: number, drawY: number;
    if (croppedAspect > canvasAspect) {
      drawH = rect.height * scale;
      drawW = drawH * croppedAspect;
      drawX = (rect.width - drawW) / 2;
      drawY = (rect.height - drawH) / 2;
    } else {
      drawW = rect.width * scale;
      drawH = drawW / croppedAspect;
      drawX = (rect.width - drawW) / 2;
      drawY = (rect.height - drawH) / 2;
    }

    ctx.drawImage(img, srcX, srcY, srcW, srcH, drawX, drawY, drawW, drawH);
  }, []);

  /* ── Preload all images ── */
  useEffect(() => {
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCountRef.current++;
        // Draw first frame as soon as it's ready
        if (i === 0) drawFrame(0);
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      images.forEach((img) => {
        img.onload = null;
        img.src = "";
      });
    };
  }, [drawFrame]);

  /* ── Listen to scroll progress to update canvas ── */
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const frameIndex = Math.min(
      Math.floor(latest * TOTAL_FRAMES),
      TOTAL_FRAMES - 1
    );

    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
    }
  });

  /* ── Resize handling ── */
  useEffect(() => {
    const onResize = () => {
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  return (
    <section id="the-craft" className="relative bg-black">
      {/* 400vh scroll wrapper */}
      <div ref={wrapperRef} className="relative h-[400vh]">
        {/* Sticky inner container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full bg-black"
          />

          {/* Vignette overlay for depth */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.5)_100%)]" />

          {/* Text overlays */}
          {beats.map((beat) => (
            <BeatOverlay
              key={beat.label}
              beat={beat}
              scrollYProgress={scrollYProgress}
            />
          ))}

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 z-30 h-[2px] bg-gradient-to-r from-[#D48C45] to-[#D48C45]/40"
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
}
