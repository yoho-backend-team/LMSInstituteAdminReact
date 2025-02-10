// courseModuleService.js
import client from 'api/client';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const COURSE_MODULE_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/content-management/course-modules`;

export const getAllCourseModules = async (data) => {
  try {
    const response = await client.course_module.getAll(data)

    return response;
    
  } catch (error) {
    console.error('Error in getAllCourseModules:', error);
    throw new Error(`Failed to fetch CourseModules. Status: ${error.response.status}`);
  }
};

export const searchCourseModules = async (searchQuery) => {
  try {
    const response = await axios.get('/data_storage/user-management/groups/AllGroups.json', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
      },
      params: { search: searchQuery }
    });

    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Failed to fetch search results' };
    }
  } catch (error) {
    console.error('Error in searchCourseModules:', error);
    throw error;
  }
};

export const addCourseModule = async (data) => {
  try {
    const response = await client.course_module.create(data)

    return { success: true, message: 'CourseModule created successfully' };
  } catch (error) {
    console.error('Error in addCourseModule:', error);
    return { success: false, message: 'Failed to create CourseModule' };
  }
};

export const deleteCourseModule = async (data) => {
  try {
    
    const response = await client.course_module.delete(data)

    return { success: true, message: 'CourseModule deleted successfully' };
   
  } catch (error) {
    console.error('Error in deleteCourseModule:', error);
    return { success: false, message: 'Failed to delete CourseModule' };
  }
};

export const updateCourseModule = async (data) => {
  try {
    const response = await client.course_module.update(data)
    return { success: true, message: 'CourseModule updated successfully' };
  } catch (error) {
    console.error('Error in updateCourseModule:', error);
    return { success: false, message: 'Failed to update CourseModule' };
  }
};

export const updateCourseModulesStatus = async (data) => {
  try {
    const response = await client.course_module.update_status(data)
      return { success: true, message: 'CourseModules status updated successfully' };
  } catch (error) {
    console.error('Error in updateCourseModules:', error);
    const errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message
    throw new Error(errorMessage)
  }
};