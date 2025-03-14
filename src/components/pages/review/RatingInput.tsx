import React, { useState } from 'react';
import { useReviewStore } from '@/stores/reviewStores';
import Star from './Star';

const RATINGS = [1, 2, 3, 4, 5];

interface RatingInputProps {
  question: string;
}

export default function RatingInput({ question }: RatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const { ratings, setRating } = useReviewStore();
  const rating = ratings[question] || 0;

  const handleStarClick = (value: number) => {
    setRating(question, value);
  };

  const handleStarMouseOver = (value: number) => {
    setHoverRating(value);
  };

  const handleStarMouseOut = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex flex-col gap-[0.8]">
      <p className="text-[1.6rem] leading-[2.08rem]">{question}</p>
      <ul className="flex gap-[0.1rem]">
        {RATINGS.map((starRating) => (
          <li key={starRating}>
            <Star
              selected={starRating <= (hoverRating || rating)}
              onClick={() => handleStarClick(starRating)}
              onMouseOver={() => handleStarMouseOver(starRating)}
              onMouseOut={handleStarMouseOut}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
