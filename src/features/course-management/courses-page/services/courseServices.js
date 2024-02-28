// groupService.js
import axios from 'axios';

const COURSE_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/course-management/institute-courses`;

export const getAllCourses = async (selectedBranchId) => {
  try {
    const response = await axios.get(`${COURSE_END_POINT}/read`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { branch_id: selectedBranchId }
    });
    console.log(response);
    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Courses. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllCourseCategories:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};
export const getAllActiveCourseCategories = async (selectedBranchId) => {
  try {
    const response = await axios.get(`${COURSE_END_POINT}/active-categories`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { branch_id: selectedBranchId }
    });
    console.log(response);
    // Check if the response status is successful
    if (response.data.status) {
      return { success: true, data: response.data.data };
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Courses. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllCourseCategories:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};
export const getAllActiveCourses = async (selectedBranchId) => {
  try {
    const response = await axios.get(`${COURSE_END_POINT}/get-by-branch-id`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { branch_id: selectedBranchId }
    });
    console.log(response);
    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch ActiveCourses. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllActu=iveCourse:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};

export const searchCourses = async (searchQuery) => {
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
    console.error('Error in searchCourses:', error);
    throw error;
  }
};

export const addCourse = async (data) => {
  try {
    const response = await axios.post(`${COURSE_END_POINT}/create`, data, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response);

    if (response.data.status) {
      return { success: true, message: 'Course created successfully' };
    } else {
      return { success: false, message: 'Failed to create Course' };
    }
  } catch (error) {
    console.error('Error in addCourse:', error);
    throw error;
  }
};

export const getStudentByCourse = async (courseId) => {
  try {
    const response = await axios.get(`${COURSE_END_POINT}/get-by-course-id`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { course_id: courseId }
    });

    console.log(response);

    if (response.data.status) {
      return response;
    } else {
      return { success: false, message: 'Failed to Fetch Active student' };
    }
  } catch (error) {
    console.error('Error in Fetch Active student:', error);
    throw error;
  }
};
export const deleteCourse = async (courseId) => {
  try {
    const response = await axios.delete(`${COURSE_CATEGORY_END_POINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: courseId }
    });

    if (response.data.status) {
      return { success: true, message: 'Course deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete Course' };
    }
  } catch (error) {
    console.error('Error in deleteCourse:', error);
    throw error;
  }
};

export const updateCourse = async (data) => {
  try {
    const response = await axios.post(`${COURSE_CATEGORY_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'Course updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Course' };
    }
  } catch (error) {
    console.error('Error in updateCourse:', error);
    throw error;
  }
};
