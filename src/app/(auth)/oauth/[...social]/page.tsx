'use client';

import Loading from '@/components/common/Loading';
import { useRouter } from 'next/navigation';
import { use, useEffect } from 'react';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Page = (props: { searchParams: SearchParams }) => {
  const paramas = use(props.searchParams);
  const router = useRouter();
  useEffect(() => {
    const fetchAuthUser = async () => {
      const { socialId } = paramas;
      if (!socialId) {
        console.error('소셜 ID가 없음.');
        return;
      }
      const res: Response = await fetch(`/api/proxy/token/issue/${socialId}`, {
        credentials: 'include',
        method: 'POST',
      });
      if (!res.ok) {
        throw Error('로그인고장');
      }
      const { data }: SuccessCode<loginToKenData> = await res.json();
      const { accessToken, refreshToken } = data;

      const cookieResponse = await fetch('/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ accessToken, refreshToken, socialId }),
      });

      if (!cookieResponse.ok) {
        // console.error('쿠키 저장 실패ddd');
        return;
      }
      router.push('/');
      // console.log('토큰이 쿠키에 저장됨');
    };

    fetchAuthUser();
  }, [paramas, router]);
  return <Loading />;
};
export default Page;
