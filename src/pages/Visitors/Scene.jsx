// src/components/Scene.jsx
// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Scene({
  text,
  extraTexts = [],
  className = '',
  imageSrc = null,
  imageClassName = '',
  style = {}, // 👈 ajout
}) {
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
    <div
      ref={sceneRef}
      style={style} // 👈 appliqué ici
      className="scene-simple inline-flex items-center justify-center gap-2"
    >
      {/* Image dynamique */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt="scene-image"
          className={`gear ${imageClassName}`}
        />
      )}

      {/* Texte animé */}
      {text && <span className={`animated-text ${className}`}>{text}</span>}

      {extraTexts.length > 0 &&
        extraTexts.map((t, i) => (
          <span key={i} className={i === 0 ? 'dis' : 'text'}>
            {t}
          </span>
        ))}

      <style>{`
        .scene-simple {
          position: relative;
          margin-top: 0; /* laisse le parent gérer l'espacement */
        }

        .animated-text {
          font-weight: bold;
          animation: blink-blue 1.5s infinite;
          // font-size: 18px;
        }

        @keyframes blink-blue {
          0% { color: #df7093ff; transform: scale(1.1);}
          25% { color: #60d691ff; transform: scale(1);}
          50% { color: #a38b3dff; transform: scale(1.1);}
          75% { color: #d6d7dfff; transform: scale(1);}
          100% { color: #c9741aff; transform: scale(1.1);}
        }

        .dis, .text {
          font-size: 16px;
          display: inline-block;
          margin: 0 5px;
        }

        .gear {
          display: inline-block;
          object-fit: cover;
          /* rotation animée via gsap */
        }
      `}</style>
    </div>
  );
}
