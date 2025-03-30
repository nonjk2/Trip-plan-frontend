import { SVGProps } from 'react';

type IconProps = { size?: number; color?: string } & SVGProps<SVGSVGElement>;
const DateIconBg = ({ ...props }: IconProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.66634 5.33333L7.99967 2M7.99967 2L11.333 5.33333M7.99967 2V10M14.6663 10V12.6667C14.6663 13.0203 14.5259 13.3594 14.2758 13.6095C14.0258 13.8595 13.6866 14 13.333 14H2.66634C2.31272 14 1.97358 13.8595 1.72353 13.6095C1.47348 13.3594 1.33301 13.0203 1.33301 12.6667V10"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DateIconBg;
