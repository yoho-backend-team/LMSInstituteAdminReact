// faqCategoryReducer.js
const initialState = {
    Helpcenter: [],
    loading: false
  };
  
  const HelpReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_HELP_CENTER':
        return {
          ...state,
          Helpcenter: action.payload,
          loading: false
        };
      // Add other cases as needed
      default:
        return state;
    }
  };
  
  export const updateHelpCenter = (Helpcenter) => ({
    type: 'UPDATE_HELP_CENTER',
    payload: Helpcenter
  });
  
  export default HelpReducer;
  