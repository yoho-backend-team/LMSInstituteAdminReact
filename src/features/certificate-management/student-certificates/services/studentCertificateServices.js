// studentCertificateService.js
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const STUDENT_CERTIFICATE_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/certificate`;

export const getAllStudentCertificates = async (data) => {
  try {
    const response = await axios.get(`${STUDENT_CERTIFICATE_API_ENDPOINT}/${data?.InstituteId}/${data?.branchid}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      },
      params: data
    });

    return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudentCertificates:', error);

    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch StudentCertificates. Status: ${error.response?.status}`);
  }
};

export const searchStudentCertificates = async (searchQuery) => {
  try {
    const response = await axios.get('/data_storage/user-management/groups/AllGroups.json', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
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
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      }
    });

    return { success: true, message: 'StudentCertificate created successfully' };
  } catch (error) {
    console.error('Error in addStudentCertificate:', error);
    throw error;
  }
};

export const deleteStudentCertificate = async (certificateid) => {
  try {
    const response = await axios.delete(`${STUDENT_CERTIFICATE_API_ENDPOINT}/delete/${certificateid}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      }
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

export const updateStudentCertificate = async (certificateid, data) => {
  try {
    const response = await axios.put(`${STUDENT_CERTIFICATE_API_ENDPOINT}/update/${certificateid}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'StudentCertificate updated successfully' };
    } else {
      return { success: false, message: 'Failed to update StudentCertificate' };
    }
  } catch (error) {
    console.error('Error in updateStudentCertificate:', error);
    throw error;
  }
};

export const updateStudentCertificateStatus = async (certificateid, data) => {
  try {
    const response = await axios.put(
      `${STUDENT_CERTIFICATE_API_ENDPOINT}/updatestatus/${certificateid}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${secureLocalStorage.getItem('token')}`
        }
      }
    );

    if (response.data.status) {
      return { success: true, message: 'StudentCertificate status updated successfully' };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error in updateStudentCertificateStatus:', error);
    throw error;
  }
};