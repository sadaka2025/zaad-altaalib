// src/components/Scene.jsx
// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Scene({ text, extraTexts = [], fontSize = '15px' }) {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const texts = scene.querySelectorAll('.text'); // tous les textes dynamiques
    const dis = scene.querySelectorAll('.dis'); // les textes .dis

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: 'top top',
        end: '+=7000',
        scrub: 1,
        pin: true,
      },
    });

    // Animer les .dis
    if (dis.length) {
      tl.to(dis, {
        opacity: 0,
        y: -50,
        rotation: -50,
        stagger: 0.5,
        duration: 2,
        ease: 'power2.out',
      });
    }

    // Animer les .text
    if (texts.length) {
      tl.to(texts, {
        x: '-200%',
        stagger: 0.5,
        duration: 2,
        ease: 'power2.out',
      });
    }

    // Si tu veux une animation pour la gear
    const gear = scene.querySelector('.gear');
    if (gear) {
      tl.to(gear, {
        x: '-1000%',
        rotation: 1480,
        duration: 3,
        ease: 'power2.out',
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="scene" ref={sceneRef}>
      <h1 className="animated-text" style={{ fontSize }}>
        {text}
      </h1>

      <span className="dis"></span>
      {extraTexts.map((t, i) => (
        <span key={i} className="text">
          {t}
        </span>
      ))}

      <img src="/gear.png" alt="gear" className="gear" />

      <style>{`
        .animated-text {
          text-align: center;
          font-size: 40px;
          font-weight: bold;
          animation: blink-blue 1.5s infinite;
        }

        @keyframes blink-blue {
               0% { color: #1500ffff; transform: scale(1.2);}
               25% { color: #2f4588ff; transform: scale(1);}
               50% { color: #668aff8c; transform: scale(1.2);}
               75% { color: rgba(28, 44, 169, 1); transform: scale(1);}
               100% { color: #0000ffff; transform: scale(1.2);}
             }

        .dis, .text {
          font-size: 35px;
          display: inline-block;
          margin: 0 5px;
        }

        .gear {
          width: 100px;
          position: fixed;
          right: -150px;
          top: 60%;
        }
      `}</style>
    </div>
  );
}
