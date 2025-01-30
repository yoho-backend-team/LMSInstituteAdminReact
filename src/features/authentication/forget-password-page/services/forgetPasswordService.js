// groupService.js
import axios from 'axios';

const FORGET_PASSWORD_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/auth/admin`;

export const sendOtp = async (data) => {
    try {
        const response = await axios.post(`${FORGET_PASSWORD_API_ENDPOINT}/forget-password`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
             
        });
        // Check if the response status is successful
        if (response.data.status) {
            return { success: true, data: response?.data?.data, message: response?.data?.message };
        } else {
            // If the response status is not successful, throw an error
            throw new Error(`Failed to Send OTP. Status: ${response.status}`);
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error in send OTP:', error.response);

        // Throw the error again to propagate it to the calling function/component
        throw error;
    }
};
export const resendOtp = async (data) => {
    try {
        const response = await axios.get(`${FORGET_PASSWORD_API_ENDPOINT}/forget-password`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        // Check if the response status is successful
        if (response.data.status) {
            return { success: true, data: response?.data?.data, message: response?.data?.message };
        } else {
            // If the response status is not successful, throw an error
            throw new Error(`Failed to Send OTP. Status: ${response.status}`);
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error in send OTP:', error);

        // Throw the error again to propagate it to the calling function/component
        throw error;
    }
};
export const verifyOtp = async (data) => {
    try {
        const response = await axios.post(`${FORGET_PASSWORD_API_ENDPOINT}/verify-otp`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        // Check if the response status is successful
        if (response.data.status) {
            return { success: true, data: response?.data?.data, message: response?.data?.message };
        } else {
            // If the response status is not successful, throw an error
            throw new Error(`Failed to Verify OTP. Status: ${response.status}`);
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error in Verify OTP:', error);

        // Throw the error again to propagate it to the calling function/component
        throw error;
    }
};
