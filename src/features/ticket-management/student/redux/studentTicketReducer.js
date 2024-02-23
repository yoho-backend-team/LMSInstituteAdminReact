// studentsReducer.js
const initialState = {
  studentTickets: [],
  loading: false
};

const studentTicketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_STUDENT_TICKETS':
      return {
        ...state,
        studentTickets: action.payload,
        loading: false
      };
    // Add other cases as needed
    default:
      return state;
  }
};

export const updateStudentTickets = (studentTickets) => ({
  type: 'UPDATE_STUDENT_TICKETS',
  payload: studentTickets
});

export default studentTicketsReducer;
