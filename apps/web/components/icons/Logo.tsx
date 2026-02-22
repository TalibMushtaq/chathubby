import React from "react";

export default function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect
        x="4"
        y="4"
        width="120"
        height="120"
        rx="24"
        fill="var(--color-surface)"
      />

      <defs>
        <linearGradient
          id="chatBubbleGradient"
          x1="30"
          y1="30"
          x2="100"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>

      <g transform="translate(64 64) scale(0.8) translate(-64 -64)">
        <path
          d="M46 28C30.536 28 18 40.536 18 56C18 65.3 22.5 73.5 29.5 78.5L26 92L40 87.5C43.5 88.5 47.2 89 51 89C52.3 89 53.6 88.9 54.9 88.7C58.3 95.5 65.4 100 73.5 100C77.3 100 81 99.5 84.5 98.5L98.5 103L95 89.5C102 84.5 106.5 76.3 106.5 67C106.5 57.9 102.1 49.8 95.3 44.7C92.1 37.8 85 33 76.5 33C75.2 33 73.9 33.1 72.6 33.3C69.2 26.5 62.1 22 54 22C51.3 22 48.7 22.5 46.3 23.3C46.2 24.8 46 26.4 46 28Z"
          fill="url(#chatBubbleGradient)"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
