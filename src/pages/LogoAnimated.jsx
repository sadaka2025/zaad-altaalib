// LogoAnimated.jsx
import React from "react";

export default function LogoAnimated() {
  return (
    <div style={{ height: "150px", display: "flex", alignItems: "center" }}>
      <svg viewBox="0 0 960 300" height="150" style={{ display: "block" }}>
        <symbol id="s-text">
          <text
            textAnchor="middle"
            x="50%"
            y="70%"
            fontFamily="Montserrat"
            fontSize="80"
          >
            📚 زاد الطالب
          </text>
        </symbol>

        <g className="g-ants">
          <use xlinkHref="#s-text" className="text-copy"></use>
          <use xlinkHref="#s-text" className="text-copy"></use>
          <use xlinkHref="#s-text" className="text-copy"></use>
          <use xlinkHref="#s-text" className="text-copy"></use>
          <use xlinkHref="#s-text" className="text-copy"></use>
        </g>
      </svg>

      <style>
        {`
          @import url("https://fonts.googleapis.com/css?family=Montserrat");

          .text-copy {
            fill: none;
            stroke: white;
            stroke-dasharray: 6% 29%;
            stroke-width: 2px;
            stroke-dashoffset: 0%;
            animation: stroke-offset 5.5s infinite linear;
          }

          .text-copy:nth-child(1) { stroke: white; animation-delay: -1s; }
          .text-copy:nth-child(2) { stroke: white; animation-delay: -2s; }
          .text-copy:nth-child(3) { stroke: white; animation-delay: -3s; }
          .text-copy:nth-child(4) { stroke: white; animation-delay: -4s; }
          .text-copy:nth-child(5) { stroke: white; animation-delay: -5s; }

          @keyframes stroke-offset {
            100% { stroke-dashoffset: -35%; }
          }
        `}
      </style>
    </div>
  );
}
