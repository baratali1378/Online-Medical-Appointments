export interface RatingBreakdown {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}
export interface ReviewResponse {
  data: {
    reviews: Review[];
    totalReviews: number;
    averageRating: number;
    ratingBreakdown: RatingBreakdown;
  };
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  date: string; // ISO date string
  patient: {
    id?: number;
    fullname: string;
    image: string; // In the response it's always a string, not null
    city?: string;
  };
}
