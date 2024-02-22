// nonTeachingAttendanceThunks.js
import { getAllNonTeachingStaffAttendances as fetchAllNonTeachingStaffAttendances } from '../services/nonTeachingStaffAttendanceServices'; // Replace with your service file
import { setNonTeachingStaffAttendances, setLoading } from './nonTeachingStaffAttendanceSlice';

export const getAllNonTeachingStaffAttendances = (selectedBranchId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllNonTeachingStaffAttendances(selectedBranchId); // Implement this function in your services
    dispatch(setNonTeachingStaffAttendances(response?.data?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
