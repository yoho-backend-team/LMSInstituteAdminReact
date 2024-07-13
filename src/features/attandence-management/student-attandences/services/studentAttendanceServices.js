// groupService.js
import axios from 'axios';

const STUDENT_ATTENDANCES_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/attendance`;

export const getAllStudentAttendances = async (data) => {
  try {
    const response = await axios.get(`${STUDENT_ATTENDANCES_API_END_POINT}/getall`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);
    
      return response;
   
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudentAttendances:', error);

    throw new Error(`Failed to fetch getAllStudentAttendances. Status: ${error?.response?.data?.message}`);
    }
};

export const searchStudentAttendances = async (searchQuery) => {
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
    console.error('Error in searchStudentAttendances:', error);
    throw error;
  }
};

export const addStudentAttendance = async (data) => {
  try {
    const response = await axios.post(`${STUDENT_ATTENDANCES_API_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentAttendance created successfully' };
    } else {
      return { success: false, message: 'Failed to create StudentAttendance' };
    }
  } catch (error) {
    console.error('Error in addStudentAttendance:', error);
    throw error;
  }
};

export const deleteStudentAttendance = async (StudentAttendanceId) => {
  try {
    const response = await axios.delete(`${STUDENT_ATTENDANCES_API_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: StudentAttendanceId }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentAttendance deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete StudentAttendance' };
    }
  } catch (error) {
    console.error('Error in deleteStudentAttendance:', error);
    throw error;
  }
};

export const updateStudentAttendance = async (data) => {
  try {
    const response = await axios.put(`${STUDENT_ATTENDANCES_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'StudentAttendance updated successfully' };
    } else {
      return { success: false, message: 'Failed to update StudentAttendance' };
    }
  } catch (error) {
    console.error('Error in updateStudentAttendance:', error);
    throw error;
  }
};

export const getClassDetails = async (data) => {
  try {
    console.log(data,"data")
    const response = await axios.get(`${STUDENT_ATTENDANCES_API_END_POINT}/${data.class_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);
    // Check if the response status is successful
   
      return {
        success: true,
        data: response?.data
      };
    
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getOfflineClassDetails:', error);

    throw new Error(`Failed to fetch getOfflineClassDetails. Status: ${error?.response?.data?.message}`);
  }
};

export const updateStudentAttendanceStatus = async (data) => {
  try {
    const response = await axios.put(`${STUDENT_ATTENDANCES_API_END_POINT}/status-update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log('Notesresponse:', response);
    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'StudentAttendance status updated successfully' };
    } else {
      return { success: false, message: 'Failed to update StudentAttendance status' };
    }
  } catch (error) {
    console.error('Error in updateStudentAttendance:', error);
    throw error;
  }
};
