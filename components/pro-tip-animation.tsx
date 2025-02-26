import React from "react";

export function ProTipAnimation() {
  return (
    <svg
      width="300"
      height="200"
      viewBox="0 0 300 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* Stove/Base */}
      <rect x="90" y="160" width="120" height="10" rx="3" fill="#4B5563" />
      <rect x="110" y="158" width="80" height="4" rx="2" fill="#6B7280" />

      {/* Cooking Pot */}
      <g>
        {/* Pot shadows and highlights */}
        <ellipse
          cx="150"
          cy="160"
          rx="45"
          ry="7"
          fill="#374151"
          opacity="0.3"
        />

        {/* Pot body */}
        <path
          d="M110 120v35c0 6 5 10 10 10h60c5 0 10-4 10-10v-35"
          fill="url(#pot-gradient)"
          stroke="#374151"
          strokeWidth="2.5"
        />
        <defs>
          <linearGradient
            id="pot-gradient"
            x1="150"
            y1="120"
            x2="150"
            y2="165"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#6B7280" />
            <stop offset="1" stopColor="#4B5563" />
          </linearGradient>

          {/* Flame gradients */}
          <linearGradient
            id="flame-gradient1"
            x1="150"
            y1="130"
            x2="150"
            y2="160"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#FEF3C7" />
            <stop offset="0.5" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#DC2626" />
          </linearGradient>

          <linearGradient
            id="flame-gradient2"
            x1="135"
            y1="137"
            x2="135"
            y2="160"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#FEF3C7" />
            <stop offset="0.5" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#DC2626" />
          </linearGradient>

          <linearGradient
            id="flame-gradient3"
            x1="165"
            y1="137"
            x2="165"
            y2="160"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#FEF3C7" />
            <stop offset="0.5" stopColor="#F59E0B" />
            <stop offset="1" stopColor="#DC2626" />
          </linearGradient>
        </defs>

        {/* Pot top rim - more detailed */}
        <ellipse
          cx="150"
          cy="120"
          rx="45"
          ry="10"
          fill="#6B7280"
          stroke="#374151"
          strokeWidth="2.5"
        />
        <ellipse
          cx="150"
          cy="120"
          rx="40"
          ry="8"
          fill="#4B5563"
          stroke="#374151"
          strokeWidth="0.5"
          opacity="0.7"
        />

        {/* Pot handles */}
        <g>
          <path
            d="M193 130c8-1 14-7 14-15s-6-15-14-16"
            stroke="#374151"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M107 130c-8-1-14-7-14-15s6-15 14-16"
            stroke="#374151"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Liquid inside pot */}
        <ellipse cx="150" cy="123" rx="38" ry="7" fill="#FBBF24" opacity="0.8">
          <animate
            attributeName="cy"
            values="123;124;123"
            dur="2s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* Liquid highlights */}
        <path
          d="M130 120c0 0 10 3 20 3s20-3 20-3"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        >
          <animate
            attributeName="d"
            values="M130 120c0 0 10 3 20 3s20-3 20-3;M128 120c0 0 12 4 22 4s22-4 22-4;M130 120c0 0 10 3 20 3s20-3 20-3"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>

        {/* Lid */}
        <g>
          <ellipse
            cx="150"
            cy="115"
            rx="30"
            ry="7"
            fill="#4B5563"
            stroke="#374151"
            strokeWidth="2"
          />
          <ellipse
            cx="150"
            cy="115"
            rx="28"
            ry="5"
            fill="#6B7280"
            stroke="#374151"
            strokeWidth="0.5"
          />
          <circle
            cx="150"
            cy="115"
            r="4"
            fill="#374151"
            stroke="#1F2937"
            strokeWidth="1"
          />
          <path
            d="M150 115L150 105"
            stroke="#374151"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            cx="150"
            cy="103"
            r="5"
            fill="#4B5563"
            stroke="#374151"
            strokeWidth="1"
          />

          {/* Lid animation - slight bounce and rotate */}
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0,0; 0,-1; 0,0"
            dur="2s"
            repeatCount="indefinite"
            additive="sum"
          />
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 150 115"
            to="2 150 115"
            dur="3s"
            repeatCount="indefinite"
            additive="sum"
          />
        </g>

        {/* Bubbles inside pot - more variety */}
        <g>
          <circle cx="135" cy="125" r="3" fill="white" opacity="0.7">
            <animate
              attributeName="cy"
              values="130;120;118"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.7;0"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="155" cy="128" r="2" fill="white" opacity="0.7">
            <animate
              attributeName="cy"
              values="133;123;121"
              dur="1.2s"
              repeatCount="indefinite"
              begin="0.3s"
            />
            <animate
              attributeName="opacity"
              values="0;0.7;0"
              dur="1.2s"
              repeatCount="indefinite"
              begin="0.3s"
            />
          </circle>
          <circle cx="145" cy="127" r="2.5" fill="white" opacity="0.7">
            <animate
              attributeName="cy"
              values="132;122;120"
              dur="1.8s"
              repeatCount="indefinite"
              begin="0.6s"
            />
            <animate
              attributeName="opacity"
              values="0;0.7;0"
              dur="1.8s"
              repeatCount="indefinite"
              begin="0.6s"
            />
          </circle>
          <circle cx="165" cy="126" r="1.5" fill="white" opacity="0.7">
            <animate
              attributeName="cy"
              values="131;121;119"
              dur="1.3s"
              repeatCount="indefinite"
              begin="0.9s"
            />
            <animate
              attributeName="opacity"
              values="0;0.7;0"
              dur="1.3s"
              repeatCount="indefinite"
              begin="0.9s"
            />
          </circle>
          <circle cx="125" cy="129" r="2" fill="white" opacity="0.7">
            <animate
              attributeName="cy"
              values="134;124;122"
              dur="1.7s"
              repeatCount="indefinite"
              begin="1.2s"
            />
            <animate
              attributeName="opacity"
              values="0;0.7;0"
              dur="1.7s"
              repeatCount="indefinite"
              begin="1.2s"
            />
          </circle>
        </g>
      </g>

      {/* Steam animations - more detailed and natural */}
      <g>
        {/* Central steam column */}
        <path
          d="M150 115C150 105 145 95 150 85C155 75 150 65 150 55"
          stroke="#CBD5E1"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0"
          fill="none"
        >
          <animate
            attributeName="opacity"
            values="0;0.7;0"
            dur="3s"
            repeatCount="indefinite"
            begin="0s"
          />
          <animate
            attributeName="d"
            values="M150 115C150 105 145 95 150 85C155 75 150 65 150 55;M150 115C150 105 155 95 150 85C145 75 150 65 150 55;M150 115C150 105 145 95 150 85C155 75 150 65 150 55"
            dur="3s"
            repeatCount="indefinite"
            begin="0s"
          />
        </path>

        {/* Left steam curl */}
        <path
          d="M135 115C130 105 125 100 130 90C135 80 130 70 125 60"
          stroke="#CBD5E1"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0"
          fill="none"
        >
          <animate
            attributeName="opacity"
            values="0;0.6;0"
            dur="3.5s"
            repeatCount="indefinite"
            begin="0.5s"
          />
          <animate
            attributeName="d"
            values="M135 115C130 105 125 100 130 90C135 80 130 70 125 60;M135 115C135 105 130 95 135 85C140 75 135 65 130 55;M135 115C130 105 125 100 130 90C135 80 130 70 125 60"
            dur="3.5s"
            repeatCount="indefinite"
            begin="0.5s"
          />
          <animate
            attributeName="stroke-width"
            values="3.5;4;3.5"
            dur="3.5s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </path>

        {/* Right steam curl */}
        <path
          d="M165 115C170 105 175 100 170 90C165 80 170 70 175 60"
          stroke="#CBD5E1"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0"
          fill="none"
        >
          <animate
            attributeName="opacity"
            values="0;0.6;0"
            dur="3.2s"
            repeatCount="indefinite"
            begin="1s"
          />
          <animate
            attributeName="d"
            values="M165 115C170 105 175 100 170 90C165 80 170 70 175 60;M165 115C165 105 170 95 165 85C160 75 165 65 170 55;M165 115C170 105 175 100 170 90C165 80 170 70 175 60"
            dur="3.2s"
            repeatCount="indefinite"
            begin="1s"
          />
          <animate
            attributeName="stroke-width"
            values="3.5;4;3.5"
            dur="3.2s"
            repeatCount="indefinite"
            begin="1s"
          />
        </path>

        {/* Small steam puffs */}
        <path
          d="M142 105C142 100 138 95 142 90"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0"
          fill="none"
        >
          <animate
            attributeName="opacity"
            values="0;0.5;0"
            dur="2s"
            repeatCount="indefinite"
            begin="0.2s"
          />
          <animate
            attributeName="d"
            values="M142 105C142 100 138 95 142 90;M142 105C139 100 142 95 139 90;M142 105C142 100 138 95 142 90"
            dur="2s"
            repeatCount="indefinite"
            begin="0.2s"
          />
        </path>

        <path
          d="M158 105C158 100 162 95 158 90"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0"
          fill="none"
        >
          <animate
            attributeName="opacity"
            values="0;0.5;0"
            dur="2s"
            repeatCount="indefinite"
            begin="1.5s"
          />
          <animate
            attributeName="d"
            values="M158 105C158 100 162 95 158 90;M158 105C161 100 158 95 161 90;M158 105C158 100 162 95 158 90"
            dur="2s"
            repeatCount="indefinite"
            begin="1.5s"
          />
        </path>
      </g>

      {/* Spoon */}
      <g>
        <path
          d="M180 130L200 115"
          stroke="#92400E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M200 115C204 112 208 110 210 114C212 118 206 122 200 115Z"
          fill="#92400E"
        />
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="-3 150 120"
          to="3 150 120"
          dur="4s"
          repeatCount="indefinite"
          additive="sum"
        />
      </g>

      {/* Flames under pot - more realistic */}
      <g>
        {/* Center flame */}
        <path
          d="M150 160c0-8-3-12-0-18s3-7 0-12c-3 5 0 6-3 12s-3 10 3 18z"
          fill="url(#flame-gradient1)"
        >
          <animate
            attributeName="d"
            values="M150 160c0-8-3-12-0-18s3-7 0-12c-3 5 0 6-3 12s-3 10 3 18z;M150 160c0-8 3-12 0-18s-3-7 0-12c3 5 0 6 3 12s3 10-3 18z;M150 160c0-8-3-12-0-18s3-7 0-12c-3 5 0 6-3 12s-3 10 3 18z"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </path>

        {/* Left flame */}
        <path
          d="M135 160c0-6-2-9-0-14s2-5 0-9c-2 4 0 4-2 9s-2 8 2 14z"
          fill="url(#flame-gradient2)"
        >
          <animate
            attributeName="d"
            values="M135 160c0-6-2-9-0-14s2-5 0-9c-2 4 0 4-2 9s-2 8 2 14z;M135 160c0-6 2-9 0-14s-2-5 0-9c2 4 0 4 2 9s2 8-2 14z;M135 160c0-6-2-9-0-14s2-5 0-9c-2 4 0 4-2 9s-2 8 2 14z"
            dur="1.2s"
            repeatCount="indefinite"
            begin="0.3s"
          />
        </path>

        {/* Right flame */}
        <path
          d="M165 160c0-6-2-9-0-14s2-5 0-9c-2 4 0 4-2 9s-2 8 2 14z"
          fill="url(#flame-gradient3)"
        >
          <animate
            attributeName="d"
            values="M165 160c0-6-2-9-0-14s2-5 0-9c-2 4 0 4-2 9s-2 8 2 14z;M165 160c0-6 2-9 0-14s-2-5 0-9c2 4 0 4 2 9s2 8-2 14z;M165 160c0-6-2-9-0-14s2-5 0-9c-2 4 0 4-2 9s-2 8 2 14z"
            dur="1.3s"
            repeatCount="indefinite"
            begin="0.6s"
          />
        </path>

        {/* Small flame particles */}
        <circle cx="148" cy="158" r="1" fill="#FEF3C7" opacity="0.8">
          <animate
            attributeName="cy"
            values="158;152;148"
            dur="0.8s"
            repeatCount="indefinite"
            begin="0.1s"
          />
          <animate
            attributeName="opacity"
            values="0.8;0.4;0"
            dur="0.8s"
            repeatCount="indefinite"
            begin="0.1s"
          />
        </circle>
        <circle cx="152" cy="158" r="0.8" fill="#FEF3C7" opacity="0.8">
          <animate
            attributeName="cy"
            values="158;154;150"
            dur="0.7s"
            repeatCount="indefinite"
            begin="0.4s"
          />
          <animate
            attributeName="opacity"
            values="0.8;0.4;0"
            dur="0.7s"
            repeatCount="indefinite"
            begin="0.4s"
          />
        </circle>
        <circle cx="145" cy="158" r="0.6" fill="#FEF3C7" opacity="0.8">
          <animate
            attributeName="cy"
            values="158;153;149"
            dur="0.9s"
            repeatCount="indefinite"
            begin="0.7s"
          />
          <animate
            attributeName="opacity"
            values="0.8;0.4;0"
            dur="0.9s"
            repeatCount="indefinite"
            begin="0.7s"
          />
        </circle>
      </g>

      {/* Chef's Hat - appears to indicate professional cooking tip */}
      <g transform="translate(30, 60) scale(0.18)">
        <ellipse
          cx="125"
          cy="120"
          rx="60"
          ry="25"
          fill="white"
          stroke="#E5E7EB"
          strokeWidth="4"
        />
        <path
          d="M80 100 Q 125 30 170 100"
          fill="white"
          stroke="#E5E7EB"
          strokeWidth="4"
        />
        <path
          d="M80 100 L 80 120"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="4"
        />
        <path
          d="M170 100 L 170 120"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="4"
        />
        <animate
          attributeName="opacity"
          values="0;0;0;1;1;1;1;0"
          dur="10s"
          repeatCount="indefinite"
          begin="1s"
        />
      </g>

      {/* Temperature gauge - shows cooking process status */}
      <g transform="translate(230, 100) scale(0.6)">
        <circle
          cx="30"
          cy="30"
          r="28"
          fill="white"
          stroke="#D1D5DB"
          strokeWidth="2"
        />
        <circle
          cx="30"
          cy="30"
          r="24"
          fill="#F3F4F6"
          stroke="#D1D5DB"
          strokeWidth="1"
        />
        <path
          d="M30 30 L 30 12"
          stroke="#DC2626"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 30 30"
            to="270 30 30"
            dur="10s"
            repeatCount="indefinite"
            values="0 30 30; 90 30 30; 180 30 30; 270 30 30; 300 30 30; 270 30 30"
            keyTimes="0; 0.2; 0.4; 0.6; 0.8; 1"
          />
        </path>
        <circle cx="30" cy="30" r="3" fill="#DC2626" />
        <path
          d="M30 8 L 30 10"
          stroke="#1F2937"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M52 30 L 50 30"
          stroke="#1F2937"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M30 52 L 30 50"
          stroke="#1F2937"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 30 L 10 30"
          stroke="#1F2937"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <text
          x="25"
          y="62"
          fontFamily="system-ui, sans-serif"
          fontSize="8"
          fill="#6B7280"
        >
          TEMP
        </text>
        <animate
          attributeName="opacity"
          values="0;0;0;1;1;1;0"
          dur="10s"
          repeatCount="indefinite"
          begin="1s"
        />
      </g>

      {/* Timer notification */}
      <g transform="translate(240, 40) scale(0.5)">
        <rect
          x="0"
          y="0"
          width="80"
          height="30"
          rx="15"
          fill="#EF4444"
          fillOpacity="0.8"
        />
        <text
          x="18"
          y="20"
          fontFamily="system-ui, sans-serif"
          fontSize="16"
          fontWeight="bold"
          fill="white"
        >
          5:00
        </text>
        <animate
          attributeName="opacity"
          values="0;0;0;0;0;1;1;0"
          dur="10s"
          repeatCount="indefinite"
          begin="1s"
        />
      </g>

      {/* Recipe notes */}
      <g transform="translate(30, 30)">
        <path d="M0 0 L15 0 L15 15 L0 15 Z" fill="#F3F4F6" stroke="#D1D5DB" />
        <path d="M3 4 L12 4" stroke="#9CA3AF" strokeWidth="1" />
        <path d="M3 7.5 L12 7.5" stroke="#9CA3AF" strokeWidth="1" />
        <path d="M3 11 L8 11" stroke="#9CA3AF" strokeWidth="1" />
        <animate
          attributeName="opacity"
          values="0;0;1;1;1;1;0"
          dur="10s"
          repeatCount="indefinite"
          begin="1s"
        />
      </g>

      {/* Small food ingredients floating around */}
      <g>
        {/* Herb leaf 1 */}
        <path
          d="M175 90C180 85 185 88 183 93C181 98 178 96 175 90Z"
          fill="#059669"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0;0;0.8;0"
            dur="10s"
            repeatCount="indefinite"
            begin="3s"
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; -5,10; -10,30"
            dur="2s"
            begin="3s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0; 20; -20; 0"
            dur="2s"
            begin="3s"
            repeatCount="indefinite"
            additive="sum"
          />
        </path>

        {/* Herb leaf 2 */}
        <path
          d="M125 90C120 85 115 88 117 93C119 98 122 96 125 90Z"
          fill="#059669"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0;0;0;0.8;0"
            dur="10s"
            repeatCount="indefinite"
            begin="4s"
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 5,10; 10,30"
            dur="2s"
            begin="4s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0; -20; 20; 0"
            dur="2s"
            begin="4s"
            repeatCount="indefinite"
            additive="sum"
          />
        </path>

        {/* Salt pinch */}
        <circle cx="170" cy="100" r="1" fill="white" opacity="0">
          <animate
            attributeName="opacity"
            values="0;0;0;0;0;0.9;0"
            dur="10s"
            repeatCount="indefinite"
            begin="5s"
          />
          <animate
            attributeName="cy"
            values="100;130"
            dur="1s"
            begin="5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="172" cy="98" r="0.8" fill="white" opacity="0">
          <animate
            attributeName="opacity"
            values="0;0;0;0;0;0.9;0"
            dur="10s"
            repeatCount="indefinite"
            begin="5.1s"
          />
          <animate
            attributeName="cy"
            values="98;133"
            dur="1.2s"
            begin="5.1s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="168" cy="99" r="0.6" fill="white" opacity="0">
          <animate
            attributeName="opacity"
            values="0;0;0;0;0;0.9;0"
            dur="10s"
            repeatCount="indefinite"
            begin="5.2s"
          />
          <animate
            attributeName="cy"
            values="99;128"
            dur="0.9s"
            begin="5.2s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}
