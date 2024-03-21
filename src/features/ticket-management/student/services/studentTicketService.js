// groupService.js
import axios from 'axios';

const STUDENT_TICKET_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/ticket-management/student-ticket`;

export const getAllStudentTickets = async (data) => {
  try {
    const response = await axios.get(`${STUDENT_TICKET_END_POINT}/get-by-type`, {
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

export const searchStudentTickets = async (searchQuery) => {
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
    console.error('Error in searchStudentTickets:', error);
    throw error;
  }
};

export const addStudentTicket = async (data) => {
  try {
    const response = await axios.post(`${STUDENT_TICKET_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentTicket created successfully' };
    } else {
      return { success: false, message: 'Failed to create StudentTicket' };
    }
  } catch (error) {
    console.error('Error in addStudentTicket:', error);
    throw error;
  }
};

export const deleteStudentTicket = async (StudentTicketId) => {
  try {
    const response = await axios.delete(`${STUDENT_TICKET_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: StudentTicketId }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentTicket deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete StudentTicket' };
    }
  } catch (error) {
    console.error('Error in deleteStudentTicket:', error);
    throw error;
  }
};

export const updateStudentTicket = async (data) => {
  try {
    const response = await axios.put(`${STUDENT_TICKET_END_POINT}/update`, data, {
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
