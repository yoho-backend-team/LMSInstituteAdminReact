import secureLocalStorage from "react-secure-storage";


// authReducer.js
const branches = JSON.parse(secureLocalStorage.getItem('branches'));
console.log("Branchessss",branches)
const selectedBranchId = secureLocalStorage.getItem('selectedBranchId');
const haveBranchId = () => {
  if (branches) {
    if (selectedBranchId) {
      try {
        return JSON.parse(selectedBranchId); 
      } catch (e) {
        return selectedBranchId;
      }
    } else {
      return branches[0]?.uuid;
    }
  } else {
    return null;
  }
};

const initialState = {
  isAuthenticated: secureLocalStorage.getItem('isAuthenticated') || false,
  token: secureLocalStorage.getItem('token') || null,
  userData: JSON.parse(secureLocalStorage.getItem('userData')) || null,
  permissions: JSON.parse(secureLocalStorage.getItem('permissions')) || null,
  branches: JSON.parse(secureLocalStorage.getItem('branches')) || null,
  institute: JSON.parse(secureLocalStorage.getItem("institute")) || null,
  selectedBranchId: haveBranchId(),
  errorMessage: ''
};

const authReducer = (state = initialState, action) => {
//  console.log(state,action)
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      // d
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        userData: action.payload.userData,
        permissions: action.payload.permissions,
        branches: action.payload.branches,
        selectedBranchId: action.payload?.branches[0]?.uuid,
        institute:action.payload.institute,
        errorMessage: ''
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userData: null,
        permissions: null,
        branches: null,
        selectedBranchId: null,
        errorMessage: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userData: null,
        permissions: null,
        branches: null,
        selectedBranchId: null,
        errorMessage: ''
      };
    case 'LOGOUT_FAILURE':
      return {
        ...state,
        isAuthenticated: true,
        token: secureLocalStorage.getItem('token') || null,
        userData: JSON.parse(secureLocalStorage.getItem('userData')) || null,
        permissions: JSON.parse(secureLocalStorage.getItem('userData')) || null,
        branches: JSON.parse(secureLocalStorage.getItem('branches')) || null,
        selectedBranchId: JSON.parse(secureLocalStorage.getItem('branches'))[0]?.uuid || null,
        errorMessage: action.payload
      };
    case 'UPDATE_SELECTED_BRANCH':
      return {
        ...state,
        selectedBranchId: action.payload
      };
    case 'UPDATE_BRANCH':
      return {
        ...state,
        branches: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
