// courseCategories.js
import axios from 'axios';
import { HTTP_END_POINTS } from 'api/urls';

const getInstituteDetails = () => {
  if(typeof localStorage !== "undefined"){
    const institute = localStorage.getItem("institute")
    return institute
  }else{
    return undefined
  }
  
}
const institute = getInstituteDetails()
console.log(institute)
const COURSE_CATEGORY_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/course-management/course-categories`;

export const getAllCourseCategoriesByInstitute = async (data) => {
  try {
    const response = await axios.get(HTTP_END_POINTS.category.getAll+`?${data?.page}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
    });

    console.log(response);

    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch course categories. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in get all ccourse categories:', error);

    // Throw the error again to propagate it to the calling function/component
    // throw error;
  }
};
export const addCourseCategory = async (data) => {
  try {
    const response = await axios.post(HTTP_END_POINTS.category.create, data, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
    console.log(response);

    if (response.data.status) {
      return { success: true, message: 'CourseCategory created successfully' };
    } else {
      return { success: false, message: 'Failed to create CourseCategory' };
    }
  } catch (error) {
    console.error('Error in addCourseCategory:', error);
    throw error;
  }
};
export const deleteCourseCategory = async (data) => {
  try {
    const response = await axios.delete(`${HTTP_END_POINTS.category.create}/${data.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
    });

    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'CourseCategory deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete CourseCategory' };
    }
  } catch (error) {
    console.error('Error in deleteCourseCategory:', error);
    throw error;
  }
};
export const updateCourseCategory = async (data) => {
  try {
    const response = await axios.put(`${HTTP_END_POINTS.category.create}/${data.id}`, data, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
    console.log(response);
    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'CourseCategory updated successfully' };
    } else {
      return { success: false, message: 'Failed to update CourseCategory' };
    }
  } catch (error) {
    console.error('Error in updateCourseCategory:', error);
    throw error;
  }
};
export const updateCourseCategoryStatus = async (data) => {
  try {
    const response = await axios.put(`${HTTP_END_POINTS.category.create}/${data.id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'CourseCategory updated successfully' };
    } else {
      return { success: false, message: 'Failed to update CourseCategory' };
    }
  } catch (error) {
    console.error('Error in updateCourseCategory:', error);
    throw error;
  }
};
export const getAllCourseCategories = async (data) => {
  try {
    const response = await axios.get(HTTP_END_POINTS.category.getAll, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });

    console.log(response);

    // Check if the response status is successful
    if (response.data.status) {
      return { data: response.data.data };
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch CourseCategories. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllCourseCategories:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};
