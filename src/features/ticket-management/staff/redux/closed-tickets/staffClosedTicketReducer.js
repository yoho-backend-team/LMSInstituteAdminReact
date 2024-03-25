// staffsReducer.js
const initialState = {
  staffClosedTickets: [],
  loading: false
};

const staffClosedTicketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CLOSED_STAFF_TICKETS':
      return {
        ...state,
        staffClosedTickets: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateStaffTickets = (staffClosedTickets) => ({
  type: 'UPDATE_CLOSED_STAFF_TICKETS',
  payload: staffClosedTickets
});

export default staffClosedTicketsReducer;
