// groupService.js
import axios from 'axios';

const HELP_CENTER_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/helpcenter`;

export const getActiveHelpCenter = async (data) => {
  try {
    const response = await axios.get(`${HELP_CENTER_API_END_POINT}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });

    return response;
  } catch (error) {
    console.error('Error in Help Center:', error);

    // Throw the error again to propagate it to the calling function/component
    throw new Error(`${error?.response.data?.message}`);
  }
};




export const searchHelpCenter = async (searchQuery) => {
  try {
    const response = await axios.get(`${HELP_CENTER_API_END_POINT}`, {
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
    console.error('Error in Help Center:', error);
    throw error;
  }
};
export const addHelpCenter = async (data) => {
  try {
    const response = await axios.post(`${HELP_CENTER_API_END_POINT}`, data, {
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
    console.error('Error in Help Center:', error);
    throw error;
  }
};


export const deleteHelpCenter = async (data) => {
 
  try {
    const response = await axios.delete(`${HELP_CENTER_API_END_POINT}/delete/${data.id}`,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params: data
    });

    if (response.status) {
      return { success: true, message: 'Help Center deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete Help Center' };
    }
  } catch (error) {
    console.error('Error in deleteFaqCategory:', error);
    throw error;
  }
};
export const updateStatusHelpCenter = async (data) => {
  try {
    const response = await axios.post(`${HELP_CENTER_API_END_POINT}/status`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: data
    });

    if (response.data.status) {
      return { success: true, message: 'Help Center status updated successfully' };
    } else {
      return { success: false, message: 'Failed to update status Help Center' };
    }
  } catch (error) {
    console.error('Error in update Help Center:', error);
    throw error;
  }
};

export const updateHelpcenter = async (data) => {   
  try {
    const { uuid } = data;

    const response = await axios.put(`${HELP_CENTER_API_END_POINT}/update/${uuid}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      } 
    });
    

    if (response.data.status) {
      return { success: true, message: 'FaqCategory updated successfully' };
    } else {
      return { success: false, message: 'Failed to update Help Center' };
    }
  } catch (error) {
    console.error('Error in updateHelpCenter:', error);
    throw error;
  }
};

export const getAllHelpCenterDetails = async (data) => {
  try {
    const response = await axios.get(`${HELP_CENTER_API_END_POINT}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      params:  data,
    });

   
  
    return response;
  } catch (error) {
    
    console.error('Error in get all Help Center:', error);

    
    throw new Error(`Failed to fetch all Help Center. Status: ${error?.response.data.status}`);
  }
};
