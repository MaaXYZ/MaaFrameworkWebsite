import { onMounted, onUnmounted, watch, type Ref } from "vue";

export function useParticles(canvasRef: Ref<HTMLCanvasElement | null>, enabled: Ref<boolean>, light: Ref<boolean>) {
  let cleanup = () => {};
  onMounted(() => {
    const canvas = canvasRef.value;
    const ctx = canvas?.getContext("2d", { alpha: true, desynchronized: true });
    if (!canvas || !ctx) return;

    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      vx: (Math.random() - 0.5) * 3.6, vy: (Math.random() - 0.5) * 3.6,
      size: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.3 + 0.05,
    }));
    let frame = 0;
    let timer = 0;
    let resizeTimer = 0;
    let previousTime = 0;
    let pointerTime = -Infinity;
    let mouseX = 0;
    let mouseY = 0;
    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      for (const p of particles) {
        p.x = Math.min(p.x, canvas.width);
        p.y = Math.min(p.y, canvas.height);
      }
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      frame = timer = 0;
      previousTime = 0;
    };
    const draw = (time: number) => {
      if (!enabled.value) return;
      const dt = previousTime ? Math.min((time - previousTime) / 1000, 0.1) : 1 / 24;
      previousTime = time;
      const mouseActive = time - pointerTime < 1000;
      const color = light.value ? "37, 99, 235" : "71, 202, 255";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        if (mouseActive) {
          const dx = mouseX - p.x, dy = mouseY - p.y;
          const distance = dx * dx + dy * dy;
          if (distance < 10000) {
            const force = (10000 - distance) / 10000 * 0.12 * dt;
            p.x -= dx * force;
            p.y -= dy * force;
          }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
        ctx.fill();
      }
      if (!mouseActive) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i], b = particles[j];
            const distance = Math.hypot(a.x - b.x, a.y - b.y);
            if (distance >= 80) continue;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${color}, ${0.05 * (1 - distance / 80)})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
      }
      // Sleep between draws instead of polling at the display's refresh rate.
      timer = window.setTimeout(() => { frame = requestAnimationFrame(draw); }, 1000 / 24);
    };
    const pointer = (event: MouseEvent) => {
      if (!enabled.value) return;
      mouseX = event.clientX;
      mouseY = event.clientY; // The canvas is fixed to the viewport.
      pointerTime = performance.now();
    };
    const scheduleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };
    resize();
    window.addEventListener("mousemove", pointer, { passive: true });
    window.addEventListener("resize", scheduleResize, { passive: true });
    const stopWatch = watch(enabled, (running) => {
      stop();
      if (running) frame = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, { immediate: true, flush: "sync" });
    cleanup = () => {
      stopWatch();
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener("mousemove", pointer);
      window.removeEventListener("resize", scheduleResize);
    };
  });
  onUnmounted(() => { cleanup(); });
}
