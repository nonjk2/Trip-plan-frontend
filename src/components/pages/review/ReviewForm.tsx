'use client';

import Button from '@/components/common/Button';
import ReviewTitleInput from './ReviewTitleInput';
import ReviewPlaceInfo from './ReviewPlaceInfo';
import ReviewTextEditor from './ReviewTextEditor';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useReviewStore } from '@/stores/reviewStores';
import { getImgUrl, postAddReview } from '@/apis/review';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { reviewSchema } from '@/types/schema/reviewScema';
import toast from 'react-hot-toast';

interface IpostData {
  title: string;
  placeId: string;
  latitude: number;
  longitude: number;
  content: string;
  visitedDay: Date | null;
  averageRating: number;
}

const ReviewForm = () => {
  const accessToken = Cookies.get('accessToken') as string;
  const [title, setTitle] = useState('');
  const [visitDate, setVisitDate] = useState<Date | null>(null);
  const [content, setContent] = useState('');
  const { savedReview } = useReviewStore();
  const router = useRouter();

  const srcArray: string[] = []; // src 추출
  const urlArray: string[] = []; // 이미지 반환 url
  const getimgTagRegex = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;
  let match;

  const addReviewPostMutation = useMutation({
    mutationFn: (postData: IpostData) => postAddReview(postData, accessToken),
    onSuccess: () => {
      toast.success('게시글이 생성되었습니다.');
      router.push('/');
    },
  });

  const handleSubmit = async () => {
    while ((match = getimgTagRegex.exec(content)) !== null) {
      const result = match[2];
      srcArray.push(result);
      const byteString = atob(result.split(',')[1]);

      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ia], {
        type: 'image/jpeg',
      });
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

      const imgFormData = new FormData();
      imgFormData.append('image', file);

      const url = await getImgUrl(imgFormData, accessToken);
      urlArray.push(url.imageUrl);
    }

    let endContent = content;

    if (srcArray.length > 0) {
      for (let i = 0; i < srcArray.length; i++) {
        const replace = endContent.replace(srcArray[i], urlArray[i]);
        endContent = replace;
      }
    }

    try {
      const postData = {
        title: title,
        placeId: savedReview?.selectedPlace?.place_id || '',
        latitude: savedReview?.selectedPlace?.location?.lat || 0,
        longitude: savedReview?.selectedPlace?.location?.lng || 0,
        content: endContent,
        visitedDay: visitDate,
        averageRating: savedReview?.averageRating || 0,
      };

      const validationResult = reviewSchema.safeParse(postData);

      if (!validationResult.success) {
        toast.error(validationResult.error.errors[0].message);
        return;
      }

      addReviewPostMutation.mutate(postData);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section>
      <div className="mb-[1.6rem] flex items-center justify-between">
        <h2 className="text-[2rem] font-semibold leading-[3rem]">
          여행 후기 작성하기
        </h2>
        <Button
          btnColor="white"
          size="md"
          className="text-var-primary-500 rounded"
          onClick={handleSubmit}
        >
          등록
        </Button>
      </div>
      <ReviewTitleInput title={title} setTitle={setTitle} />
      <ReviewPlaceInfo visitDate={visitDate} setVisitDate={setVisitDate} />
      <ReviewTextEditor content={content} setContent={setContent} />
    </section>
  );
};

export default ReviewForm;
