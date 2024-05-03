const getInstituteDetails = () => {
    if(typeof(localStorage) !== "undefined"){
    const institute = localStorage.getItem("institute")
    return institute
    }else{
     return undefined
    }
}
const backEndUrl = process.env.REACT_APP_PUBLIC_API_URL
const institute = getInstituteDetails()
console.log(institute,"institute")
export const HTTP_END_POINTS ={
     category:{
        getAll : `${backEndUrl}institutes/${institute.uuid}/categories/`
     }
}