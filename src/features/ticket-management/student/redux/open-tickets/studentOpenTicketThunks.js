// StudentThunks.js
import { getAllStudentTickets as fetchAllStaffOpenTickets } from '../../services/studentTicketService'; // Replace with your service file
import { setStudentOpenTickets, setLoading } from './studentOpenTicketSlice';

export const getAllStudentOpenTickets = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStaffOpenTickets(data);
    console.log(response,"response") // Implement this function in your services
    dispatch(setStudentOpenTickets(response));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
