// faqCategoryReducer.js
const initialState = {
  communities: [],
  loading: false
};

const communitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_COMMUNITY':
      return {
        ...state,
        communities: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateCommunities = (communities) => ({
  type: 'UPDATE_COMMUNITY',
  payload: communities
});

export default communitiesReducer;
