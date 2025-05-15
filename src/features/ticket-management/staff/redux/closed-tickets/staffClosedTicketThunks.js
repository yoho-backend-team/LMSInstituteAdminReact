// StudentThunks.js
import { getAllStaffTickets as fetchAllStaffOpenTickets } from '../../services/staffTicketService'; // Replace with your service file
import { setStaffClosedTickets, setLoading } from './staffClosedTicketSlice';

export const getAllStaffClosedTickets = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStaffOpenTickets(data); // Implement this function in your services
    dispatch(setStaffClosedTickets(response));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
