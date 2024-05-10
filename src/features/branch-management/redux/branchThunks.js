// groupThunks.js
import { getAllBranchesByInstitute as fetchAllBranches } from '../services/branchServices'; // Replace with your service file
import { setBranches, setLoading } from './branchSlice';
// import { updateAuthBranch } from 'features/authentication/authActions';

export const getAllBranches = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllBranches(data);
    console.log(response,"response",data,response.data.data) // Implement this function in your services
    dispatch(setBranches(response.data));
    // dispatch(updateAuthBranch(response.data.data.data));
    localStorage.setItem('branches', JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
