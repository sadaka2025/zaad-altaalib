import React, { useEffect } from 'react';

const ConfettipluieDuaa = ({
  duration = 10000,
  shapes = [
    'آواكم الله',
    'حفظكم الله',
    'نصركم الله',
    'ثبتكم الله',
    'أيَّدكم الله',
  ],
}) => {
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
    const colors = ['#16a34a', '#facc15', '#ffffff', '#0ea5e9', '#f97316'];

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    function createConfetto() {
      const span = document.createElement('span');
      span.innerText = shapes[Math.floor(Math.random() * shapes.length)];

      let fontSize = random(16, 26);
      const isSpecial = Math.random() < 0.25;
      if (isSpecial) {
        fontSize *= 1.5;
        span.style.textShadow = `0 0 6px rgba(255,255,255,0.9), 
                                 0 0 12px rgba(255,215,0,0.8)`;
      }

      span.style.fontSize = `${fontSize}px`;
      span.style.fontWeight = 'bold';
      span.style.fontFamily = 'Arial, "Amiri", "Scheherazade", serif';
      span.style.position = 'absolute';
      // البداية من الأسفل
      span.style.top = `${window.innerHeight + 20}px`;
      span.style.left = `${random(0, window.innerWidth - 150)}px`;
      span.style.opacity = 0.95;
      span.style.userSelect = 'none';
      span.style.direction = 'rtl';
      span.style.whiteSpace = 'nowrap';
      span.style.color = colors[Math.floor(Math.random() * colors.length)];
      span.style.transform = `rotate(${random(-20, 20)}deg)`;

      container.appendChild(span);

      const dx = random(-0.5, 0.5);
      // dy سالب لتحريكها للأعلى
      const dy = -random(1, 3);
      const rotationSpeed = random(-0.5, 0.5);

      confettis.push({ el: span, dx, dy, rotation: 0, rotationSpeed });
    }

    let animationFrame;

    function animate() {
      confettis.forEach((c, i) => {
        const top = parseFloat(c.el.style.top);
        const left = parseFloat(c.el.style.left);
        // c.rotation += c.rotationSpeed;

        c.el.style.top = `${top + c.dy}px`;
        c.el.style.left = `${left + c.dx}px`;
        // c.el.style.transform = `rotate(${c.rotation}deg)`;

        // إزالة إذا خرجت من أعلى الشاشة
        if (top < -50) {
          container.removeChild(c.el);
          confettis.splice(i, 1);
        }
      });
      animationFrame = requestAnimationFrame(animate);
    }

    // إنشاء دفعات من الكلمات
    for (let i = 0; i < 20; i++) {
      createConfetto();
    }

    animate();

    // إيقاف الكومبوننت بعد duration
    const stopTimeout = setTimeout(() => {
      cancelAnimationFrame(animationFrame);
      container.remove();
    }, duration);

    return () => {
      clearTimeout(stopTimeout);
      cancelAnimationFrame(animationFrame);
      container.remove();
    };
  }, [duration, shapes]);

  return null;
};

export default ConfettipluieDuaa;
