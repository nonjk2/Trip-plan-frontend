import Image from 'next/image';
import { IMAGES } from '@/constants/importImages';

// const PROFILE_SIZE = {
//   r: 44,
//   m: 48,
//   l: 80,
// };

interface ProfileImageProps {
  imageUrl: string | null;
  size: 'r' | 'm' | 'l';
  priority?: boolean;
}

const ProfileImage = ({ imageUrl, size, priority }: ProfileImageProps) => {
  const sizeClassName = {
    r: `w-[4.4rem] h-[4.4rem]`,
    m: `w-[4.8rem] h-[4.8rem]`,
    l: `w-[8rem] h-[8rem]`,
  };
  return (
    <div className={`${sizeClassName[size]} relative`}>
      <Image
        src={imageUrl ? imageUrl : IMAGES.defaultProfile.src}
        fill
        alt="프로필이미지"
        className="shrink-0 object-cover shadow-md rounded-full absolute"
        priority={priority}
      />
    </div>
  );
};

export default ProfileImage;
