// NotesService.js
import client from 'api/client';
import axios from 'axios';

const COURSE_NOTE_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/content-management/course-notes`;

export const getAllCourseNotes = async (data) => {
  try {
    const response = await client.notes.get(data)
    console.log(response);
   
    return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllCourseNotes:', error);
    throw new Error(`Failed to fetch CourseNotes. Status: ${error}`);
   
   
  }
};

export const searchCourseNotes = async (searchQuery) => {
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
    console.error('Error in searchCourseNotes:', error);
    throw error;
  }
};

export const addCourseNote = async (data) => {
  try {
    const response = await client.notes.create(data)
   
    return { success: true, message: 'CourseNote created successfully' };
   
  } catch (error) {
    console.error('Error in addCourseNote:', error);
    return { success: false, message: 'Failed to create CourseNote' };
  }
};

export const deleteCourseNote = async (data) => {
  try {
    const response = await client.notes.delete(data)

    return { success: true, message: 'CourseNote deleted successfully' };
  } catch (error) {
    console.error('Error in deleteCourseNote:', error);
    return { success: false, message: 'Failed to delete CourseNote' };
  }
};

export const updateCourseNote = async (data) => {
  try {
    const response = await client.notes.update(data)
    console.log('updatenotes:', response);
   
    return { success: true, message: 'CourseNote updated successfully' };
  } catch (error) {
  
    return { success: false, message: 'Failed to update CourseNote' };
  }
};

export const updateCourseNotesStatus = async (data) => {
  try {
    const response = await client.notes.update_status(data)
    console.log('Notesresponse:', response);
   
    console.log(response);
    return { success: true, message: 'CourseNotes status updated successfully' };
  
  } catch (error) {
    console.error('Error in updateCourseNotes:', error);
    return { success: false, message: 'Failed to update CourseNotes status' };
  }
};
