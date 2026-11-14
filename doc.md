# TerraTerm — Documentación de componentes

> Estado actual del frontend para que cualquier colaborador sepa **qué hace cada archivo**, **dónde agregar código nuevo** y **qué convenciones seguir**.
> Última actualización: 2026-11-14 · Versión UI: `v0.1`
> Plan de trabajo por módulos: ver [`plan.md`](plan.md).

---

## 1. Stack

| Herramienta | Versión | Uso |
|---|---|---|
| React | 19 | Interfaz (JSX) con React Compiler activo |
| Vite | 8 | Servidor de desarrollo y build |
| Tailwind CSS | 4 | Estilos y responsive (configuración vía `@theme` en CSS, sin `tailwind.config.js`) |
| React Router | 8 | Rutas (`react-router` y `react-router/dom`) |
| Three.js | 0.187 | Motor 3D |
| @react-three/fiber | 9 | Three.js declarativo con componentes React |
| @react-three/drei | 10 | Utilidades 3D (`OrbitControls`, `Stars`, …) |

**Alias:** `@/` apunta a `src/` (definido en `vite.config.js` y `jsconfig.json`).
Usar siempre `@/...` en lugar de rutas relativas largas (`../../..`).

---

## 2. Flujo actual

```
index.html
 └─ src/main.jsx            → monta React y carga los estilos globales
     └─ src/App.jsx         → RouterProvider
         └─ appRouter       → ruta "/"
             └─ ExplorerLayout     (barra HUD + área de trabajo)
                 └─ ExplorerPage   (página del explorador)
                     └─ GlobeCanvas      (escena 3D)
                         └─ EarthGlobe   (planeta)
                             └─ GlobeGraticule (retícula lat/lon)
```

El usuario entra **directo al explorador** (no hay landing page).

---

## 3. Archivos y responsabilidades

### Entrada

| Archivo | Responsabilidad |
|---|---|
| `index.html` | HTML base (`lang="es"`), carga de fuentes Google (Space Grotesk, JetBrains Mono) y punto de montaje `#root`. |
| `src/main.jsx` | Crea la raíz de React, importa `index.css` y renderiza `<App />` en `StrictMode`. |
| `src/App.jsx` | Solo monta el `RouterProvider`. No debe contener lógica de negocio ni UI. |

### Router — `src/router/`

| Archivo | Responsabilidad |
|---|---|
| `routePaths.js` | Constante `ROUTE_PATHS` con todas las URLs. **Nunca escribir rutas a mano** en componentes; importar desde aquí. |
| `appRouter.jsx` | Define el árbol de rutas con `createBrowserRouter`. Hoy: `/` → `ExplorerLayout` → `ExplorerPage` (index), con `RouteErrorPage` como `errorElement`. |

### Layouts — `src/layouts/`

| Archivo | Responsabilidad |
|---|---|
| `ExplorerLayout.jsx` | Marco a pantalla completa (`h-dvh`): barra superior HUD (logo + versión) y `<main>` donde se renderiza la página activa mediante `<Outlet />`. Aquí irán, más adelante, sidebar de filtros y paneles. |

### Páginas — `src/pages/`

| Archivo | Responsabilidad |
|---|---|
| `ExplorerPage.jsx` | Página principal. Por ahora solo contiene `GlobeCanvas`. Aquí se componen las features (filtros, dashboard, alertas, asistente). |
| `RouteErrorPage.jsx` | Pantalla de error: muestra "404" si la ruta no existe o un error genérico si algo falla al renderizar. Botón para volver al explorador. |

### Feature: Globo 3D — `src/features/globe/`

| Archivo | Responsabilidad |
|---|---|
| `components/GlobeCanvas.jsx` | Escena 3D: `<Canvas>` de Fiber, cámara, luces (ambiental + direccional), fondo de estrellas (`Stars`) y `OrbitControls` (rotación automática, zoom limitado, sin paneo). |
| `components/EarthGlobe.jsx` | El planeta: esfera base, retícula y halo atmosférico (esfera con `BackSide`). Acepta `children` → **las capas de datos se montan aquí** sin modificar el componente. |
| `components/GlobeGraticule.jsx` | Dibuja paralelos y meridianos como `lineSegments`. Props: `radius`, `stepDeg`, `color`. |
| `constants/globeConfig.js` | `GLOBE_CONFIG`: radio, segmentos, paso de retícula, colores, cámara y límites de zoom. **Cambiar valores aquí, no en los componentes.** |
| `utils/geoMath.js` | Funciones puras de geometría: `latLonToVector3(lat, lon, radius)` convierte coordenadas geográficas a `[x, y, z]`; `buildGraticulePositions(radius, stepDeg)` genera los vértices de la retícula. |

### Estilos — `src/styles/` y `src/index.css`

| Archivo | Responsabilidad |
|---|---|
| `src/index.css` | Importa Tailwind y el tema. |
| `src/styles/theme.css` | Tokens del sistema de diseño (skill **Design**) declarados en `@theme`, disponibles como clases de Tailwind. Estilo base de `html`/`body`. |

**Tokens disponibles:**

