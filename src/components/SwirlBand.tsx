/** Crisp silk ribbons crossing the gap between the slogan and the schedule (opaque fills, no blur). */
export default function SwirlBand() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 390 96"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-x-0 bottom-2 h-[96px] w-full"
    >
      <defs>
        <linearGradient id="sw-wine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4F0820" />
          <stop offset="0.5" stopColor="#8E0A33" />
          <stop offset="1" stopColor="#B8083C" />
        </linearGradient>
        <linearGradient id="sw-crimson" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B8083C" />
          <stop offset="0.55" stopColor="#D81B4F" />
          <stop offset="1" stopColor="#F2604F" />
        </linearGradient>
        <linearGradient id="sw-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F2A431" />
          <stop offset="0.5" stopColor="#FCD27A" />
          <stop offset="1" stopColor="#F2A431" />
        </linearGradient>
        <linearGradient id="sw-coral" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#E8433F" />
          <stop offset="1" stopColor="#F6B53C" />
        </linearGradient>
      </defs>

      {/* back ribbon: wine -> crimson */}
      <path fill="url(#sw-wine)" d="M0,34 C70,12 140,74 210,60 C280,46 332,10 390,22 L390,66 C332,56 280,90 210,88 C140,86 70,52 0,72 Z" />
      {/* middle ribbon: crimson -> coral */}
      <path fill="url(#sw-crimson)" d="M0,50 C62,30 132,82 202,70 C272,58 332,24 390,40 L390,80 C332,70 272,92 202,92 C132,92 62,64 0,82 Z" />
      {/* second right-hand ribbon: coral -> gold, crossing the others */}
      <path fill="url(#sw-coral)" d="M390,60 C330,50 276,80 214,70 C152,60 96,20 0,26 L0,42 C96,38 152,78 214,86 C276,94 330,66 390,76 Z" />
      {/* front gold ribbon */}
      <path fill="url(#sw-gold)" d="M0,20 C70,4 150,46 215,40 C290,32 340,4 390,10 L390,24 C340,18 290,46 215,56 C150,64 70,22 0,36 Z" />
      {/* silk sheen lines */}
      <path fill="none" stroke="#FFE3AE" strokeWidth="1.2" d="M0,27 C70,11 150,52 215,46 C290,38 340,10 390,16" />
      <path fill="none" stroke="#FF9FB4" strokeWidth="1" d="M0,60 C62,42 132,90 202,80 C272,70 332,34 390,52" />
    </svg>
  )
}
