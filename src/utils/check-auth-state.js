

export const checkAuthState = () => {
    if(typeof localStorage !==undefined){
    const otp = localStorage.getItem("otp")
    return otp ? true : false
    }else{
        return false
    }
}

export const getOtpDetails = () => {
    const otp = localStorage.getItem("otp")
    
    return JSON.parse(otp)
}

export const getUserDetails = () => {
    const user = localStorage.getItem("userData")
    return JSON.parse(user)
}