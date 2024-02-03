// groupThunks.js
import { getAllStudentFeeRefunds as fetchAllStudentFeeRefunds } from '../services/studentFeeRefundServices'; // Replace with your service file
import { setStudentFeeRefunds, setLoading } from './studentFeeRefundSlice';

export const getAllStudentFeeRefunds = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetchAllStudentFeeRefunds(); // Implement this function in your services
    dispatch(setStudentFeeRefunds(response?.data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
