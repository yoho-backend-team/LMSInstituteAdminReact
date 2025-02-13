import secureLocalStorage from 'react-secure-storage';

export const setSecureItem = (key, value) => {
  secureLocalStorage.setItem(key, value);
};

export const removeSecureItem = (key) => {
  secureLocalStorage.removeItem(key);
};

export const setOtp = (data) => {
  setSecureItem("otp", JSON.stringify(data));
};

export const setIsAuthenticated = (value) => {
  setSecureItem('isAuthenticated', value);
};

export const setToken = (token) => {
  setSecureItem('token', token);
};

export const setUserData = (userData) => {
  setSecureItem('userData', JSON.stringify(userData));
};

export const setPermissions = (permissions) => {
  setSecureItem('permissions', JSON.stringify(permissions));
};

export const setBranches = (branches) => {
  setSecureItem('branches', JSON.stringify(branches));
};

export const setInstitute = (institute) => {
  setSecureItem("institute", JSON.stringify(institute));
};

export const setSelectedBranchId = (selectedBranchId) => {
  setSecureItem('selectedBranchId', JSON.stringify(selectedBranchId));
};

export const getSecureItem = (key) => {
  const item = secureLocalStorage.getItem(key);
  try {
    return JSON.parse(item);
  } catch (error) {
    return item;
  }
};