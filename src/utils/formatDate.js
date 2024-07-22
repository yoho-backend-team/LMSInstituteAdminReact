export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const format = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", format);
  return formattedDate;
};

export const formatTime = (isoString) => {
  const date = new Date(isoString);
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = date.toLocaleTimeString("en-US", options);
  return formattedTime;
};
