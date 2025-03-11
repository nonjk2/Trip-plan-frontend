import ProfileImage from '@/components/ui/ProfileImage';
import Image from 'next/image';
import defaultImage from '@/assets/img/default-thumb.png';
import Link from 'next/link';

const ReviewCard = () => {
  return (
    <Link
      href={'/'}
      className="p-[3.2rem] max-w-[63rem] flex flex-col shadow-reviewCard rounded-xl gap-[1.4rem] transition-all duration-300 hover:shadow-reviewCard hover:-translate-y-1"
    >
      <div className="flex items-center gap-[1.2rem]">
        <ProfileImage imageUrl={''} size="r" />
        <span className="text-[1.6rem] leading-[2.4rem]">김트립</span>
        <span className="text-[1.4rem] text-black/60 leading-[1.82rem]">
          2025.02.24
        </span>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col max-w-[71.3%] gap-[0.8rem]">
          <h3 className="text-[1.8rem] font-medium leading-[2.34rem]">
            감귤초코케이크가 유명한 애월 카페 &apos;하이엔드 제주&apos;
          </h3>
          <p className="text-[1.6rem] leading-[2.08rem] line-clamp-3">
            제주 빵지순례 코스 리스트에 꼭 추가해보세요! 여행을 더욱 특별하고
            달달하게 만들어주는 애월 카페, 하이엔드 제주에 다녀왔습니다.
            개인적으로 이번 제주 여행 최고의 경험이었던 것 같아서좋았어요.
          </p>
        </div>
        <div className="relative w-[12.2rem] h-[12.2rem] rounded-lg overflow-hidden">
          <Image
            src={defaultImage}
            alt="이미지"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </Link>
  );
};

export default ReviewCard;
