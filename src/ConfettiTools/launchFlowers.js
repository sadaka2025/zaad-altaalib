// src/
import confetti from 'canvas-confetti';

export function launchFlowers() {
  const end = Date.now() + 800; // durée ~0.8s

  (function frame() {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      shapes: ['circle'], // 🌸 on pourra remplacer par custom shape
      colors: ['#f472b6', '#ec4899', '#db2777', '#be185d'],
    });

    confetti({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      shapes: ['circle'],
      colors: ['#f472b6', '#ec4899', '#db2777', '#be185d'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
