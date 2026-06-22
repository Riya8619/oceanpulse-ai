import React from "react";

export default function OceanBackground({ intensity = "medium" }) {
  const opacityMap = { light: "0.03", medium: "0.06", heavy: "0.1" };
  const op = opacityMap[intensity] || "0.06";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Animated wave layers */}
      <svg className="absolute bottom-0 left-0 w-full h-40 opacity-20" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill="url(#wave1)"
          className="animate-wave"
        />
        <defs>
          <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#006EE6" />
            <stop offset="50%" stopColor="#00D2D3" />
            <stop offset="100%" stopColor="#1CE0C6" />
          </linearGradient>
        </defs>
      </svg>
      <svg className="absolute bottom-0 left-0 w-full h-32 opacity-10" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ animationDelay: "2s" }}>
        <path
          d="M0,80 C360,20 720,100 1080,40 C1260,10 1360,70 1440,50 L1440,120 L0,120 Z"
          fill="url(#wave2)"
          className="animate-wave"
          style={{ animationDelay: "1s" }}
        />
        <defs>
          <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A3C4" />
            <stop offset="100%" stopColor="#006EE6" />
          </linearGradient>
        </defs>
      </svg>
      {/* Thermal spots */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse-glow" style={{ background: `rgba(255, 82, 82, ${op})` }} />
      <div className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full blur-3xl animate-pulse-glow" style={{ background: `rgba(0, 210, 211, ${op})`, animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse-glow" style={{ background: `rgba(0, 110, 230, ${op})`, animationDelay: "4s" }} />
    </div>
  );
}