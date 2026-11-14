// Configuración visual del globo. Los colores replican los tokens de src/styles/theme.css
// porque Three.js necesita valores hex, no clases de Tailwind.
export const GLOBE_CONFIG = Object.freeze({
  radius: 1,
  segments: 64,
  graticuleStepDeg: 15,
  colors: {
    space: '#05080F',
    surface: '#0B111E',
    graticule: '#94A3B8',
    atmosphere: '#38BDF8',
  },
  camera: { position: [0, 0, 3.2], fov: 45 },
  controls: { minDistance: 1.6, maxDistance: 6, autoRotateSpeed: 0.3 },
})
