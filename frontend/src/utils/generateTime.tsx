export const generateTimeOptions = () =>
  Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    const ampm = hour < 12 ? "AM" : "PM";
    const displayHour = hour % 12 || 12;
    return {
      value: `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}:00.000`,
      label: `${displayHour}:${minute.toString().padStart(2, "0")} ${ampm}`,
      shortLabel: `${displayHour}${ampm}`,
    };
  });
