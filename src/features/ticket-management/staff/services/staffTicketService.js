// groupService.js
import axios from 'axios';

const STAFF_TICKET_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/ticket-management/staff-ticket`;
const STAFF_TICKET_UPDATE_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/ticket-management/staff-ticket`;

export const getAllStaffTickets = async (data) => {
  try {
    const response = await axios.get(`${STAFF_TICKET_API_END_POINT}/get-by-type?page=${data?.page}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });

    console.log(response);
    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch StaffTickets. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStaffTickets:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const updateStaffTicket = async (data) => {
  try {
    const response = await axios.put(`${STAFF_TICKET_UPDATE_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'StaffTicket updated successfully' };
    } else {
      return { success: false, message: 'Failed to update StaffTicket' };
    }
  } catch (error) {
    console.error('Error in updateStaffTicket:', error);
    throw error;
  }
};
