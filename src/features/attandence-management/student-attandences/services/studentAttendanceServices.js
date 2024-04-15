// groupService.js
import axios from 'axios';

const STUDENT_ATTENDANCES_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/attendance-management/student`;

// export const getAllStudentAttendances = async (selectedBranchId) => {
//   try {
//     const response = await axios.get(`${STUDENT_ATTENDANCES_API_END_POINT}/get-by-branch-id`, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       },
//       params: { branch_id: selectedBranchId }
//     });

//     console.log(response);

//     // Check if the response status is successful
//     if (response.data.status) {
//       return response;
//     } else {
//       // If the response status is not successful, throw an error
//       throw new Error(`Failed to fetch StudentAttendances. Status: ${response.status}`);
//     }
//   } catch (error) {
//     // Log the error for debugging purposes
//     console.error('Error in getAllStudentAttendances:', error);

//     // Throw the error again to propagate it to the calling function/component
//     throw error;
//   }
// };


export const getAllStudentAttendances = async (data) => {
  try {
    const response = await axios.get(`${STUDENT_ATTENDANCES_API_END_POINT}/get-by-branch-id`, {
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
      throw new Error(`Failed to fetch StudentAttendances. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllStudentAttendances:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
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
    const response = await axios.get(`${STUDENT_ATTENDANCES_API_END_POINT}/get-class-by-id`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });
    console.log(response);
    // Check if the response status is successful
    if (response.data.status) {
      return{
        success:true ,data:response?.data
      } 
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch batch. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getOfflineClassDetails:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
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