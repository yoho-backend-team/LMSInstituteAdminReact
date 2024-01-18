// groupThunks.js
import { getAllUsers as fetchAllUsers } from '../services/userServices'; // Replace with your service file
import { setUsers, setLoading } from './userSlices';

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllUsers(); // Implement this function in your services
    dispatch(setUsers(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
