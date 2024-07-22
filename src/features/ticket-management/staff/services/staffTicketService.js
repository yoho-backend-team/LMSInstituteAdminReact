// groupService.js
import client from 'api/client';
import axios from 'axios';

const STAFF_TICKET_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/ticket-management/staff-ticket`;
const STAFF_TICKET_UPDATE_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/ticket-management/staff-ticket`;

export const getAllStaffTickets = async (data) => {
  try {
    const response = await client.ticket.staff_ticket(data)
    // Check if the response status is successful
    return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStaffTickets:', error);
    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch StaffTickets. Status: ${error?.response?.data?.message}`);
  }
};  


export const getStaffTicketWithId = async (data) => {
  try {
    const response = await client.ticket.staff_ticket_with_id(data)
    // Check if the response status is successful
    return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStaffTickets:', error);
    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch StaffTickets. Status: ${error?.response?.data?.message}`);
  }
};  




export const updateStaffTicket = async (data) => {
  try {
    const response = await client.ticket.staff_ticket_update(data)

    return { success: true, message: 'StaffTicket updated successfully' };
  } catch (error) {
    console.error('Error in updateStaffTicket:', error);
    return { success: false, message: error?.response?.data?.message };
  }
};
