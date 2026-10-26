import type { ReactNode } from 'react'

/** Desktop-only backdrop; on phones the app column covers the whole viewport. */
function SwirlBackground() {
  return <div aria-hidden className="swirl-bg fixed inset-0 -z-10 hidden md:block" />
}

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-dvh">
      <SwirlBackground />
      <div className="app-surface relative isolate mx-auto min-h-dvh w-full max-w-app overflow-x-clip md:shadow-column">
        <div className="relative">{children}</div>
      </div>
    </div>
  )
}
