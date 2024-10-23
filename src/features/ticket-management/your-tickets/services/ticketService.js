// groupService.js
import axios from 'axios';

const TICKET_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}	/api/institutes/admin/ticket`;
const _TICKET_UPDATE_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}	/api/ticket`;

export const getAllTickets = async (data) => {
  try {
    const response = await axios.get(`${TICKET_END_POINT}/getall`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });   
   
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
    const response = await axios.post(`${TICKET_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'Ticket created successfully' };
    } else {
      return { success: false, message: 'Failed to create Ticket' };
    }
  } catch (error) {
    console.error('Error in createTicket:', error);
    throw error;
  }
};
