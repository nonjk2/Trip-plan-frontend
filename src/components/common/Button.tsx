import React, { JSX } from 'react';

type ButtonProps = {
  size: 'sm' | 'md' | 'lg';
  btnColor?: 'blue' | 'white';
  children?: JSX.Element | string;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Button 컴포넌트
 * @param {'sm' | 'md' | 'lg'} [size='md'] - 버튼의 크기
 * @param {'blue' | 'white'} [btnColor='blue'] - 버튼의 색상
 * @param {JSX.Element | string} [children] - 버튼의 자식 요소
 * @param {boolean} [disabled] - 버튼 비활성화 여부
 */
const Button: React.FC<ButtonProps> = ({
  size = 'md',
  btnColor,
  // hover = false,
  disabled = false,
  children,
  ...rest
}) => {
  const getButtonStyle = () => {
    switch (size) {
      case 'sm':
        return 'py-btn-sm-y btn-sm px-[2.8rem]';
      case 'md':
        return 'py-btn-md-y btn-md w-[200px]';
      case 'lg':
        return 'py-btn-lg-y btn-lg';
      default:
        return '';
    }
  };

  const getButtonColor = () => {
    if (disabled) {
      return 'bg-var-enable text-var-enable-400';
    }
    switch (btnColor) {
      case 'blue':
        return `bg-var-primary-500 hover:bg-var-primary-600`;

      case 'white':
        return `bg-background text-background border-var-primary-500 dark:text-background border border-1 border-var-primary-500`;
      default:
        return ``;
    }
  };

  return (
    <button
      {...rest}
      className={`btn ${getButtonStyle()} ${getButtonColor()} ${
        rest.className
      } ${disabled && 'cursor-auto'}`}
      disabled={disabled}
    >
      <span className="text-inherit">{children}</span>
    </button>
  );
};

export default Button;
