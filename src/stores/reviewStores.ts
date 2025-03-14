import { create } from 'zustand';

interface ReviewStore {
  selectedPlace: GooglePlaceAPIType | null;
  ratings: { [key: string]: number };
  isReviewCompleted: boolean;
  savedReview: {
    selectedPlace: GooglePlaceAPIType | null;
    ratings: { [key: string]: number };
    averageRating: number;
  } | null;
  setSelectedPlace: (place: GooglePlaceAPIType | null) => void;
  setRating: (question: string, rating: number) => void;
  getAverageRating: () => number;
  completeReview: () => void;
  reset: () => void;
  savedDataReset: () => void;
}

export const useReviewStore = create<ReviewStore>((set, get) => ({
  selectedPlace: null,
  ratings: {},
  averageRating: 0,
  isReviewCompleted: false,
  savedReview: null,
  setSelectedPlace: (place) => set({ selectedPlace: place }),
  setRating: (question, rating) =>
    set((state) => ({
      ratings: { ...state.ratings, [question]: rating },
    })),
  getAverageRating: () => {
    const { ratings } = get();
    const values = Object.values(ratings);
    return values.length
      ? values.reduce((a, b) => a + b, 0) / values.length
      : 0;
  },
  completeReview: () => {
    const { selectedPlace, ratings, getAverageRating } = get();
    set({
      isReviewCompleted: true,
      savedReview: {
        selectedPlace,
        ratings,
        averageRating: Math.round(getAverageRating()),
      },
    });
  },
  reset: () => set({ selectedPlace: null, ratings: {} }),
  savedDataReset: () => set({ isReviewCompleted: false, savedReview: null }),
}));
