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


export const formatDateToTextAsPastValue = (dateString) => {
  const now = new Date()
  const pastDate = new Date(dateString)
  const diffInSeconds = Math.floor( (now - pastDate) / 1000 )

  const timeIntervals = {
    year : 315360000,
    month : 2592000,
    week : 604800,
    day : 86400,
    hour : 3600,
    minute : 60,
    second : 1
  }

  for(let interval in timeIntervals){
      const timeDiff = Math.floor( diffInSeconds / timeIntervals[interval])

      if(timeDiff >= 1){
        return timeDiff === 1 ? `${timeDiff} ${interval} ago` : `${timeDiff} ${interval}s ago`
      }
  }
  return 'just now'
}