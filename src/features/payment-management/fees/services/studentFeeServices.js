// studentFeeService.js
import client from 'api/client';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const STUDENT_FEE_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/payments/student-fee`;

export const getAllStudentFees = async (data) => {
  console.log(data);
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${STUDENT_FEE_API_ENDPOINT}/all`, {
      headers: {
        'Content-Type': 'application/json',
<<<<<<< HEAD
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
=======
        Authorization: `Bearer ${'Token ' + token}`
>>>>>>> a8d8554387264e85ea792f13f7281cd5e0c92bd4
      },
      params: data

    });
console.log(response);

    // Check if the response status is successful
    return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudentFees:', error);

    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch StudentFees. Status: ${error}`);
  }
};

export const getFeeByStudentId = async (data) => {
  try {
    const response = await axios.get(`${STUDENT_FEE_API_ENDPOINT}/${data.student_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      },
    });

    // Check if the response status is successful
    return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudentFees:', error);

    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch StudentFees. Status: ${response.status}`);
  }
};

export const searchStudentFees = async (searchQuery) => {
  try {
    const response = await axios.get('/data_storage/user-management/groups/AllGroups.json', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
      },
      params: { search: searchQuery }
    });

    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Failed to fetch search results' };
    }
  } catch (error) {
    console.error('Error in searchStudentFees:', error);
    throw error;
  }
};

export const addStudentFee = async (data) => {
  try {
    const response = await client?.payment?.student_fee?.create(data)

    return { success: true, message: 'StudentFee created successfully' };
  } catch (error) {
    console.error('Error in addStudentFee:', error);
    return { success: false, message: error?.response?.data?.message };
  }
};

export const deleteStudentFee = async (data) => {
  try {
    const response = await axios.delete(`${STUDENT_FEE_API_ENDPOINT}/${data.transaction_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      },
      params: data
    });

    return { success: true, message: 'StudentFee deleted successfully' };
  } catch (error) {
    console.error('Error in deleteStudentFee:', error);
    return { success: false, message: error?.response?.data?.message ? error?.response?.data?.message : 'Failed to delete student fees' };
  }
};

export const updateStudentFee = async (data) => {
  try {
    const response = await axios.put(`${STUDENT_FEE_API_ENDPOINT}/update/${data._id}`, data, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      }
    });

    return { success: true, message: 'StudentFee updated successfully' };
  } catch (error) {
    console.error('Error in updateStudentFee:', error);
    return { success: false, message: error?.response?.data?.message ? error?.response?.data?.message : 'Failed to update Student Fees' };
  }
};