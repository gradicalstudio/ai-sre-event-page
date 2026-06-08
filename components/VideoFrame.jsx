// VideoFrame.jsx
export default function VideoFrame({ children, className = "" }) {
  return (
    <div className={`relative ${className}`} style={{ background: "#080c18" }}>

      {/* outer solid line — all 4 sides as a real div, not outline */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          border: "1px solid rgba(255,255,255,0.13)",
          zIndex: 10,
        }}
      />

      {/* //// stripe band — sits between outer and inner line */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "2px",
          border: "8px solid transparent",
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            rgba(255,255,255,0.09) 0px,
            rgba(255,255,255,0.09) 1px,
            transparent 1px,
            transparent 4px
          )`,
          backgroundClip: "border-box",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          zIndex: 10,
        }}
      />

      {/* inner solid line + orange L corners */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "11px",
          border: "1px solid rgba(255,255,255,0.10)",
          zIndex: 10,
        }}
      >
        <Corner position="tl" />
        <Corner position="tr" />
        <Corner position="bl" />
        <Corner position="br" />
      </div>

      {/* content sits just inside the inner border line */}
      <div
        className="absolute overflow-hidden"
        style={{ inset: "12px", zIndex: 1 }}
      >
        {children}
      </div>

      {/* ghost div that gives the frame its height */}
      <div className="w-full aspect-video" aria-hidden />
    </div>
  );
}

function Corner({ position }) {
  const transforms = {
    tl: "",
    tr: "scaleX(-1)",
    bl: "scaleY(-1)",
    br: "scale(-1)",
  };
  const positions = {
    tl: { top: -1, left: -1 },
    tr: { top: -1, right: -1 },
    bl: { bottom: -1, left: -1 },
    br: { bottom: -1, right: -1 },
  };

  return (
    <div
      className="absolute w-3 h-3"
      style={{ ...positions[position], transform: transforms[position] }}
    >
      <div
        className="absolute top-0 left-0 w-full"
        style={{ height: "1.5px", background: "#c04820" }}
      />
      <div
        className="absolute top-0 left-0 h-full"
        style={{ width: "1.5px", background: "#c04820" }}
      />
    </div>
  );
}