/**
 * WebGL-заголовок в шапке: Three.js + canvas-текстура.
 * Эффект «лупы»: фокус едет по строке; вне фокуса — цвет как у пунктов меню (--muted, серо-синий);
 * в сильном фокусе — свечение и «матрица» внутри буквы (маска destination-in).
 */
import * as THREE from "https://unpkg.com/three@0.161.0/build/three.module.js";

const TITLE = "Портфолио Андрея Алексеевича";
const FONT_CSS_PX = 24;

/** Как у ссылок в шапке / навигации: --muted #5c6b7f */
const COLOR_MUTED = { r: 92, g: 107, b: 127 };
/** Чуть темнее для тени и мелкого контраста. */
const COLOR_MUTED_DEEP = { r: 68, g: 82, b: 98 };

const MATRIX_CHARSET =
  "ｱｲｳｴｵｶｷｸｹｺ01<>{}[];:$#_&%@/\\|XYZアイウアБВГcode";

const FOCUS_MATRIX = 0.4;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function computeLayout(dpr) {
  const measure = document.createElement("canvas").getContext("2d");
  if (!measure) return null;

  const titlePx = Math.round(FONT_CSS_PX * dpr);
  const padX = Math.round(20 * dpr);
  const padY = Math.round(12 * dpr);
  measure.font = `800 ${titlePx}px "Manrope", system-ui, sans-serif`;
  measure.textBaseline = "middle";

  const glyphs = Array.from(TITLE);
  let x = padX;
  const layout = [];
  for (const ch of glyphs) {
    const w = measure.measureText(ch).width;
    layout.push({ ch, x0: x, w, cx: x + w / 2 });
    x += w;
  }

  const contentW = x - padX;
  const totalW = Math.ceil(x + padX);
  const totalH = Math.ceil(titlePx * 1.82 + padY * 2);

  return {
    layout,
    contentW,
    pw: totalW,
    ph: totalH,
    titlePx,
    padX,
    padY,
  };
}

/**
 * Рисует в scratch: фон + «дождь», затем destination-in белой буквой — остаётся матрица только внутри глифа.
 */
function buildMatrixGlyphScratch(sx, sw, sh, ch, t, dpr, fontMaskStr) {
  sx.setTransform(1, 0, 0, 1, 0, 0);
  sx.clearRect(0, 0, sw, sh);
  sx.fillStyle = "#010806";
  sx.fillRect(0, 0, sw, sh);

  const colW = Math.max(6, Math.floor(8 * dpr));
  const rowH = Math.max(8, Math.floor(11 * dpr));
  const mono = `${Math.floor(9 * dpr)}px "Cascadia Code", "Fira Code", Consolas, "Courier New", monospace`;
  sx.font = mono;
  sx.textBaseline = "top";
  sx.textAlign = "left";

  const cols = Math.ceil(sw / colW) + 1;
  for (let c = 0; c < cols; c++) {
    const x = c * colW;
    const speed = 22 + (c % 5) * 4;
    const phase = t * speed + c * 2.1;
    for (let r = -3; r < sh / rowH + 4; r++) {
      const y = ((r * rowH + phase * 1.4) % (sh + rowH * 5)) - rowH * 2;
      const idx = (c * 19 + r * 7 + Math.floor(t * 14)) % MATRIX_CHARSET.length;
      const gch = MATRIX_CHARSET[idx];
      const a = 0.28 + ((c + r + Math.floor(t * 6)) % 4) * 0.12;
      sx.fillStyle = `rgba(55, 255, 140, ${Math.min(0.95, a)})`;
      sx.fillText(gch, x, y);
    }
  }

  sx.globalCompositeOperation = "destination-in";
  sx.font = fontMaskStr;
  sx.textAlign = "center";
  sx.textBaseline = "middle";
  sx.fillStyle = "#ffffff";
  sx.fillText(ch, sw / 2, sh / 2);
  sx.globalCompositeOperation = "source-over";
}

