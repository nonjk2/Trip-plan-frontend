import React, { SVGProps } from 'react';
type IconProps = { size?: number; color?: string } & SVGProps<SVGSVGElement>;
const PeopleIcon = ({ size = 28, color = 'none' }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.8214 9.825C21.6644 11.9856 20.0482 13.65 18.2857 13.65C16.5232 13.65 14.9043 11.9861 14.7501 9.825C14.5893 7.57728 16.1627 6 18.2857 6C20.4087 6 21.9821 7.61819 21.8214 9.825Z"
        stroke="black"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.2862 17.0498C14.795 17.0498 11.4378 18.7695 10.5967 22.1185C10.4853 22.5615 10.7654 22.9998 11.2245 22.9998H25.3484C25.8075 22.9998 26.0861 22.5615 25.9762 22.1185C25.1352 18.7158 21.7779 17.0498 18.2862 17.0498Z"
        stroke="black"
        strokeWidth="1.7"
        strokeMiterlimit="10"
      />
      <path
        d="M11.0003 10.7783C10.875 12.5038 9.56894 13.8627 8.1611 13.8627C6.75327 13.8627 5.44508 12.5043 5.32187 10.7783C5.19384 8.98316 6.46506 7.7002 8.1611 7.7002C9.85715 7.7002 11.1284 9.0161 11.0003 10.7783Z"
        stroke="black"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3218 17.1561C10.3548 16.7168 9.28986 16.5479 8.16113 16.5479C5.37546 16.5479 2.69158 17.9211 2.01927 20.596C1.93088 20.9498 2.15481 21.2999 2.52123 21.2999H8.53612"
        stroke="black"
        strokeWidth="1.7"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PeopleIcon;
