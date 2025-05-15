import client from "api/client"
import { getErrorMessage } from "utils/error-handler"



export const getInstituteCurrentSubscriptionStatus = async (params) => {
    try {
    const response = await client.subscription.get_subscription_status(params) 
    return response?.data
    } catch (error) {
      const error_message = getErrorMessage(error)
      throw new Error(error)  
    }
}


export const UpgradSubscriptionPlanWithId = async (params) => {
    try {
     const response = await client.subscription.upgrade_request(params)  
     return response 
    } catch (error) {
      const error_message = getErrorMessage(error) 
    }
}