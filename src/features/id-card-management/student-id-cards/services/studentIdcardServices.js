// studentIdCardService.js
import client from 'api/client';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const STUDENT_ID_CARDS_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/studentidcard`;

export const getAllStudentIdCards = async (data) => {
  try {
    const response = await client.id_cards.student.get_all(data)
    return response;
  } catch (error) {
    throw error;
  }
};

export const searchStudentIdCards = async (searchQuery) => {
  try {
    const response = await axios.get('/data_storage/user-management/groups/AllGroups.json', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
      },
      params: { search: searchQuery }
    });

    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Failed to fetch search results' };
    }
  } catch (error) {
    console.error('Error in searchStudentIdCards:', error);
    throw error;
  }
};

export const addStudentIdCard = async (data) => {
  try {
    const response = await axios.post(`${STUDENT_ID_CARDS_API_ENDPOINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentIdCard created successfully' };
    } else {
      return { success: false, message: 'Failed to create StudentIdCard' };
    }
  } catch (error) {
    console.error('Error in addStudentIdCard:', error);
    throw error;
  }
};

export const deleteStudentIdCard = async (StudentIdCardId) => {
  try {
    const response = await axios.delete(`${STUDENT_ID_CARDS_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
      },
      params: { id: StudentIdCardId }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentIdCard deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete StudentIdCard' };
    }
  } catch (error) {
    console.error('Error in deleteStudentIdCard:', error);
    throw error;
  }
};

export const updateStudentIdCard = async (data) => {
  try {
    const response = await axios.put(`${STUDENT_ID_CARDS_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentIdCard updated successfully' };
    } else {
      return { success: false, message: 'Failed to update StudentIdCard' };
    }
  } catch (error) {
    console.error('Error in updateStudentIdCard:', error);
    throw error;
  }
};

export const updateStudentIdCardStatus = async (uuid, data) => {
  try {
    const response = await axios.put(`${STUDENT_ID_CARDS_API_ENDPOINT}/${uuid}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'Student updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Student' };
    }
  } catch (error) {
    console.error('Error in updateStudent:', error);
    throw error;
  }
};