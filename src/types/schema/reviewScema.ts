import { z } from 'zod';

const contentSchema = z.string().refine(
  (html) => {
    const textOnly = html.replace(/<[^>]+>/g, '').trim();
    const hasValidText = textOnly.length > 0;
    const hasImage = /<img[^>]*>/g.test(html);
    return hasValidText || hasImage;
  },
  { message: '내용을 입력하세요.' }
);

export const reviewSchema = z.object({
  title: z.string().trim().min(1, '제목을 입력하세요.'),
  placeId: z.string().min(1, '방문 장소를 입력하세요.'),
  latitude: z.number().min(-90).max(90, '위도가 올바르지 않습니다.'),
  longitude: z.number().min(-180).max(180, '경도가 올바르지 않습니다.'),
  content: contentSchema,
  visitedDay: z
    .instanceof(Date)
    .nullable()
    .refine((date) => date !== null, {
      message: '방문 날짜를 선택하세요.',
    }),
});
