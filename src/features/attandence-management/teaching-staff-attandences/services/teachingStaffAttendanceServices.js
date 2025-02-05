// groupService.js
import client from 'api/client';
import axios from 'axios';
import { getErrorMessage } from 'utils/error-handler';
import secureLocalStorage from 'react-secure-storage';

const TEACHING_STAFF_ATTENDANCES_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/attendance`;

export const getAllTeachingStaffAttendances = async (data) => {
  try {
    const response = await client.attedence.get_all_staff_attedence(data)

    // Check if the response status is successful

    return response;
  } catch (error) {

    console.error('Error in getAllTeachingStaffAttendances:', error);

    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch TeachingStaffAttendances. Status: ${error?.response?.data?.message}`);
  }
};
export const getTeachingStaffAttendanceById = async (data) => {
  try {
    const response = await client.attedence.get_staff_attedence_with_id(data)

    // Check if the response status is successful
    return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllTeachingStaffAttendances:', error);

    throw new Error(`Failed to fetch TeachingStaffAttendances. Status: ${response.status}`);
  }
};

export const searchTeachingStaffAttendances = async (searchQuery) => {
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
    console.error('Error in searchTeachingStaffAttendances:', error);
    throw error;
  }
};

export const getUserListWithRoleName = async (data) => {
  try{
  const userList = await client.user.getWithRoleName(data)
  return {status:true,data:userList,message:userList?.message}
  }catch(error){
    return {status:false,message:error?.response?.data?.message}
  }
}

export const addTeachingStaffAttendance = async (data) => {
  try {
    const response = await client.attedence.mark_staff_attedence(data)

    return { success: true, message: 'TeachingStaffAttendance created successfully' };
  } catch (error) {
    const error_message = getErrorMessage(error)
    throw new Error(error_message)
  }
};

export const deleteTeachingStaffAttendance = async (TeachingStaffAttendanceId) => {
  try {
    const response = await axios.delete(`${TEACHING_STAFF_ATTENDANCES_API_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: TeachingStaffAttendanceId }
    });

    if (response.data.status) {
      return { success: true, message: 'TeachingStaffAttendance deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete TeachingStaffAttendance' };
    }
  } catch (error) {
    console.error('Error in deleteTeachingStaffAttendance:', error);
    throw error;
  }
};

export const updateTeachingStaffAttendance = async (data) => {
  try {
    const response = await axios.put(`${TEACHING_STAFF_ATTENDANCES_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'TeachingStaffAttendance updated successfully' };
    } else {
      return { success: false, message: 'Failed to update TeachingStaffAttendance' };
    }
  } catch (error) {
    console.error('Error in updateTeachingStaffAttendance:', error);
    throw error;
  }
};
