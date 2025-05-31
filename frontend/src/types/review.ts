export interface ReviewResponse {
  data: {
    reviews: Review[];
  };
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  date: string; // ISO date string
  patient: {
    fullname: string;
    image: string | null; // Can be null if no image is available
  };
}
