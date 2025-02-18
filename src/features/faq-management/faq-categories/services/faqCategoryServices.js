// groupService.js
import client from 'api/client';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const FAQ_CATEGORY_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/general/faq/category`;

export const getActiveFaqCategories = async (data) => {
  try {
    const response = await axios.get(`${FAQ_CATEGORY_API_END_POINT}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${secureLocalStorage.getItem('token')}`
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
    console.log("API response data: ",data);
    
    const response = await client.faq_category.getAll({},data);
    console.log('All categories data:', response);
    if (response) {
      return response;
    } else {
      throw new Error(`Failed to fetch Faqcategory. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error in get all Faqcategory:', error);

    throw error;
  }
};

export const searchFaqCategories = async (searchQuery) => {
  try {
    const response = await axios.get(`${FAQ_CATEGORY_API_END_POINT}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
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
    console.log("inputData", inputData);

    const { instituteId } = inputData;

    console.log("instituteId :", instituteId);

    const requestData = {
      ...inputData,  
      instituteId,   
    };

    const response = await client.faq_category.create(requestData); 
    console.log('API Response:', response);

    if (response?.status === 200 || response?.status === 201) {
      return { success: true, message: 'Faq Category created successfully' };
    } else {
      return { success: false, message: response?.data?.message || 'Failed to create FaqCategory' };
    }
  } catch (error) {
    console.error('Error in addFaqCategory:', error.response?.data || error);
    throw error;
  }
};

export const deleteFaqCategory = async (data) => {
  try {
    const response = await client.faq_category.delete(data);

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
        Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
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

    const response = await client.faq_category.update(uuid, data);

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