import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// Component: LogoWithNetflixAnimation
// Usage: import LogoWithNetflixAnimation from './LogoWithNetflixAnimation';
// Ensure: npm install gsap
// This component renders an SVG-based "Basera-Site" logo with a Netflix-style reveal

export default function LogoWithNetflixAnimation({
  className = "",
  size = 220,
}) {
  const svgRef = useRef(null);
  const maskRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean);
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1) small entrance for whole SVG
    tl.from(svgRef.current, { opacity: 0, y: -18, scale: 0.95, duration: 0.6 });

    // 2) animate mask sliding left-to-right revealing the red fill
    // maskRect covers the text initially (x = -width) and moves to the right
    tl.fromTo(
      maskRef.current,
      { attr: { x: -size } },
      { attr: { x: size }, duration: 0.9, ease: "power2.inOut" },
      "-=" + 0.3
    );

    // 3) subtle letter pop / stagger for the outline strokes to give a "logo" feel
    tl.from(
      letters,
      {
        opacity: 0,
        y: 8,
        stagger: 0.05,
        duration: 0.45,
      },
      "-=" + 0.6
    );

    // 4) small glow pulse on the red fill after reveal
    tl.to(
      svgRef.current.querySelectorAll(".fill-red"),
      { filter: "drop-shadow(0 6px 8px rgba(200,30,40,0.12))", duration: 0.6 },
      "+=0.05"
    );

    return () => tl.kill();
  }, [size]);

  const title = "Basera-Site";

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        ref={svgRef}
        width={size}
        height={Math.round(size * 0.35)}
        viewBox={`0 0 ${size} ${Math.round(size * 0.35)}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Basera-Site logo"
      >
        <defs>
          {/* red fill for reveal */}
          <linearGradient id="gRed" x1="0" x2="1">
            <stop offset="0%" stopColor="#e50914" />
            <stop offset="100%" stopColor="#ff3b3b" />
          </linearGradient>

          {/* Mask that will slide to reveal the fill */}
          <mask id="revealMask">
            {/* start with black (transparent) */}
            <rect
              ref={maskRef}
              x={-size}
              y="0"
              width={size * 2}
              height="100%"
              fill="#ffffff"
            />
          </mask>

          {/* simple subtle stroke blur (for modern look) */}
          <filter id="soften">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.2" />
          </filter>
        </defs>

        {/* Background transparent rectangle (optional) */}
        <rect x="0" y="0" width="100%" height="100%" fill="transparent" />

        {/* Outline / stroke text (grey) */}
        <g transform={`translate(${size * 0.02}, ${Math.round(size * 0.25)})`}>
          {title.split("").map((ch, i) => {
            const x = i * (size / 14); // spacing tuned for aesthetic
            return (
              <text
                key={i}
                ref={(el) => (lettersRef.current[i] = el)}
                x={x}
                y={0}
                fontFamily="Helvetica, Arial, sans-serif"
                fontWeight={700}
                fontSize={Math.round(size * 0.12)}
                fill="none"
                stroke="#6b7280"
                strokeWidth={1}
                style={{ paintOrder: "stroke" }}
              >
                {ch === " " ? "\u00A0" : ch}
              </text>
            );
          })}
        </g>

        {/* Colored fill text placed on top, revealed by mask */}
        <g
          transform={`translate(${size * 0.02}, ${Math.round(size * 0.25)})`}
          mask="url(#revealMask)"
        >
          {title.split("").map((ch, i) => {
            const x = i * (size / 14);
            return (
              <text
                key={"f" + i}
                x={x}
                y={0}
                fontFamily="Helvetica, Arial, sans-serif"
                fontWeight={800}
                fontSize={Math.round(size * 0.12)}
                className="fill-red"
                fill="url(#gRed)"
                style={{ transformOrigin: "center" }}
              >
                {ch === " " ? "\u00A0" : ch}
              </text>
            );
          })}
        </g>

        {/* optional small subtitle under the logo */}
        <text
          x={size * 0.02}
          y={Math.round(size * 0.32)}
          fontFamily="Inter, Arial, sans-serif"
          fontSize={Math.round(size * 0.045)}
          fill="#6b7280"
        >
          Start your journey
        </text>
      </svg>
    </div>
  );
}
