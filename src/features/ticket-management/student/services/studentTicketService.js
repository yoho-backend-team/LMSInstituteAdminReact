import client from 'api/client';
import axios from 'axios';

const STUDENT_TICKET_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/ticket/`;
const STUDENT_TICKET_UPDATE_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/ticket/`;

export const getAllStudentTickets = async (data) => {
  try {
    const response = await client.ticket.student_tickets(data)    
      return response;
  } catch (error) {
 
    console.error('Error in getAllStudentTickets:', error);
    throw new Error(`Failed to fetch Students Ticket. Status: ${error?.response?.data?.message}`);

    throw error;
  }
};

export const updateStudentTicket = async (data) => {
  try {
    const response = await client?.ticket?.update_student_ticket(data)
  
    return { success: true, message: 'StudentTicket updated successfully' };

  } catch (error) {
    console.error('Error in updateStudentTicket:', error);
    return { success: false, message: error?.response?.data?.message };
  }
};



export const getStudentTicketWithId = async (data) => {
  try {
    const response = await client.ticket.student_ticket_with_id(data)
    // Check if the response status is successful
    return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStaffTickets:', error);
    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch StaffTickets. Status: ${error?.response?.data?.message}`);
  }
};  


