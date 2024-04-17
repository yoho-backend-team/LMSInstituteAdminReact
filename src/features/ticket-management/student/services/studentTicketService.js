// groupService.js
import axios from 'axios';

const STUDENT_TICKET_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/ticket-management/student-ticket`;
const STUDENT_TICKET_UPDATE_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/ticket-management/student-ticket`;

export const getAllStudentTickets = async (data) => {
  try {
    const response = await axios.get(`${STUDENT_TICKET_END_POINT}/get-by-type?page=${data?.page}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log('getAllStudentTickets:', response);
    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch StudentTickets. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudentTickets:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const updateStudentTicket = async (data) => {
  try {
    const response = await axios.put(`${STUDENT_TICKET_UPDATE_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'StudentTicket updated successfully' };
    } else {
      return { success: false, message: 'Failed to update StudentTicket' };
    }
  } catch (error) {
    console.error('Error in updateStudentTicket:', error);
    throw error;
  }
};
