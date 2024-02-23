// studentsReducer.js
const initialState = {
  staffTickets: [],
  loading: false
};

const staffTicketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_STAFF_TICKETS':
      return {
        ...state,
        staffTickets: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateStaffTickets = (staffTickets) => ({
  type: 'UPDATE_STAFF_TICKETS',
  payload: staffTickets
});

export default staffTicketsReducer;
