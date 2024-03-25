// studentsReducer.js
const initialState = {
  studentOpenTickets: [],
  loading: false
};

const studentOpenTicketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_OPEN_STUDENT_TICKETS':
      return {
        ...state,
        studentOpenTickets: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateStudentTickets = (studentOpenTickets) => ({
  type: 'UPDATE_OPEN_STUDENT_TICKETS',
  payload: studentOpenTickets
});

export default studentOpenTicketsReducer;
