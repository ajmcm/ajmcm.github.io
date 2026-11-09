(() => {
  const canvas = document.querySelector('#network');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, frame = 0, visible = true, pointer = null;
  // Deterministic points keep the composition stable between visits.
  const points = Array.from({ length: 58 }, (_, i) => {
    const angle = i * 2.399963;
    const radius = Math.sqrt((i + 1) / 58);
    return { x: .5 + Math.cos(angle) * radius * .35, y: .5 + Math.sin(angle) * radius * .34, phase: i * 1.7 };
  });
  function draw(time = 0) {
    ctx.clearRect(0, 0, width, height);
    const t = reduced.matches ? 0 : time * .0002;
    const nodes = points.map(p => ({ x: (p.x + Math.sin(t + p.phase) * .012) * width, y: (p.y + Math.cos(t + p.phase) * .012) * height }));
    nodes.forEach((a, i) => {
      nodes.slice(i + 1).forEach(b => {
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance < width * .22) {
          ctx.strokeStyle = `rgba(193,241,125,${(1 - distance / (width * .22)) * .32})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      });
      const near = pointer && Math.hypot(a.x - pointer.x, a.y - pointer.y) < 80;
      ctx.fillStyle = near ? '#f0f1e9' : i % 7 === 0 ? '#c1f17d' : '#738c60';
      ctx.beginPath(); ctx.arc(a.x, a.y, near ? 3 : i % 7 === 0 ? 2.8 : 1.6, 0, Math.PI * 2); ctx.fill();
    });
    frame = 0;
    if (!reduced.matches && visible && !document.hidden) frame = requestAnimationFrame(draw);
  }
  function restart() { cancelAnimationFrame(frame); frame = 0; draw(); }
  new ResizeObserver(() => {
    const box = canvas.getBoundingClientRect();
    width = box.width; height = box.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); restart();
  }).observe(canvas);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; restart(); }).observe(canvas);
  canvas.addEventListener('pointermove', event => { const box = canvas.getBoundingClientRect(); pointer = { x: event.clientX - box.left, y: event.clientY - box.top }; if (reduced.matches) restart(); });
  canvas.addEventListener('pointerleave', () => { pointer = null; if (reduced.matches) restart(); });
  document.addEventListener('visibilitychange', restart);
  reduced.addEventListener('change', restart);
})();
