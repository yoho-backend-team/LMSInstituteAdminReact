// StudentThunks.js
import { getAllStaffTickets as fetchAllStaffTickets } from '../services/staffTicketService'; // Replace with your service file
import { setStaffTickets, setLoading } from './staffTicketSlice';

export const getAllStaffTickets = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStaffTickets(selectedBranchId); // Implement this function in your services
    dispatch(setStaffTickets(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
