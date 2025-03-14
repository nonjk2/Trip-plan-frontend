import { TNAV_OPTIONS } from '@/types/sideNavigation';

export const NAV_OPTIONS: TNAV_OPTIONS[] = [
  {
    category: '나의 트립 플랜',
    listItems: [
      {
        title: '내 게시물',
        urlPath: 'my-post/plans',
        order: 1,
        subItems: [
          {
            title: '일정',
            urlPath: 'my-post/plans',
          },
          {
            title: '후기',
            urlPath: 'my-post/reviews',
          },
        ],
      },
      {
        title: '찜한 게시물',
        urlPath: 'dibs/plans',
        order: 2,

        subItems: [
          {
            title: '일정',
            urlPath: 'dibs/plans',
          },
          {
            title: '후기',
            urlPath: 'dibs/reviews',
          },
        ],
      },
      {
        title: '임시 저장',
        urlPath: 'storage',
        order: 4,
      },
    ],
  },
  {
    category: '내 활동',
    listItems: [
      {
        title: '내가 쓴 댓글',
        urlPath: 'my-comments',
        order: 3,
      },
    ],
  },
  // {
  //   category: '기타',
  //   listItems: [
  //     {
  //       title: '문의사항',
  //       urlPath: 'inquiry',
  //     },
  //   ],
  // },
];
