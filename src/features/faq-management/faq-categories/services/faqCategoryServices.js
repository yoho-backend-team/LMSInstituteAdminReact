// groupService.js
import client from 'api/client';
import axios from 'axios';

const FAQ_CATEGORY_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/general/faq/category`;

export const getActiveFaqCategories = async (data) => {
  try {
    const response = await axios.get(`${FAQ_CATEGORY_API_END_POINT}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });

    return response;
  } catch (error) {
    console.error('Error in getAllFaqCategories:', error);

    // Throw the error again to propagate it to the calling function/component
    throw new Error(`${error?.response.data?.message}`);
  }
};


export const getAllFaqCategories = async (data) => {
  try {
    const response = await axios.get(`${FAQ_CATEGORY_API_END_POINT}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data 

    });
    console.log("All categories data",response)


    // Check if the response status is successful
  
    return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in get all Faq categories:', error);

    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch Faq categories. Status: ${error?.response.data.status}`);
  }
};

export const searchFaqCategories = async (searchQuery) => {
  try {
    const response = await axios.get(`${FAQ_CATEGORY_API_END_POINT}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { keyword: searchQuery } 
    });
    
    if (response.data) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Failed to fetch search results' };
    }
  } catch (error) {
    console.error('Error in searchFaqCategories:', error);
    throw error;
  }
};
export const addFaqCategory = async (inputData) => {
  try {
    const response = await client.category.create(inputData);
    console.log("add data:", response);

    if (response?.status) {
      return { success: true, message: 'Faq Category created successfully' }; 
    } else {
      return { success: false, message: 'Failed to create FaqCategory' }; 
    }
  } catch (error) {
    console.error('Error in addFaqCategory:', error);
    throw error;
  }
};


export const deleteFaqCategory = async (data) => {
  try {
    const response = await axios.delete(`${FAQ_CATEGORY_API_END_POINT}/delete/${data.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });

    if (response.status) {
      return { success: true, message: 'FaqCategory deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete FaqCategory' };
    }
  } catch (error) {
    console.error('Error in deleteFaqCategory:', error);
    throw error;
  }
};
export const updateStatusFaqCategory = async (data) => {
  try {
    const response = await axios.post(`${FAQ_CATEGORY_API_END_POINT}/status`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });

    if (response.data.status) {
      return { success: true, message: 'FaqCategory status updated successfully' };
    } else {
      return { success: false, message: 'Failed to update status FaqCategory' };
    }
  } catch (error) {
    console.error('Error in update statusFaqCategory:', error);
    throw error;
  }
};

export const updateFaqCategory = async (data) => {   
  try {
    const { uuid } = data;

    const response = await axios.put(`${FAQ_CATEGORY_API_END_POINT}/update/${uuid}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      } 
    });
    

    if (response.data.status) {
      return { success: true, message: 'FaqCategory updated successfully' };
    } else {
      return { success: false, message: 'Failed to update FaqCategory' };
    }
  } catch (error) {
    console.error('Error in updateFaqCategory:', error);
    throw error;
  }
};
