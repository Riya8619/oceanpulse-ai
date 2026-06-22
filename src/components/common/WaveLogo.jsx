import React from "react";

export default function WaveLogo({ className = "", size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer ring */}
      <circle cx="50" cy="50" r="45" stroke="#1D5B8D" strokeWidth="6" fill="none" />

      {/* Inner ring */}
      <circle cx="50" cy="50" r="40" stroke="#1D5B8D" strokeWidth="1" fill="none" opacity="0.35" />

      {/* Bright blue wave body */}
      <path
        d="M16 64 C16 50 22 40 32 44 C38 46 42 44 44 38 C46 30 52 28 58 32 C64 36 68 38 72 42 C76 38 80 36 82 40 C82 46 78 54 72 62 C66 68 56 70 48 68 L16 64 Z"
        fill="#49A0D5"
      />

      {/* Dark navy barrel / curl shadow */}
      <path
        d="M32 44 C38 46 42 44 44 38 C46 30 52 28 58 32 C60 34 60 38 56 42 C52 46 48 48 42 48 C36 48 33 47 32 44 Z"
        fill="#0F3D61"
      />

      {/* Spray dots */}
      <circle cx="50" cy="25" r="2" fill="#49A0D5" />
      <circle cx="56" cy="23" r="1.5" fill="#49A0D5" opacity="0.75" />
      <circle cx="62" cy="24" r="1.2" fill="#49A0D5" opacity="0.5" />
      <circle cx="68" cy="28" r="1" fill="#49A0D5" opacity="0.4" />
    </svg>
  );
}