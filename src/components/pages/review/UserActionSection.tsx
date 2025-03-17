import { ICONS } from '@/constants/importImages';
import { useState } from 'react';
import Like from '@/components/common/Icons/Like';
import Dibs from '@/components/common/Icons/Dibs';
import PostUserAction from '@/components/ui/PostUserAction';
import shareButtonClickHandler from '@/utils/shareUtils';
import { TDetailedReviewInfo } from '@/types/responseData/review';
import usePostActionLike from '@/lib/hooks/queries/mutate/usePostActionLike';
import usePostActionDibs from '@/lib/hooks/queries/mutate/usePostActionDibs';
import useReports from '@/lib/hooks/useReports';
import ReportModal from '../detailedPost/ReportModal';

interface UserActionSectionProps {
  accessToken: string;
  reviewId: number;
  socialId: string;
  likeId: number | null;
  bookmarkId: number | null;
  writerId: string;
  reportsData: {
    author: string;
    id: number;
    content: string;
  };
}

const UserActionSection = ({
  accessToken,
  reviewId,
  likeId: initialLikeId,
  bookmarkId: initialBookmarkId,
  socialId,
  writerId,
  reportsData: reportData,
}: UserActionSectionProps) => {
  const [likeId, setLikeId] = useState<number | null>(initialLikeId);
  const [bookmarkId, setBookmarkId] = useState<number | null>(
    initialBookmarkId
  );

  const {
    openModal: open,
    isOpen,
    closeModal,
    selectedPlan,
    selectedReason,
    submitReport,
    toggleReason,
    isPending,
  } = useReports();
  const likeMutation = usePostActionLike<TDetailedReviewInfo>({
    pageType: 'review',
    pageId: reviewId,
    likeId,
    accessToken,
    setLikeId,
  });
  const openModal = () => {
    open('review', reviewId);
  };
  const dibsMutation = usePostActionDibs<TDetailedReviewInfo>({
    pageType: 'review',
    pageId: reviewId,
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
      key: '찜하기',
      icon: <Dibs isLiked={!!bookmarkId} />,
      clickHandler: dibsButtonClickHandler,
      isLiked: !!bookmarkId,
      isRender: socialId !== writerId,
    },
    {
      key: '신고하기',
      image: { src: ICONS.iconSiren.src, alt: ICONS.iconSiren.alt },
      clickHandler: openModal,
      isLiked: false,
      isRender: true,
    },
  ];

  return (
    <section className="flex justify-between items-center mt-[6rem] pb-[4rem] border-b border-[#D9D9D9]">
      <PostUserAction pageType="review" renderOptions={renderActionOptions} />
      {isOpen && (
        <ReportModal
          reportsData={reportData}
          reports={{
            openModal,
            closeModal,
            isOpen,
            isPending,
            selectedPlan,
            selectedReason,
            toggleReason,
            submitReport,
          }}
        />
      )}
    </section>
  );
};

export default UserActionSection;
