// groupService.js
import client from 'api/client';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const STUDENT_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/auth/student`;

export const getAllStudentsByBatch = async (data) => {
  try {
    const response = await client.users.getStudentsWithBatch(data)
  
      return { success: true, data: response?.data };
      
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudents:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const getAllStudents = async (data) => {
  try {
    // const response = await axios.get(`${STUDENT_API_END_POINT}/read-by-branch-id?page=${data?.page}`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
    //   },
    //   params: data
    // });
   const response = await client.users.studentsAll(data)
    // Check if the response status is successful
    if (response.status) {
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

export const addStudent = async (data) => {
  try {
    const response = await client.users.studentRegister(data)  
    return { success: true, message: 'Student created successfully' };
  } catch (error) {
    console.error('Error in addStudent:', error);
    return { success: false, message: error?.response?.data?.message };  
  }
};

export const deleteStudent = async (data) => {
  try {
    const response = await client.student.delete(data)

    return { success: true, message: 'Student deleted successfully' };
  } catch (error) {
    console.error('Error in deleteStudent:', error);
    return { success: false, message:error?.response?.data?.message };
  }
};

export const updateStudent = async (data) => {
  try {
    const response = await client.student.update(data)

    return { success: true, message: 'Student updated successfully' };
  } catch (error) {
    console.error('Error in updateStudent:', error);
    return { success: false, message: error?.response?.data?.message };
  }
};

export const studentById = async (data) => {
  try {
       const response = await client.users.getStudentWithId(data)
    // Check if the response status is successful
    if (response.status) {
      return { success: true, data: response.data };
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