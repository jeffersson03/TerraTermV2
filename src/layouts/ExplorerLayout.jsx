import { Outlet } from 'react-router'

// Marco del explorador: barra superior HUD + área de trabajo a pantalla completa.
function ExplorerLayout() {
  return (
    <div className="flex h-dvh flex-col bg-void text-ink">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-grid bg-panel px-4">
        <span className="font-display text-sm font-semibold uppercase tracking-[0.08em]">
          Terra<span className="text-terra">Term</span>
        </span>
        <span className="font-mono text-xs tabular-nums text-ink-muted">EXPLORER // v0.1</span>
      </header>

      <main className="relative flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}

export default ExplorerLayout