| Clase | Valor | Uso |
|---|---|---|
| `bg-void` | `#05080F` | Fondo principal / espacio |
| `bg-panel` | `#0B111E` | Paneles HUD, header, tarjetas |
| `bg-elevated` | `#121B2E` | Modales, tooltips, hover |
| `border-grid` | slate 15 % | Bordes y divisores |
| `border-active` | sky 50 % | Elemento seleccionado |
| `text-ink` | `#F1F5F9` | Texto principal |
| `text-ink-secondary` | `#94A3B8` | Etiquetas y unidades |
| `text-ink-muted` | `#475569` | Texto inactivo, coordenadas de fondo |
| `text-terra` / `bg-terra` | `#F59E0B` | Acento vista terrestre (LST) |
| `text-aqua` / `bg-aqua` | `#06B6D4` | Acento vista oceánica (SST) |
| `font-display` | Space Grotesk | Títulos y UI |
| `font-mono` | JetBrains Mono | Datos y coordenadas (usar con `tabular-nums`) |

> Three.js no entiende clases de Tailwind: los colores del globo están duplicados como hex en `globeConfig.js`. Si se cambia un token, actualizar ambos.

---

## 4. Carpetas creadas y aún vacías

| Carpeta | Qué irá ahí |
|---|---|
| `src/components/` | UI reutilizable y genérica: `HudPanel`, `Legend`, `StatTile`, `Loader`, `EmptyState`, `ErrorState`. |
| `src/features/` | Una carpeta por funcionalidad: `filters/`, `dashboard/`, `alerts/`, `assistant/`, `history/` (misma estructura que `globe/`). |
| `src/stores/` | Estado compartido: mapa (ubicación, cámara, capa), filtros (variable, periodo) y asistente. |
| `src/services/api/` | Cliente HTTP común (errores, timeout, caché). |
| `src/services/nasa/` | Adaptadores por fuente NASA (GIBS, POWER, Earthdata). |
| `src/services/geospatial/` | Tiles, proyecciones y utilidades geoespaciales del lado de datos. |
| `src/hooks/` | Hooks reutilizables (`useEnvironmentalData`, `useMediaQuery`, …). |
| `src/constants/` | Catálogo de variables ambientales (unidad, fuente, resolución, rango, paleta). |
| `src/config/` | Configuración de entorno (`import.meta.env.VITE_*`) y endpoints. |
| `src/providers/` | Providers de contexto globales si se necesitan. |
| `src/utils/` | Formateadores y helpers genéricos (fechas, unidades, escalas de color). |
| `src/assets/` | `images/`, `icons/`, `animations/`. |

---

## 5. Convenciones

- **Componentes:** un componente por archivo, nombre en PascalCase (`EarthGlobe.jsx`), `export default`.
- **Funciones:** camelCase (`latLonToVector3`). Funciones de más de 100 líneas deben dividirse y documentarse.
- **Estructura de una feature:**
  ```
  features/<nombre>/
  ├─ components/
  ├─ constants/
  ├─ hooks/
  └─ utils/
  ```
- **Separación de responsabilidades:** componentes → hooks → servicios → cliente HTTP. **Nunca** hacer `fetch` dentro de un componente visual.
- **Configuración sobre código:** valores ajustables (colores, rangos, URLs) en `constants/` o `config/`.
- **Estilos:** solo Tailwind y tokens de `theme.css`; evitar colores hex sueltos en JSX.
- **Credenciales:** nada privado en el cliente. Todo lo que empieza con `VITE_` queda expuesto en el navegador; las claves de IA o Earthdata deben ir en un backend o proxy.
- **Rigor científico:** toda visualización de datos debe mostrar fuente, unidad, periodo y resolución.

---

## 6. Cómo extender

### Agregar una capa al globo
1. Crear `src/features/globe/components/layers/<NombreCapa>.jsx`.
2. Usar `latLonToVector3` para posicionar elementos sobre la esfera.
3. Montarla como hijo: `<EarthGlobe><NombreCapa /></EarthGlobe>`.

### Agregar una ruta
1. Añadir la URL en `ROUTE_PATHS` (`routePaths.js`).
2. Crear la página en `src/pages/`.
3. Registrar la ruta en `appRouter.jsx`.

### Agregar una feature
1. Crear `src/features/<nombre>/` con la estructura indicada.
2. Si consume datos: servicio en `src/services/` + hook en la feature.
3. Componerla en `ExplorerPage.jsx` o en el layout.

---

## 7. Comandos

```bash
npm install     # instalar dependencias
npm run dev     # servidor de desarrollo
npm run build   # build de producción
npm run lint    # revisar con ESLint
```

---

## 8. Pendiente (próximos pasos)

- [ ] Estado compartido (`stores/`) para mapa, filtros y asistente.
- [ ] Catálogo de variables en `constants/` (empezar por temperatura superficial LST/SST).
- [ ] Cliente HTTP y adaptador NASA (GIBS para texturas, POWER para series).
- [ ] Textura real de la Tierra y capa térmica sobre el globo.
- [ ] Panel de filtros (ubicación, variable, periodo) y leyenda.
- [ ] Dashboard de indicadores y gráficos.
- [ ] Alertas por umbral.
- [ ] Asistente IA conectado al mapa (vía backend).
- [ ] Layout responsive (móvil: paneles como hojas inferiores).
