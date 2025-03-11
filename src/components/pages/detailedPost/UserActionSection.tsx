import Image from 'next/image';
import { ICONS } from '@/constants/importImages';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TPlanInfo } from '@/types/responseData/detailedPlan';
import { deleteDibs, deleteLike, postDibs, postLike } from '@/apis/plan';
import cs from 'classnames';
import { useState } from 'react';
import Like from '@/components/common/Icons/Like';
import toast from 'react-hot-toast';
import Dibs from '@/components/common/Icons/Dibs';

interface UserActionSectionProps {
  accessToken: string;
  planId: number;
  socialId: string;
  likeId: number | null;
  bookmarkId: number | null;
  writerId: string;
}

const shareButtonClickHandler = () => {
  const url = window.location.href;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      toast.success('URL이 복사되었습니다.');
    })
    .catch((err) => {
      toast.error('URL 복사 실패');
      console.error(err);
    });
};

const UserActionSection = ({
  accessToken,
  planId,
  likeId: initialLikeId,
  bookmarkId: initialBookmarkId,
  socialId,
  writerId,
}: UserActionSectionProps) => {
  const queryClient = useQueryClient();
  const [likeId, setLikeId] = useState<number | null>(initialLikeId);
  const [bookmarkId, setBookmarkId] = useState<number | null>(
    initialBookmarkId
  );

  const likeMutation = useMutation({
    mutationFn: async (userAction: 'UNLIKE' | 'LIKE') => {
      if (userAction === 'LIKE') {
        await postLike(planId, accessToken);
      } else {
        await deleteLike(likeId as number, accessToken);
      }
    },
    onMutate: async (userAction) => {
      await queryClient.cancelQueries({ queryKey: ['plan', planId, 'info'] });

      const prevLikeStatus = queryClient.getQueryData(['plan', planId, 'info']);

      queryClient.setQueryData(
        ['plan', planId, 'info'],
        (prevData: TPlanInfo) => {
          return {
            ...prevData,
            like: userAction === 'LIKE' ? prevData.like + 1 : prevData.like - 1,
          };
        }
      );

      return { prevLikeStatus };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ['plan', planId, 'info'],
        context?.prevLikeStatus
      );
    },
    onSettled: async () => {
      const updatedPlanInfo = await queryClient.fetchQuery<TPlanInfo>({
        queryKey: ['plan', planId, 'info'],
      });
      if (updatedPlanInfo) {
        setLikeId(updatedPlanInfo.likeId);
      }
    },
  });

  const dibsMutation = useMutation({
    mutationFn: async (userAction: 'UNDIBS' | 'DIBS') => {
      if (userAction === 'DIBS') {
        await postDibs(planId, accessToken);
      } else {
        await deleteDibs(bookmarkId as number, accessToken);
      }
    },
    onMutate: async (userAction) => {
      await queryClient.cancelQueries({ queryKey: ['plan', planId, 'info'] });

      const prevLikeStatus = queryClient.getQueryData(['plan', planId, 'info']);

      queryClient.setQueryData(
        ['plan', planId, 'info'],
        (prevData: TPlanInfo) => {
          return {
            ...prevData,
            dibsId: userAction === 'DIBS' ? -1 : null,
          };
        }
      );

      return { prevLikeStatus };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ['plan', planId, 'info'],
        context?.prevLikeStatus
      );
    },
    onSettled: async () => {
      const updatedPlanInfo = await queryClient.fetchQuery<TPlanInfo>({
        queryKey: ['plan', planId, 'info'],
      });
      if (updatedPlanInfo) {
        setBookmarkId(updatedPlanInfo.bookmarkId);
      }
    },
  });

  const likeButtonClickHandler = () => {
    const userLikeAction = likeId ? 'UNLIKE' : 'LIKE';
    likeMutation.mutate(userLikeAction);
  };

  const dibsButtonClickHandler = () => {
    const userLikeAction = bookmarkId ? 'UNDIBS' : 'DIBS';
    dibsMutation.mutate(userLikeAction);
  };

  const renderActionOptions = [
    {
      key: '좋아요',
      icon: <Like isLiked={!!likeId} />,
      clickHandler: likeButtonClickHandler,
      isLiked: !!likeId,
      isRender: true,
    },
    {
      key: '공유하기',
      image: { src: ICONS.iconShare.src, alt: ICONS.iconShare.alt },
      clickHandler: shareButtonClickHandler,
      isLiked: false,
      isRender: true,
    },
    {
      key: '내 일정에 복사하기',
      image: { src: ICONS.iconCopy.src, alt: ICONS.iconCopy.alt },
      clickHandler: () => console.log('..'),
      isLiked: false,
      isRender: true,
    },
    {
      key: '찜하기',
      icon: <Dibs isLiked={!!bookmarkId} />,
      clickHandler: dibsButtonClickHandler,
      isLiked: !!bookmarkId,
      isRender: socialId !== writerId,
    },
  ];

  return (
    <section className="flex justify-between items-center mt-[6rem] pb-[4rem] border-b border-[#D9D9D9]">
      <div className="flex gap-[3.6rem]">
        {renderActionOptions.map((option) => {
          return (
            option.isRender && (
              <button
                type="button"
                key={option.key}
                className={cs('flex items-center gap-[1.6rem]', {
                  'text-var-primary-500': option.isLiked,
                })}
                onClick={option.clickHandler}
              >
                {option.icon ? (
                  option.icon
                ) : (
                  <Image
                    src={option.image.src}
                    alt={option.image.alt}
                    width={36}
                    height={36}
                  />
                )}
                <span className="text-[2rem] font-semibold leading-[2.387rem]">
                  {option.key}
                </span>
              </button>
            )
          );
        })}
      </div>
      <button
        type="button"
        className="flex items-center gap-[1.6rem]"
        onClick={() => console.log('신고하기 클릭')}
      >
        <Image
          src={ICONS.iconSiren.src}
          alt={ICONS.iconSiren.alt}
          width={36}
          height={36}
        />
        <span className="text-[2rem] font-semibold leading-[2.387rem]">
          신고하기
        </span>
      </button>
    </section>
  );
};

export default UserActionSection;
