const backendUrl = process.env.REACT_APP_PUBLIC_API_URL

export const getImageUrl = (imageKey) => {
    console.log("called")
    return imageKey ? `${backendUrl}/${imageKey}` : '';
}