import { Review } from "@/types/review";

export function filterReviews(
  reviews: Review[],
  searchQuery: string,
  ratingFilter: string,
  dateRange: [Date | null, Date | null]
): Review[] {
  return reviews.filter((review) => {
    const matchesSearch =
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.patient.fullname.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRating =
      ratingFilter === "all" || review.rating === parseInt(ratingFilter);

    const matchesDate =
      !dateRange[0] ||
      !dateRange[1] ||
      (new Date(review.date) >= dateRange[0] &&
        new Date(review.date) <= dateRange[1]);

    return matchesSearch && matchesRating && matchesDate;
  });
}

export function sortReviews(reviews: Review[], sortOption: string): Review[] {
  return [...reviews].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });
}
