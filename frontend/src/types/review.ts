export interface ReviewResponse {
  data: {
    reviews: Review[];
    totalReviews: number; // Note: This was "totalReview" in your example but "totalReviews" in the response
    averageRating: number;
    ratingBreakdown: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
  };
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  date: string; // ISO date string
  patient: {
    fullname: string;
    image: string; // In the response it's always a string, not null
  };
}
