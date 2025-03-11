import React, { SVGProps } from 'react';

type IconProps = { size?: number } & SVGProps<SVGSVGElement>;

const AIIcon = ({ size = 42, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="14 14 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_1562_2481)">
        <rect
          x="14"
          y="14"
          width="42"
          height="42"
          rx="12"
          fill="url(#paint0_linear_1562_2481)"
        />
        <g clipPath="url(#clip0_1562_2481)">
          <path
            d="M36.5754 24.4998C36.5754 24.966 36.3727 25.385 36.0504 25.6737V27.6498H41.3004C42.1358 27.6498 42.937 27.9817 43.5278 28.5725C44.1185 29.1632 44.4504 29.9644 44.4504 30.7998V41.2998C44.4504 42.1353 44.1185 42.9365 43.5278 43.5272C42.937 44.118 42.1358 44.4498 41.3004 44.4498H28.7004C27.865 44.4498 27.0637 44.118 26.473 43.5272C25.8823 42.9365 25.5504 42.1353 25.5504 41.2998V30.7998C25.5504 29.9644 25.8823 29.1632 26.473 28.5725C27.0637 27.9817 27.865 27.6498 28.7004 27.6498H33.9504V25.6737C33.7546 25.4986 33.6057 25.2772 33.5173 25.0298C33.4288 24.7824 33.4037 24.5169 33.4442 24.2573C33.4846 23.9977 33.5894 23.7523 33.7489 23.5436C33.9084 23.3348 34.1176 23.1693 34.3574 23.062C34.5972 22.9548 34.8601 22.9092 35.122 22.9295C35.384 22.9498 35.6367 23.0353 35.8571 23.1782C36.0776 23.3211 36.2588 23.5169 36.3842 23.7477C36.5097 23.9786 36.5754 24.2371 36.5754 24.4998ZM22.4004 32.8998H24.5004V39.1998H22.4004V32.8998ZM47.6004 32.8998H45.5004V39.1998H47.6004V32.8998ZM31.8504 37.6248C32.2681 37.6248 32.6687 37.4589 32.9641 37.1635C33.2595 36.8682 33.4254 36.4676 33.4254 36.0498C33.4254 35.6321 33.2595 35.2315 32.9641 34.9361C32.6687 34.6408 32.2681 34.4748 31.8504 34.4748C31.4327 34.4748 31.0321 34.6408 30.7367 34.9361C30.4413 35.2315 30.2754 35.6321 30.2754 36.0498C30.2754 36.4676 30.4413 36.8682 30.7367 37.1635C31.0321 37.4589 31.4327 37.6248 31.8504 37.6248ZM39.7254 36.0498C39.7254 35.6321 39.5595 35.2315 39.2641 34.9361C38.9687 34.6408 38.5681 34.4748 38.1504 34.4748C37.7327 34.4748 37.3321 34.6408 37.0367 34.9361C36.7413 35.2315 36.5754 35.6321 36.5754 36.0498C36.5754 36.4676 36.7413 36.8682 37.0367 37.1635C37.3321 37.4589 37.7327 37.6248 38.1504 37.6248C38.5681 37.6248 38.9687 37.4589 39.2641 37.1635C39.5595 36.8682 39.7254 36.4676 39.7254 36.0498Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_1562_2481"
          x="0"
          y="0"
          width="70"
          height="70"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="7" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1562_2481"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1562_2481"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1562_2481"
          x1="35"
          y1="35"
          x2="64.4"
          y2="72.45"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4986FF" />
          <stop offset="1" stopColor="#D2E1FF" />
        </linearGradient>
        <clipPath id="clip0_1562_2481">
          <rect
            width="25.2"
            height="25.2"
            fill="white"
            transform="translate(22.4004 22.4004)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AIIcon;
