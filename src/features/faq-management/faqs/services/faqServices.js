// groupService.js
import axios from 'axios';

const FAQ_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/general/FAQ`;

const FaqS_CATEGORY_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/Faq-management/institute-Faqs/active-s`;

export const getActivesByBranch = async (data) => {
  try {
    const response = await axios.get(`${FaqS_CATEGORY_API_END_POINT}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });

    console.log(response);

    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Faqs. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllFaqs:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};


export const getAllFaqs = async (data) => {
  try {
    const response = await axios.get(`${FAQ_API_END_POINT}/all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });

    console.log(response);

    // Check if the response status is successful
    if (response.data.status) {
      return response;
    } else {
      // If the response status is not successful, throw an error
      throw new Error(`Failed to fetch Faqs. Status: ${response.status}`);
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in get all Faqs:', error);

    // Throw the error again to propagate it to the calling function/component
    throw error;
  }
};


export const searchFaqs = async (searchQuery) => {
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
    console.error('Error in searchFaqs:', error);
    throw error;
  }
};

export const addFaq = async (data) => {
  try {
    const response = await axios.post(`${FAQ_API_END_POINT}/`, data, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
    console.log(response);

    if (response.data.success) {
      return { success: true, message: 'Faq created successfully' };
    } else {
      return { success: false, message: 'Failed to create Faq' };
    }
  } catch (error) {
    console.error('Error in addFaq:', error);
    throw error;
  }
};

export const deleteFaq = async (data) => {
  try {
    const response = await axios.delete(`${FAQ_API_END_POINT}/delete/${data.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });

    console.log(response);

    if (response.data.status) {
      return { success: true, message: 'Faq deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete Faq' };
    }
  } catch (error) {
    console.error('Error in deleteFaq:', error);
    throw error;
  }
};

export const updateFaq = async (data) => {
  try {
    const {uuid} = data
    const response = await axios.put(`${FAQ_API_END_POINT}/update/${uuid}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
    console.log(response);

    if (response.data.status) {
      console.log(response);
      return { success: true, message: 'Faq updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Faq' };
    }
  } catch (error) {
    console.error('Error in updateFaq:', error);
    throw error;
  }
};

export const updateStatusFaq = async (data) => {
  try {
    const {id} = data
    const response = await axios.post(`${FAQ_API_END_POINT}/updatestatus/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
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
