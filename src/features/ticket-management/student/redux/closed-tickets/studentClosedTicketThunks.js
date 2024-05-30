// StudentThunks.js
import { getAllStudentTickets as fetchAllStaffOpenTickets } from '../../services/studentTicketService'; // Replace with your service file
import { setStudentClosedTickets, setLoading } from './studentClosedTicketSlice';

export const getAllStudentClosedTickets = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStaffOpenTickets(data); // Implement this function in your services
    dispatch(setStudentClosedTickets(response));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
