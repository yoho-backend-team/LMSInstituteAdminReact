// StudentThunks.js
import { getAllStudentTickets as fetchAllStudentTickets } from '../services/studentTicketService'; // Replace with your service file
import { setStudentTickets, setLoading } from './studentTicketSlice';

export const getAllStudentTickets = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStudentTickets(selectedBranchId); // Implement this function in your services
    dispatch(setStudentTickets(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
