import { ICONS } from '@/constants/importImages';
import { TPlanInfo } from '@/types/responseData/detailedPlan';
import { useState } from 'react';
import Like from '@/components/common/Icons/Like';
import Dibs from '@/components/common/Icons/Dibs';
import PostUserAction from '@/components/ui/PostUserAction';
import shareButtonClickHandler from '@/utils/shareUtils';
import usePostActionLike from '@/lib/hooks/queries/mutate/usePostActionLike';
import usePostActionDibs from '@/lib/hooks/queries/mutate/usePostActionDibs';

interface UserActionSectionProps {
  accessToken: string;
  planId: number;
  socialId: string;
  likeId: number | null;
  bookmarkId: number | null;
  writerId: string;
}

const UserActionSection = ({
  accessToken,
  planId,
  likeId: initialLikeId,
  bookmarkId: initialBookmarkId,
  socialId,
  writerId,
}: UserActionSectionProps) => {
  const [likeId, setLikeId] = useState<number | null>(initialLikeId);
  const [bookmarkId, setBookmarkId] = useState<number | null>(
    initialBookmarkId
  );

  const likeMutation = usePostActionLike<TPlanInfo>({
    pageType: 'plan',
    pageId: planId,
    likeId,
    accessToken,
    setLikeId,
  });

  const dibsMutation = usePostActionDibs<TPlanInfo>({
    pageType: 'plan',
    pageId: planId,
    bookmarkId,
    accessToken,
    setBookmarkId,
  });

  const likeButtonClickHandler = () => {
    const userLikeAction = likeId ? 'UNLIKE' : 'LIKE';
    likeMutation.mutate(userLikeAction);
  };

  const dibsButtonClickHandler = () => {
    const userDibsAction = bookmarkId ? 'UNDIBS' : 'DIBS';
    dibsMutation.mutate(userDibsAction);
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
      <PostUserAction pageType="plan" renderOptions={renderActionOptions} />
    </section>
  );
};

export default UserActionSection;
