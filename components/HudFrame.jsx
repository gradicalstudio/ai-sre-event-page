export default function HUDFrame({ children }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "16/9" }}>

      {/* HUD Frame SVG overlay */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        className="absolute inset-0 pointer-events-none z-10"
      >
        <defs>
          <pattern
            id="dashPat"
            x="0" y="0"
            width="16" height="16"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect x="0" y="0" width="8" height="16" fill="rgba(255,255,255,0.18)" />
          </pattern>
        </defs>

        {/* ── TOP STRIP ── */}
        {/* outer line */}
        <line x1="0"    y1="0"   x2="1600" y2="0"   stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        {/* hatch fill */}
        <rect x="0" y="0" width="1600" height="22" fill="url(#dashPat)" />
        {/* inner line */}
        <line x1="0"    y1="22"  x2="1600" y2="22"  stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

        {/* ── BOTTOM STRIP ── */}
        <line x1="0"    y1="878" x2="1600" y2="878" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <rect x="0" y="878" width="1600" height="22" fill="url(#dashPat)" />
        <line x1="0"    y1="900" x2="1600" y2="900" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

        {/* ── LEFT STRIP ── */}
        <line x1="0"    y1="0"   x2="0"    y2="900" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <rect x="0" y="0" width="22" height="900" fill="url(#dashPat)" />
        <line x1="22"   y1="0"   x2="22"   y2="900" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

        {/* ── RIGHT STRIP ── */}
        <line x1="1578" y1="0"   x2="1578" y2="900" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <rect x="1578" y="0" width="22" height="900" fill="url(#dashPat)" />
        <line x1="1600" y1="0"   x2="1600" y2="900" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

        {/* ── CORNER L-ACCENTS on inner boundary (x=22, y=22) ── */}
        {/* Top Left */}
        <line x1="22"  y1="22"  x2="100"  y2="22"  stroke="#c0440a" strokeWidth="2.5" />
        <line x1="22"  y1="22"  x2="22"   y2="100" stroke="#c0440a" strokeWidth="2.5" />
        {/* Top Right */}
        <line x1="1578" y1="22"  x2="1500" y2="22"  stroke="#c0440a" strokeWidth="2.5" />
        <line x1="1578" y1="22"  x2="1578" y2="100" stroke="#c0440a" strokeWidth="2.5" />
        {/* Bottom Left */}
        <line x1="22"  y1="878" x2="100"  y2="878" stroke="#c0440a" strokeWidth="2.5" />
        <line x1="22"  y1="878" x2="22"   y2="800" stroke="#c0440a" strokeWidth="2.5" />
        {/* Bottom Right */}
        <line x1="1578" y1="878" x2="1500" y2="878" stroke="#c0440a" strokeWidth="2.5" />
        <line x1="1578" y1="878" x2="1578" y2="800" stroke="#c0440a" strokeWidth="2.5" />
      </svg>

      {/* Video slot — sits inside the inner boundary (22px = 1.375% h, 2.44% v) */}
      <div
        className="absolute overflow-hidden"
        style={{ top: "2.44%", bottom: "2.44%", left: "1.375%", right: "1.375%" }}
      >
        {children}
      </div>

    </div>
  );
}