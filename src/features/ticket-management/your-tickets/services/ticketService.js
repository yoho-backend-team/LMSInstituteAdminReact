// groupService.js
import client from 'api/client';
import axios from 'axios';
import { getErrorMessage } from 'utils/error-handler';

const TICKET_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}	/api/institutes/admin/ticket`;
const _TICKET_UPDATE_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}	/api/ticket`;

export const getAllTickets = async (data) => {
  try {
    const response = await client.ticket.admin.get_all(data)  
    return response;
  } catch (error) {
    
    console.error('Error in getAllTickets:', error);

    
    throw new Error(`Failed to fetch Tickets. Status: ${response.status}`);
  }
};

export const updateTicket = async (data) => {
  try {
    const response = await axios.put(`${_TICKET_UPDATE_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'Ticket updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Ticket' };
    }
  } catch (error) {
    console.error('Error in updateTicket:', error);
    throw error;
  }
};

export const CreateTicket = async (data) => {
  try {
    await client.ticket.admin.create_ticket(data)

    return { success: true, message: 'Ticket created successfully' };
  } catch (error) {
    const error_message = getErrorMessage(error)
    throw new Error(error_message)
  }
};

export const getAdminTicketWithId = async (data) => {
  try {
   const response = await client.ticket.admin.get_with_id(data)
   return  response
  } catch (error) {
    const error_message = getErrorMessage(error)
    throw new Error(error_message)
  }
}
