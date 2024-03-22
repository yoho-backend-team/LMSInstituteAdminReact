// staffsReducer.js
const initialState = {
  staffOpenTickets: [],
  loading: false
};

const staffOpenTicketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_OPEN_STAFF_TICKETS':
      return {
        ...state,
        staffOpenTickets: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateStaffTickets = (staffOpenTickets) => ({
  type: 'UPDATE_OPEN_STAFF_TICKETS',
  payload: staffOpenTickets
});

export default staffOpenTicketsReducer;
