// StudentThunks.js
import { getAllStaffTickets as fetchAllStaffOpenTickets } from '../../services/staffTicketService'; // Replace with your service file
import { setStaffOpenTickets, setLoading } from './staffOpenTicketSlice';

export const getAllStaffOpenTickets = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log('thunks layer sending data :',data);
    
    const response = await fetchAllStaffOpenTickets(data); // Implement this function in your services
    console.log(' api open ticket response',response);
    
    dispatch(setStaffOpenTickets(response));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
