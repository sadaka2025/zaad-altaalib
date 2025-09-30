import React, { useEffect } from 'react';

const Confettipluie = ({ duration = 7000, shapes = ['🌙', '⭐', '❤️'] }) => {
  useEffect(() => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.overflow = 'visible';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    const confettis = [];

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    function createConfetto() {
      const span = document.createElement('span');
      span.innerText = shapes[Math.floor(Math.random() * shapes.length)];
      span.style.fontSize = `${random(14, 28)}px`;
      span.style.position = 'absolute';
      span.style.top = `-20px`;
      span.style.left = `${random(0, window.innerWidth)}px`;
      span.style.opacity = 0.9;
      span.style.userSelect = 'none';
      container.appendChild(span);

      const dx = random(-1, 1);
      const dy = random(3, 6);

      confettis.push({ el: span, dx, dy });
    }

    let animationFrame;

    function animate() {
      confettis.forEach((c, i) => {
        const top = parseFloat(c.el.style.top);
        const left = parseFloat(c.el.style.left);
        c.el.style.top = `${top + c.dy}px`;
        c.el.style.left = `${left + c.dx}px`;

        if (top > window.innerHeight) {
          container.removeChild(c.el);
          confettis.splice(i, 1);
        }
      });
      animationFrame = requestAnimationFrame(animate);
    }

    // 🌧️ Pluie en rythme (rafales + pauses)
    let rainActive = true;
    function rainLoop() {
      if (!rainActive) return;

      const batchSize = Math.floor(random(1, 4)); // nombre d’éléments par vague
      for (let i = 0; i < batchSize; i++) createConfetto();

      const nextDelay = random(30, 100); // délai variable avant la prochaine vague
      setTimeout(rainLoop, nextDelay);
    }

    // Lancer l'animation
    rainLoop();
    animate();

    // ⏱️ Arrêt automatique après `duration`
    const stopTimeout = setTimeout(() => {
      rainActive = false;
    }, duration);

    return () => {
      rainActive = false;
      clearTimeout(stopTimeout);
      cancelAnimationFrame(animationFrame);
      container.remove();
    };
  }, [duration, shapes]);

  return null;
};

export default Confettipluie;
