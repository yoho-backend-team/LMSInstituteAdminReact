// authReducer.js
const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem('token') || null,
  userId: localStorage.getItem('userData') || null,
  errorMessage: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        userData: action.payload.userData,
        errorMessage: ''
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userData: null,
        errorMessage: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userData: null,
        errorMessage: ''
      };
    case 'LOGOUT_FAILURE':
      return {
        ...state,
        isAuthenticated: true,
        token: localStorage.getItem('token') || null,
        userId: localStorage.getItem('userData') || null,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
