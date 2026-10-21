const illustration = document.querySelector('.hero-art');
const vanes = [...document.querySelectorAll('.kinetic-board .vane')];
const orbitBalls = document.querySelector('.orbit-balls');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let frame = 0;

const clamp = value => Math.max(0, Math.min(1, value));
const phase = (progress, start, end) => {
  const t = clamp((progress - start) / (end - start));
  return t * t * (3 - 2 * t);
};

function renderMotion() {
  frame = 0;
  const viewport = window.innerHeight;
  const bounds = illustration.getBoundingClientRect();
  // Track the artwork as it moves through the viewport in normal document flow.
  // Start at its initial position when already visible, or on entry further down.
  const start = Math.min(viewport * 0.9, bounds.top + window.scrollY);
  const progress = reducedMotion.matches ? 0
    : clamp((start - bounds.top) / Math.max(1, start + bounds.height * 0.55));

  const angles = [
    -30 + 210 * phase(progress, 0, 0.62),
    -30 - 160 * phase(progress, 0.15, 0.85),
    24 + 220 * phase(progress, 0.35, 1),
  ];
  vanes.forEach((vane, index) => {
    vane.style.transform = `rotate(${angles[index]}deg)`;
  });
  // Negative rotation is counterclockwise in SVG's screen coordinates.
  orbitBalls.style.transform = `rotate(${-180 * phase(progress, 0, 1)}deg)`;
}

function requestMotion() {
  if (!frame) frame = window.requestAnimationFrame(renderMotion);
}

window.addEventListener('scroll', requestMotion, { passive: true });
window.addEventListener('resize', requestMotion);
window.addEventListener('pageshow', requestMotion);
reducedMotion.addEventListener('change', requestMotion);
// Local-file previews can finish loading the font after the first paint.
if (document.fonts) document.fonts.ready.then(requestMotion);
renderMotion();
