// groupService.js
import axios from 'axios';

const STUDENT_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/student-management/students`;

export const getAllStudentsByBatch = async (data) => {
  try {
    const response = await axios.get(`${STUDENT_API_END_POINT}/get-by-batch-id`, {
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
      throw new Error(`Failed to fetch Students. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudents:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};
export const getAllStudents = async (data) => {
  try {
    const response = await axios.get(`${STUDENT_API_END_POINT}/read-by-branch-id?page=${data?.page}`, {
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
      throw new Error(`Failed to fetch Students. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudents:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchStudents = async (searchQuery) => {
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
    console.error('Error in searchStudents:', error);
    throw error;
  }
};

export const addStudent = async (data) => {
  try {
    const response = await axios.post(`${STUDENT_API_END_POINT}/create`, data, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log(response);

    if (response.data.status) {
      return { success: true, message: 'Student created successfully' };
    } else {
      return { success: false, message: 'Failed to create Student' };
    }
  } catch (error) {
    console.error('Error in addStudent:', error);
    throw error;
  }
};

export const deleteStudent = async (data) => {
  try {
    const response = await axios.delete(`${STUDENT_API_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });

    if (response.data.status) {
      return { success: true, message: 'Student deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete Student' };
    }
  } catch (error) {
    console.error('Error in deleteStudent:', error);
    throw error;
  }
};

export const updateStudent = async (data) => {
  try {
    const response = await axios.post(`${STUDENT_API_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });

    console.log('studentupdate', response);

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'Student updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Student' };
    }
  } catch (error) {
    console.error('Error in updateStudent:', error);
    throw error;
  }
};

export const studentById = async (data) => {
  try {
    const response = await axios.get(`${STUDENT_API_END_POINT}/read-by-id`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);
    // Check if the response status is successful
    if (response.data.status) {
      return { success: true, data: response.data.data };
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch a student. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in fetching  student:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};
