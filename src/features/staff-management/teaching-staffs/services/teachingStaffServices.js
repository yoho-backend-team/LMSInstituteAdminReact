// TeachingStaffservice.js
import client from 'api/client';
import axios from 'axios';
import { useBranchId, useInstitute } from 'utils/get-institute-details';

const TEACHING_STAFF_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/${useInstitute().getInstituteId()}/teaching-staff`;


const TEACHING_STAFF_API_END_POINT_get = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes`;

export const getAllTeachingStaffs = async (data) => {
  try {
    const response = await axios.get(`${TEACHING_STAFF_API_END_POINT_get}/${data?.instituteId}/branches/${data?.branchid}/teaching-staff`, {
      headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    },
  params: {
        page: data.page,
        is_active: data.is_active,
        course_id: data.course_id
      }, 
  });

  if (response.data.status) {
    return response;
} else {
throw new Error(`Failed to fetch TeachingStaffs. Status: ${response.status}`);
}
} catch (error) {

console.error('Error in getAllTeachingStaffs:', error);
throw error;
}
};

export const getAllActiveTeachingStaffs = async (data) => {
  try {
    const response = await client?.TeachingStaff.get(data)

    // Check if the response status is successful
   
      return response;
    
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllTeachingStaffs:', error);

    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch TeachingStaffs. Status: ${error.response.data.message}`);

  }
};

export const searchTeachingStaffs = async (searchQuery) => {
  try {
    const response = await axios.get(`${TEACHING_STAFF_API_END_POINT}/search`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: { search: searchQuery }
    });

    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Failed to fetch search results' };
    }
  } catch (error) {
    console.error('Error in searchTeachingStaffs:', error);
    throw error;
  }
};

export const addTeachingStaff = async (data) => {
  try {
    const response = await axios.post(`${TEACHING_STAFF_API_END_POINT}/register`, data, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'TeachingStaff created successfully' };
    } else {
      return { success: false, message: 'Failed to create TeachingStaff' };
    }
  } catch (error) {
    console.error('Error in addTeachingStaff:', error);
    throw error;
  }
};



export const deleteTeachingStaff = async (data) => {
  try {
    const response = await axios.delete(`${TEACHING_STAFF_API_END_POINT_get}/${data?.instituteId}/branches/${data?.branchid}/teaching-staff/${data?.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: 'NonTeachingStaff deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete NonTeachingStaff' };
    }
  } catch (error) {
    console.error('Error in deleteNonTeachingStaff:', error);
    throw error;  
  }
};

export const updateTeachingStaff = async (data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/${useInstitute().getInstituteId()}/teaching-staff/update/${data.id}`,
      data,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      }
    );


    if (response.data.status) {
      return { success: true, message: response.data.message, response: response.data };
    } else {
      return { success: false, message: response.data.message || 'Failed to update teaching staff' };
    }
  } catch (error) {
    console.error('Error in updateTeachingStaff:', error);
    throw error;
  }
};
// export const TeachingStaffById = async (data) => {
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/${useInstitute().getInstituteId()}/branches/${useBranchId()}/staff/`, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Token ${localStorage.getItem('token')}`
//       },
//       params: data
//     });
//     if (response.data) {
//       return { success: true, data: response.data};
//     } else {
//       throw new Error(`Failed to fetch teaching staffs. Status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error('Error in teaching staffs:', error);

//     // Throw the error again to propagate it to the calling function/component
//     throw error;
//   }
// };

export const TeachingStaffById = async (data) => {
  try {
    const response = await client.users.getstaffWithId(data)
 // Check if the response status is successful
 if (response.status) {
   return { success: true, data: response.data };
 } else {
   // If the response status is not successful, throw an error
   throw new Error(`Failed to fetch a Nonstaff. Status: ${response.status}`);
 }
} catch (error) {
 // Log the error for debugging purposes
 console.error('Error in fetching  Nonstaff:', error);

 // Throw the error again to propagate it to the calling function/component
 throw error;
}
};

export const staffChangePassword = async (data) => {
  try {
    const response = await axios.put(`${TEACHING_STAFF_API_END_POINT}/change-password`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });

    if (response.data.status) {
      return { success: true, message: 'User status updated successfully' };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error in addUser:', error);
    throw error;
  }
};



export const staffStatusChange = async (uuid,data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/${useInstitute().getInstituteId()}/branches/${useBranchId()}/non-teaching-staff/updatestatus/${uuid}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      }
    ); 

    if (response.data.status) {
      return { success: true, message: response.data.message };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error in staff status change:', error);
    throw error;
  }
};


export const staffById = async (data) => {
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




