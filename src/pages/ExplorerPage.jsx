import GlobeCanvas from '@/features/globe/components/GlobeCanvas'

// Página principal: por ahora solo el globo; luego se suman filtros, dashboard y asistente.
function ExplorerPage() {
  return (
    <section className="absolute inset-0" aria-label="Globo terráqueo interactivo">
      <GlobeCanvas />
    </section>
  )
}

export default ExplorerPage
