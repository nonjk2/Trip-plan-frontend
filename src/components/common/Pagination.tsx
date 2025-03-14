import { ICONS } from '@/constants/importImages';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PaginationProps {
  pageType:
    | 'my'
    | 'dibs'
    | 'my-review'
    | 'dibs-review'
    | 'my-comment'
    | 'plan'
    | 'review';
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  postId?: number;
}

const Pagination = ({
  pageType,
  currentPage,
  totalPages,
  postId,
}: PaginationProps) => {
  let urlPath = '';
  switch (pageType) {
    case 'my':
      urlPath = '/my/my-post/plans';
      break;
    case 'dibs':
      urlPath = '/my/dibs/plans';
      break;
    case 'my-review':
      urlPath = '/my/my-post/reviews';
      break;
    case 'dibs-review':
      urlPath = '/my/dibs/reviews';
      break;
    case 'my-comment':
      urlPath = '/my/my-comments';
      break;
    case 'plan':
      urlPath = `/plan-n/${postId}`;
      break;
    case 'review':
      urlPath = `/review/${postId}`;
      break;
    default:
      throw new Error(`Unsupported pageType: ${pageType}`);
  }
  const router = useRouter();
  const maxPage = 5;

  const groupStart = Math.floor((currentPage - 1) / maxPage) * maxPage + 1;
  const groupEnd = Math.min(groupStart + maxPage - 1, totalPages);

  const pages = Array.from(
    { length: groupEnd - groupStart + 1 },
    (_, idx) => groupStart + idx
  );

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    router.push(`${urlPath}?currentPage=${page}`);
  };

  const changePrevPageHandler = () => {
    const page = currentPage - 1;
    router.push(`${urlPath}?currentPage=${page}`);
  };
  const changeNextPageHandler = () => {
    const page = currentPage + 1;
    router.push(`${urlPath}?currentPage=${page}`);
  };

  return (
    <div className="flex items-center justify-center gap-[4rem]">
      {currentPage > 1 && (
        <button onClick={changePrevPageHandler}>
          <Image src={ICONS.iconLeftArrow.src} alt={ICONS.iconLeftArrow.alt} />
        </button>
      )}

      {pages.map((page) => (
        <button
          key={page}
          className={`text-[1.8rem] font-extrabold ${
            page === currentPage ? 'text-[#DDDDDD]' : 'text-black'
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button onClick={changeNextPageHandler}>
          <Image
            src={ICONS.iconRightArrow.src}
            alt={ICONS.iconRightArrow.alt}
          />
        </button>
      )}
    </div>
  );
};

export default Pagination;
