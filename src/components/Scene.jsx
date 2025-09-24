// src/components/Scene.jsx
// @ts-nocheck
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Scene({ text }) {
  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scene',
        start: 'top top',
        end: '+=7000',
        scrub: 1,
        pin: true,
      },
    });

    tl.to('.dis', {
      opacity: 0,
      y: -50,
      rotation: -50,
      stagger: 2,
      duration: 2,
      ease: 'power2.out',
    });
    tl.to('.text:nth-child(10)', {
      x: '-450%',
      stagger: 2,
      duration: 2,
      ease: 'power2.out',
    });
    tl.to('.text:nth-child(14)', {
      x: '-1080%',
      stagger: 2,
      duration: 2,
      ease: 'power2.out',
    });
    tl.to('.text:nth-child(19)', {
      x: '-750%',
      stagger: 2,
      duration: 2,
      ease: 'power2.out',
    });
    tl.to('.gear', {
      x: '-1000%',
      rotation: 1480,
      duration: 3,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div className="scene">
      <h1 className="animated-text">{text}</h1>
      {/* Exemple de textes dynamiques */}
      <span className="dis">Texte 1</span>
      <span className="text">Texte 2</span>
      <span className="text">Texte 3</span>
      <img src="/gear.png" alt="gear" className="gear" />

      <style>{`
        .animated-text {
          text-align: center;
          font-size: 40px;
          font-weight: bold;
          animation: blink-blue 1.5s infinite;
        }

        @keyframes blink-blue {
          0% { color: #0099ff; transform: scale(1.2);}
          25% { color: #33ccff; transform: scale(1);}
          50% { color: #66ffff; transform: scale(1.2);}
          75% { color: #33ccff; transform: scale(1);}
          100% { color: #0099ff; transform: scale(1.2);}
        }

        .dis, .text {
          font-size: 35px;
          display: inline-block;
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
