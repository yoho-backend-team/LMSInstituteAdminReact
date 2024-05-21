// studentFeeRefundservice.js
import axios from 'axios';

const STUDENT_FEE_REFUND_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/payments/refund/`;

export const getAllStudentFeeRefunds = async (data) => {
  try {
    console.log(`${STUDENT_FEE_REFUND_API_ENDPOINT}all`)
    const response = await axios.get(`${STUDENT_FEE_REFUND_API_ENDPOINT}all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });

    console.log(response);

    // Check if the response status is successful
    
      return response;
   
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudentFeeRefunds:', error);
    throw new Error(`Failed to fetch StudentFeeRefunds. Status: ${error}`);
 
  }
};

export const searchStudentFeeRefunds = async (searchQuery) => {
  try {
    await axios.get(`${STUDENT_FEE_REFUND_API_ENDPOINT}search`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
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
      },
      params:data,
    });

    
    return { success: true, message: 'StudentFeeRefund created successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to create StudentFeeRefund' };
  }
};

export const deleteStudentFeeRefund = async (data) => {
  try {
    
    const response = await axios.delete(`${STUDENT_FEE_REFUND_API_ENDPOINT}${data.transaction_id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      data: data
    });
    
      return { success: true, message: 'StudentFeeRefund deleted successfully' };
  } catch (error) {
    console.error('Error in deleteStudentFeeRefund:', error);
    return { success: false, message: error?.response?.data?.message? error?.response?.data?.message: 'Failed to delete Refund Details' };
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
