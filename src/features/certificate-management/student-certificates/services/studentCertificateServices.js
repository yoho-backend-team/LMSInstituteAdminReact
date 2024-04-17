// studentCertificateService.js
import axios from 'axios';

const STUDENT_CERTIFICATE_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/certificate-management/student-certificates`;

export const getAllStudentCertificates = async (data) => {
  try {
    const response = await axios.get(`${STUDENT_CERTIFICATE_API_ENDPOINT}/read-by-branch-id?page=${data?.page}`, {
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
      throw new Error(`Failed to fetch StudentCertificates. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudentCertificates:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchStudentCertificates = async (searchQuery) => {
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
    console.error('Error in searchStudentCertificates:', error);
    throw error;
  }
};

export const addStudentCertificate = async (data) => {
  try {
    const response = await axios.post(`${STUDENT_CERTIFICATE_API_ENDPOINT}/create`, data, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log(response);

    if (response.data.status) {
      return { success: true, message: 'StudentCertificate created successfully' };
    } else {
      return { success: false, message: 'Failed to create StudentCertificate' };
    }
  } catch (error) {
    console.error('Error in addStudentCertificate:', error);
    throw error;
  }
};

export const deleteStudentCertificate = async (data) => {
  try {
    const response = await axios.delete(`${STUDENT_CERTIFICATE_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: data }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentCertificate deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete StudentCertificate' };
    }
  } catch (error) {
    console.error('Error in deleteStudentCertificate:', error);
    throw error;
  }
};

export const updateStudentCertificate = async (data) => {
  try {
    const response = await axios.post(`${STUDENT_CERTIFICATE_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'StudentCertificate updated successfully' };
    } else {
      return { success: false, message: 'Failed to update StudentCertificate' };
    }
  } catch (error) {
    console.error('Error in updateStudentCertificate:', error);
    throw error;
  }
};

export const updateStudentCertificateStatus = async (data) => {
  try {
    const response = await axios.post(`${STUDENT_CERTIFICATE_API_ENDPOINT}/status-update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'StudentCertificate status updated successfully' };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error in addStudentCertificate:', error);
    throw error;
  }
};
