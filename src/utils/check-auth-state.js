import secureLocalStorage from 'react-secure-storage';

export const checkAuthState = () => {
  if (typeof secureLocalStorage !== undefined) {
    const otp = secureLocalStorage.getItem("otp");
    return otp ? true : false;
  } else {
    return false;
  }
};

export const getOtpDetails = () => {
  const otp = secureLocalStorage.getItem("otp");
  return JSON.parse(otp);
};

export const getUserDetails = () => {
  const user = secureLocalStorage.getItem("userData");
  return JSON.parse(user);
};