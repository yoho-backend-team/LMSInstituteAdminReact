// studentFeeRefundservice.js
import axios from 'axios';

const STUDENT_FEE_REFUND_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/payments/refund/`;

export const getAllStudentFeeRefunds = async (data) => {
  try {
    const response = await axios.get(`${STUDENT_FEE_REFUND_API_ENDPOINT}/all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });


    // Check if the response status is successful
    return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudentFeeRefunds:', error);
    throw new Error(`Failed to fetch StudentFeeRefunds. Status: ${error}`);
    // Throw the error again to propagate it to the calling function/component
  }
};

export const searchStudentFeeRefunds = async (searchQuery) => {
  try {
    const response = await axios.get('/data_storage/user-management/groups/AllGroups.json', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { search: searchQuery }
    });

    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Failed to fetch search results' };
    }
  } catch (error) {
    console.error('Error in searchStudentFeeRefunds:', error);
    throw error;
  }
};

export const addStudentFeeRefund = async (data) => {
  try {
    
    const response = await axios.post(`${STUDENT_FEE_REFUND_API_ENDPOINT}create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });

    
    return { success: true, message: 'StudentFeeRefund created successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to create StudentFeeRefund' };
  }
};

export const deleteStudentFeeRefund = async (data) => {
  try {
    const response = await axios.post(`${STUDENT_FEE_REFUND_API_ENDPOINT}/delete`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: data
    });
    console.log(response.data);
    if (response.data.status) {
      return { success: true, message: 'StudentFeeRefund deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete StudentFeeRefund' };
    }
  } catch (error) {
    console.error('Error in deleteStudentFeeRefund:', error);
    throw error;
  }
};

export const updateStudentFeeRefund = async (data) => {
  try {
    const response = await axios.put(`${STUDENT_FEE_REFUND_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'StudentFeeRefund updated successfully' };
    } else {
      return { success: false, message: 'Failed to update StudentFeeRefund' };
    }
  } catch (error) {
    console.error('Error in updateStudentFeeRefund:', error);
    throw error;
  }
};
