// Updated color palette based on your website
export const getColorPalette = () => ({
  primary: "#71C9CE", // Light teal
  secondary: "#A6E3E9", // Medium teal
  light: "#CBF1F5", // Light blue
  background: "#E3FDFD", // Very light blue
  dark: "#4AA8B5", // Darker teal for contrast
  warning: "#FFD166", // Yellow for star ratings
  success: "#06D6A0", // Green for 5 stars
  error: "#EF476F", // Pink for 1 star
});

export const getStarColor = (rating: number) => {
  if (rating >= 4.5) return "#4caf50"; // Green
  if (rating >= 3.5) return "#fbc02d"; // Amber
  if (rating >= 2.5) return "#ff9800"; // Orange
  return "#f44336"; // Red
};
