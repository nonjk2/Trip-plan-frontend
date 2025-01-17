import React, { SVGProps } from 'react';

type IconProps = { size?: number; color?: string } & SVGProps<SVGSVGElement>;

const MapIcon = ({
  size = 40,
  color = 'currentColor',
  ...props
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="40" height="40" rx="20" fill="#D2E1FF" />
      <path
        d="M24.2 24.0464L25.838 15.7304C26.944 15.1284 27.7 13.9804 27.7 12.6504C27.7 11.7221 27.3313 10.8319 26.6749 10.1755C26.0185 9.51914 25.1283 9.15039 24.2 9.15039C23.2718 9.15039 22.3816 9.51914 21.7252 10.1755C21.0688 10.8319 20.7 11.7221 20.7 12.6504C20.7 13.9804 21.456 15.1284 22.562 15.7304L24.2 24.0464ZM24.2 10.5504C25.362 10.5504 26.3 11.4884 26.3 12.6504C26.3 13.8124 25.362 14.7504 24.2 14.7504C23.038 14.7504 22.1 13.8124 22.1 12.6504C22.1 11.4884 23.038 10.5504 24.2 10.5504ZM26.608 17.2704L31.2 15.4084V28.0084L24.368 30.8504L15.8 28.0084L8.80005 30.8084V18.2084L15.8 15.4084L21.778 17.3824L24.2 27.6024L26.608 17.2704Z"
        fill="#6893E9"
      />
    </svg>
  );
};

export default MapIcon;
