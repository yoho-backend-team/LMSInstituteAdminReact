// groupService.js
import axios from 'axios';

const STUDENT_TICKET_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/ticket/`;
const STUDENT_TICKET_UPDATE_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/ticket/`;

export const getAllStudentTickets = async (data) => {
  try {
    const response = await axios.get(`${STUDENT_TICKET_END_POINT}/getStudentTicket`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log('getAllStudentTickets:', response);
    // Check if the response status is successful
    
      return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudentTickets:', error);
    throw new Error(`Failed to fetch Students Ticket. Status: ${error?.response?.data?.message}`);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const updateStudentTicket = async (data) => {
  try {
    const response = await axios.put(`${STUDENT_TICKET_UPDATE_API_END_POINT}/updateticket/:id`, data, {
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
