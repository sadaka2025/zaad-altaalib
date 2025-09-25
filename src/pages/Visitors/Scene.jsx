// src/components/Scene.jsx
// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Scene({ text, extraTexts = [], className = '' }) {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const ctx = gsap.context(() => {
      const texts = sceneRef.current.querySelectorAll('.text');
      const dis = sceneRef.current.querySelectorAll('.dis');
      const gear = sceneRef.current.querySelector('.gear');

      const tl = gsap.timeline();

      if (dis.length) {
        tl.fromTo(
          dis,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }
        );
      }

      if (texts.length) {
        tl.fromTo(
          texts,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, stagger: 0.3, duration: 1.2, ease: 'power2.out' }
        );
      }

      if (gear) {
        tl.to(gear, {
          rotation: 360,
          repeat: -1,
          duration: 6,
          ease: 'linear',
        });
      }
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sceneRef} className="scene-simple">
      <h1 className={`animated-text ${className}`}>{text}</h1>

      {extraTexts.length > 0 && (
        <span className="dis">{extraTexts[0] || ' '}</span>
      )}
      {extraTexts.slice(1).map((t, i) => (
        <span key={i} className="text">
          {t}
        </span>
      ))}

      <img src="/images/logo.png" alt="gear" className="gear" />

      <style>{`
        .scene-simple {
          width: 100%;
          text-align: center;
          margin-top: 10px;
          position: relative;
        }

        .animated-text {
          font-weight: bold;
          animation: blink-blue 1.5s infinite;
          font-size: 18px;
        }

        @keyframes blink-blue {
          0% { color: #1500ff; transform: scale(1.1);}
          25% { color: #2f4588; transform: scale(1);}
          50% { color: #668aff; transform: scale(1.1);}
          75% { color: #1c2ca9; transform: scale(1);}
          100% { color: #0000ff; transform: scale(1.1);}
        }

        .dis, .text {
          font-size: 16px;
          display: inline-block;
          margin: 0 5px;
        }

        .gear {
          width: 60px;
          position: relative;
          margin-left: 10px;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}
