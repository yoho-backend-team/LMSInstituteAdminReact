// groupService.js
import client from 'api/client';
import axios from 'axios';

const COURSE_STUDY_MATERIALS_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/content-management/course-study-materials`;

export const getAllStudyMaterials = async (data) => {
  try {
    const response = await client.study_material.getAll(data)
  
    return response;
   
  } catch (error) {
    throw new Error(`Failed to fetch Courses Study Materials. Status: ${error}`);
    // Log the error for debugging purposes
   
  }
};

export const searchCourseStudyMaterials = async (searchQuery) => {
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
    console.error('Error in searchCourseStudyMaterials:', error);
    throw error;
  }
};

export const addCourseStudyMaterial = async (data) => {
  try {
    const response = await client.study_material.create(data)
   
    return { success: true, message: 'CourseStudyMaterial created successfully' };
   
  } catch (error) {
    console.error('Error in addCourseStudyMaterial:', error);
    return { success: false, message: 'Failed to create CourseStudyMaterial' };
   
  }
};

export const deleteCourseStudyMaterial = async (data) => {
  try {
    const response = await client.study_material.delete(data)

    return { success: true, message: 'CourseStudyMaterial deleted successfully' };
  } catch (error) {
    console.error('Error in deleteCourseStudyMaterial:', error);
    return { success: false, message: 'Failed to delete CourseStudyMaterial' }; 
  }
};

export const updateCourseStudyMaterial = async (data) => {
  try {
    const response = await client.study_material.update(data)
   
    return { success: true, message: 'CourseStudyMaterial updated successfully' }; 
  } catch (error) {
    console.error('Error in updateCourseStudyMaterial:', error);
    return { success: false, message: 'Failed to update CourseStudyMaterial' };
  }
};

export const updateCourseStudyMaterialStatus = async (data) => {
  try {
    const response = await client.study_material.update_status(data)   
    return { success: true, message: 'CourseStudyMaterial status updated successfully' };
  } catch (error) {
    console.error('Error in updateCourseStudyMaterial:', error);
    return { success: false, message: 'Failed to update CourseStudyMaterial status' };
  }
};
