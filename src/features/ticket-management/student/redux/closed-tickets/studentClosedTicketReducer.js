// studentsReducer.js
const initialState = {
  studentClosedTickets: [],
  loading: false
};

const studentClosedTicketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CLOSED_STUDENT_TICKETS':
      return {
        ...state,
        studentClosedTickets: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateStudentTickets = (studentClosedTickets) => ({
  type: 'UPDATE_CLOSED_STUDENT_TICKETS',
  payload: studentClosedTickets
});

export default studentClosedTicketsReducer;