function main() {
  const canvas = document.getElementById("brand-title-canvas");
  const brand = canvas && canvas.closest(".brand");
  const fallback = brand && brand.querySelector(".brand-title-fallback");
  if (!canvas || !brand || !fallback) return;

  if (prefersReducedMotion()) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
  } catch {
    return;
  }

  if (!renderer.getContext()) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const L = computeLayout(dpr);
  if (!L) return;

  const { layout, contentW, pw, ph, titlePx, padX } = L;
  const cssW = pw / dpr;
  const cssH = ph / dpr;

  const texCanvas = document.createElement("canvas");
  texCanvas.width = pw;
  texCanvas.height = ph;
  const texCtx = texCanvas.getContext("2d");
  if (!texCtx) return;

  const scratch = document.createElement("canvas");
  const scratchCtx = scratch.getContext("2d");
  if (!scratchCtx) return;

  const texture = new THREE.CanvasTexture(texCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const scene = new THREE.Scene();
  const worldH = 1.35;
  const worldW = worldH * (cssW / cssH);

  const camera = new THREE.OrthographicCamera(
    -worldW / 2,
    worldW / 2,
    worldH / 2,
    -worldH / 2,
    0.1,
    10
  );
  camera.position.z = 2;

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(worldW, worldH), material);
  scene.add(mesh);

  renderer.setPixelRatio(dpr);
  renderer.setSize(cssW, cssH, false);
  renderer.setClearColor(0x000000, 0);

  brand.classList.add("webgl-title-active");
  fallback.setAttribute("aria-hidden", "true");

  const clock = new THREE.Clock();
  const baseY = ph / 2;
  const fontStr = `800 ${titlePx}px "Manrope", system-ui, sans-serif`;
  const loupeSigma = Math.max(contentW * 0.085, titlePx * 0.9);

  function drawLoupeFrame(t) {
    texCtx.clearRect(0, 0, pw, ph);

    const u = Math.sin(t * 0.52) * 0.5 + 0.5;
    const focusX = padX + contentW * u;

    const withF = layout.map(function (g) {
      const d = g.cx - focusX;
      const f = Math.exp(-(d * d) / (2 * loupeSigma * loupeSigma));
      return { g, f };
    });

    withF.sort(function (a, b) {
      return a.f - b.f;
    });

    texCtx.textBaseline = "middle";
    texCtx.textAlign = "left";

    for (const row of withF) {
      const g = row.g;
      const f = row.f;
      const scale = 1 + 0.48 * f;
      const glow = f * f;

      if (f >= FOCUS_MATRIX) {
        const effPx = Math.round(titlePx * scale);
        const fontMaskStr = `800 ${effPx}px "Manrope", system-ui, sans-serif`;
        const sw = Math.ceil(g.w * scale + 18 * dpr);
        const sh = Math.ceil(titlePx * scale * 1.48 + 12 * dpr);
        scratch.width = sw;
        scratch.height = sh;

        buildMatrixGlyphScratch(scratchCtx, sw, sh, g.ch, t, dpr, fontMaskStr);

        const dx = Math.round(g.cx - sw / 2);
        const dy = Math.round(baseY - sh / 2);

        texCtx.save();
        texCtx.shadowBlur = (8 + 26 * f) * dpr;
        texCtx.shadowColor = `rgba(140, 255, 200, ${0.2 + 0.55 * f})`;
        texCtx.drawImage(scratch, 0, 0, sw, sh, dx, dy, sw, sh);
        texCtx.shadowBlur = 0;
        texCtx.restore();
        continue;
      }

      texCtx.save();
      texCtx.font = fontStr;
      texCtx.translate(g.cx, baseY);
      texCtx.scale(scale, scale);
      texCtx.translate(-g.cx, -baseY);

      texCtx.shadowBlur = glow * 6 * dpr;
      texCtx.shadowColor = `rgba(${COLOR_MUTED_DEEP.r}, ${COLOR_MUTED_DEEP.g}, ${COLOR_MUTED_DEEP.b}, ${0.12 + 0.28 * glow})`;

      texCtx.fillStyle = `rgb(${COLOR_MUTED.r}, ${COLOR_MUTED.g}, ${COLOR_MUTED.b})`;
      texCtx.fillText(g.ch, g.x0, baseY);

      texCtx.restore();
    }

    texture.needsUpdate = true;
  }

  function tick() {
    drawLoupeFrame(clock.getElapsedTime());
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  tick();
}

main();
