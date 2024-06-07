// groupService.js
import client from 'api/client';
import axios from 'axios';

const SUBSCRIPTIONS_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/payments/subscription`;
const SUBSCRIPTIONSPLANS_API_END_POINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/subscription`;

export const getAllSubscriptions = async (data) => {
    try {
        const response = await client.subscription.get_subscription(data)
        
        return response;
    } catch (error) {
        
        console.error('Error in getAllSubscriptions:', error);

        // Throw the error again to propagate it to the calling function/component
        throw new Error(`Failed to fetch Subscriptions. Status: ${error?.response?.data?.message}`);
    }
};

export const getAllSubscriptionPlans = async (data) => {
    try {
        const response = await client.subscription.get_all_plans()
        return response;
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error in getAllSubscriptionPlans:', error);
        throw new Error(`Failed to fetch SubscriptionPlans. Status: ${error?.response?.data?.message}`);
    }
};
