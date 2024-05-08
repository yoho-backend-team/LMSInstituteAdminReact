

export const checkAuthState = () => {
    if(typeof localStorage !==undefined){
    const otp = localStorage.getItem("otp")
    console.log(otp)
    return otp ? true : false
    }else{
        return false
    }
}

export const getOtpDetails = () => {
    const otp = localStorage.getItem("otp")
    
    return JSON.parse(otp)
}