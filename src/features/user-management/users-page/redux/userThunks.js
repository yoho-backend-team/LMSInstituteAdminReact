// groupThunks.js
import { getAllUsers as fetchAllUsers } from '../services/userServices'; // Replace with your service file
import { setUsers, setLoading } from './userSlices';

export const getAllUsers = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllUsers(data);
    console.log(response,"response")
    dispatch(setUsers(response));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
