// groupService.js
import axios from 'axios';

const SUBSCRIPTIONS_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/admin/subscription-management`;

export const getAllSubscriptions = async (data) => {
    try {
        const response = await axios.get(`${SUBSCRIPTIONS_API_END_POINT}/get-all-institute-subscription`, {
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
            throw new Error(`Failed to fetch Subscriptions. Status: ${response.status}`);
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error in getAllSubscriptions:', error);

        // Throw the error again to propagate it to the calling function/component
        throw error;
    }
};

export const getAllSubscriptionPlans = async (data) => {
    try {
        const response = await axios.get(`${SUBSCRIPTIONS_API_END_POINT}/get-all-subscriptions`, {
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
            throw new Error(`Failed to fetch SubscriptionPlans. Status: ${response.status}`);
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error in getAllSubscriptionPlans:', error);

        // Throw the error again to propagate it to the calling function/component
        throw error;
    }
};
