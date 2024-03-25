// StudentThunks.js
import { getAllStaffTickets as fetchAllStaffOpenTickets } from '../../services/staffTicketService'; // Replace with your service file
import { setStaffOpenTickets, setLoading } from './staffOpenTicketSlice';

export const getAllStaffOpenTickets = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStaffOpenTickets(data); // Implement this function in your services
    dispatch(setStaffOpenTickets(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
