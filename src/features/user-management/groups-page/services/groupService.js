// groupService.js
import client from 'api/client';
import axios from 'axios';

const GROUP_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/user-management/group`;
const PERMISSION_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/user-management/permission`;

export const addGroup = async (data) => {
  try {
    const response = await client.group.create(data)
    
    return { success: true, message: 'Group created successfully' };
  } catch (error) {
    console.error('Error in addGroup:', error);
    return { success: false, message: error?.response?.data?.message };
  }
};

export const getAllGroupsByInstitute = async (data) => {
  try {
    const response = await client.group.getAll(data)
    console.log(response);
    // Check if the response status is successful
    return response;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllGroups:', error);
    // Throw the error again to propagate it to the calling function/component
    throw new Error(`Failed to fetch groups. Status: ${error?.response?.status?.message}`);
  }
};

export const deleteGroup = async (groupId) => {
  try {
    const response = await axios.delete(`${GROUP_API_ENDPOINT}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { id: groupId }
    });

    console.log(response);

    if (response.data.status) {
      return { success: true, message: 'Group deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete group' };
    }
  } catch (error) {
    console.error('Error in deleteGroup:', error);
    throw error;
  }
};

export const updateStatus = async (data) => {
  try {
    const response = await axios.put(`${GROUP_API_ENDPOINT}/change-status`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'Group status updated successfully' };
    } else {
      return { success: false, message: 'Failed to update group' };
    }
  } catch (error) {
    console.error('Error in updateGroup:', error);
    throw error;
  }
};

export const updateGroup = async (data) => {
  try {
    const response = await axios.put(`${GROUP_API_ENDPOINT}/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log(response);
    if (response.data.status) {
      return { success: true, message: 'Group updated successfully' };
    } else {
      return { success: false, message: response?.data?.message };
    }
  } catch (error) {
    console.error('Error in updateGroup:', error);
    throw error;
  }
};

export const getAllGroups = async (data) => {
  try {
    const response = await client.group.getAll(data)
    console.log(response);

    // Check if the response status is successful
    return { success: true, data: response.data };
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in getAllGroups:', error);

    // Throw the error again to propagate it to the calling function/component
    return { success: false, message: 'Failed to fetch Groups' };
  }
};

export const getAllPermissionsByRoleId = async (roleId) => {
  try {
    console.log(roleId,"roleId")
    const response = await client.group.permissionWithRole(roleId)
    console.log(response);

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: 'Failed to fetch permissions' };
  }
};

export const getAllPermissions = async () => {
  try {
    const response = await client.permission.getAll()
    console.log(response);

    return { success: true, data: response?.data, permissions: response.data };
  } catch (error) {
    console.error('Error in getAllPermissions:', error);
    return { success: false, message: error?.response?.data?.message ? error?.response?.data?.message : 'Failed to fetch permissions' };
  }
};

export const getPermissionsByRole = async (roleId) => {
  try {
    const response = await client.group.permissionWithRole({role:roleId})
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error in getPermissionsByRoleId:', error);
   return { success: false, message: 'Failed to fetch permissions by role ID' };
  }
};
