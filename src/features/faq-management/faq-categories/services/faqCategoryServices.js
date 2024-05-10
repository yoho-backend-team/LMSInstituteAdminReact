// groupService.js
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

    
    if (response.data.status) {     

      return response;
   
    } else {
      throw new Error(`Failed to fetch FaqCategories. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error in getAllFaqCategories:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};


export const getAllFaqCategories = async (data) => {
  try {
    const response = await axios.get(`${FAQ_CATEGORY_API_END_POINT}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data 
    });
    console.log(data);
    console.log(response);

    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Faq categories. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in get all Faq categories:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
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
export const addFaqCategory = async (data) => {
  try {
    const response = await axios.post(`${FAQ_CATEGORY_API_END_POINT}`, data, {
      headers: {
        Accept: 'application/json',
        Authorization: `token ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status) {
      return { success: true, message: response.data.message }; 
    } else {
      return { success: false, message: response.data.message }; 
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
    console.log(data)
    const response = await axios.put(`${FAQ_CATEGORY_API_END_POINT}/update/${uuid}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      } 
    });
    

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'FaqCategory updated successfully' };
    } else {
      return { success: false, message: 'Failed to update FaqCategory' };
    }
  } catch (error) {
    console.error('Error in updateFaqCategory:', error);
    throw error;
  }
};
