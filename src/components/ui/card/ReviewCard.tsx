import ProfileImage from '@/components/ui/ProfileImage';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/utils/dateUtils';
import cs from 'classnames';

interface ReviewCardProps {
  cardType: 'main' | 'mypage' | 'post';
  itemData: {
    reviewId: number;
    title: string;
    createdAt: Date;
    userImageUrl?: string;
    nickname?: string;
    contentText: string;
    contentImageUrl: string;
    imageCount: number;
  };
}

const ReviewCard = ({ cardType, itemData }: ReviewCardProps) => {
  const hasImg = !!itemData.contentImageUrl;

  return (
    <Link
      href={`/review/${itemData.reviewId}`}
      className="p-[3.2rem] size-full flex flex-col shadow-reviewCard rounded-xl gap-[1.4rem] transition-all duration-300 hover:shadow-reviewCard hover:-translate-y-1"
    >
      <div className="flex items-center gap-[1.2rem]">
        {cardType !== 'mypage' && (
          <>
            <ProfileImage imageUrl={itemData.userImageUrl || ''} size="r" />
            <span className="text-[1.6rem] leading-[2.4rem]">
              {itemData.nickname}
            </span>
          </>
        )}
        <span className="text-[1.4rem] text-black/60 leading-[1.82rem]">
          {formatDate('comment', itemData.createdAt)}
        </span>
      </div>

      <div className="flex justify-between">
        <div
          className={cs('flex flex-col gap-[0.8rem]', {
            'max-w-[71.3%]': hasImg,
          })}
        >
          <h3 className="text-[1.8rem] font-medium leading-[2.34rem]">
            {itemData.title}
          </h3>
          <p
            className={cs('text-[1.6rem] leading-[2.08rem]', {
              'line-clamp-3': hasImg,
            })}
          >
            {itemData.contentText}
          </p>
        </div>
        {hasImg && (
          <div className="relative w-[12.2rem] h-[12.2rem] rounded-lg overflow-hidden">
            <Image
              src={itemData.contentImageUrl}
              alt="이미지"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </Link>
  );
};

export default ReviewCard;
