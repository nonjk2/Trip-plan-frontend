import { ICONS } from '@/constants/importImages';
import Image from 'next/image';

const { iconStarOn, iconStarOff } = ICONS;

interface StarProps {
  selected: boolean;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  isStatic?: boolean;
  size?: number;
}

const Star = ({
  selected,
  onClick,
  onMouseOut,
  onMouseOver,
  isStatic = false,
  size = 40,
}: StarProps) => {
  const StarAction = selected ? iconStarOn.src : iconStarOff.src;

  return (
    <Image
      width={size}
      height={size}
      src={StarAction}
      alt="별점"
      className="cursor-pointer"
      {...(!isStatic && { onClick, onMouseOver, onMouseOut })}
    />
  );
};

export default Star;
