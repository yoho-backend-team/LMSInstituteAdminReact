// groupService.js
import client from 'api/client';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const FORGET_PASSWORD_API_ENDPOINT = `${process.env.REACT_APP_PUBLIC_API_URL}/api/institutes/auth/admin`;

export const sendOtp = async (data) => {
    try {
        console.log('Sending OTP data ...', data);
        const response = await client.admin.forget_password(data);
        console.log('API Response in sendotp:',response);
        // Check if the response status is successful
        if (response.status) {
            return { success: true, email: response?.email, message: response?.message ,token:response?.token ,otp: response?.otp };
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
                Authorization: `Bearer ${secureLocalStorage.getItem('token')}`
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
        console.log('Verifying OTP data ...', data);
        const response = await client.admin.verfiy_otp(data);

        // Check if the response status is successful
        if (response.status) {
            return { success: true,  message: response?.message , otp: response?.otp };
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
