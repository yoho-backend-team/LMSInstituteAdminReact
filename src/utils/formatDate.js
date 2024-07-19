export const formatDate = (iosString) => {
    const date = new Date(iosString);
    const format = { day: "numeric", month: "long", year: "numeric" };
    const formatedDate = date.toLocaleDateString("en-GB", format);
    return formatedDate;
  };