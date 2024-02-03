// groupService.js
import axios from 'axios';

const COURSE_CATEGORY_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/CourseCategory-management/CourseCategory`;

export const getAllCourses = async () => {
  try {
    const response = await axios.get('/data_storage/user-management/groups/AllGroups.json', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    // Check if the response status is successful
    if (response.status === 200) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Courses. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllCourses:', error);

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
    const response = await axios.post(`${COURSE_CATEGORY_END_POINT}/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

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
    const response = await axios.put(`${COURSE_CATEGORY_END_POINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'Course updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Course' };
    }
  } catch (error) {
    console.error('Error in updateCourse:', error);
    throw error;
  }
};
