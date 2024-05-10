// courseCategories.js
import axios from 'axios';
import { HTTP_END_POINTS } from 'api/urls';
import client from 'api/client';


export const getAllCourseCategoriesByInstitute = async (data) => {
  try {
    const response = await client.category.get(data)
    console.log(response,"response")
    return response;
  } catch (error) {
    console.error('Error in get all ccourse categories:', error);
    throw new Error(`Failed to fetch course categories. Status: ${error.response.status}`);
  }
};
export const addCourseCategory = async (data) => {
  try {
    const response = await client.category.create(data)
    console.log(response);

    return { success: true, message: 'CourseCategory created successfully' }; 
  } catch (error) {
    console.error('Error in addCourseCategory:', error);
    return { success: false, message: 'Failed to create CourseCategory' };  }
};
export const deleteCourseCategory = async (data) => {
  try {
    const response = await client.category.delete(data)

    return { success: true, message: 'CourseCategory deleted successfully' };
  } catch (error) {
    console.error('Error in deleteCourseCategory:', error);
    return { success: false, message: 'Failed to delete CourseCategory' };
  }
};
export const updateCourseCategory = async (data) => {
  try {
    const response = await  client.category.update(data)
    return { success: true, message: 'CourseCategory updated successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to update CourseCategory' };
  }
};


export const updateCourseCategoryStatus = async (data) => {
  try {
    const response = await client.category.update(data)


    return { success: true, message: 'CourseCategory updated successfully' };
  } catch (error) {
    console.error('Error in updateCourseCategory:', error);
    return { success: false, message: 'Failed to update CourseCategory' };
  }
};

export const getAllCourseCategories = async (data) => {
  try {
    const response = await client.category.get(data)
    return { data: response.data };  
  } catch (error) {
    console.error('Error in getAllCourseCategories:', error);
    throw error;
  }
};
