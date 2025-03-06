import axios from "axios";
import React from "react";
import secureLocalStorage from "react-secure-storage";
import { getSecureItem } from "utils/localStroageService";
import { removeSecureItem } from "utils/localStroageService";
 import { createRoot } from "react-dom/client";
 import { Modal,Box,Typography,Button } from "@mui/material";

const Axios = axios.create({
    baseURL : process.env.REACT_APP_PUBLIC_API_URL,
    timeout : 5000000,
    headers : {
        "Content-Type" : "application/json"
    }
});

//modal for session expire
export const showSessionExpiredModal = () => {
    const modalContainer = document.createElement("div");    //div act as a container for modal 
    modalContainer.setAttribute("id", "session-expired-modal"); // add id for reference
    document.body.appendChild(modalContainer);         //add this div to the body of the doc
    const root = createRoot(modalContainer);          //initialize rendering

    const handleLogout = () => {
        console.log("session expired");
        removeSecureItem("token");
        removeSecureItem("userData");
        removeSecureItem("permissions");
        removeSecureItem("auth");
        removeSecureItem("branches");
        removeSecureItem("institute");
         
        // document.body.removeChild(modalContainer);   //remove the modal

          // check that modalContainer exists in document.body before removing ,if exist remove it
          const modalToRemove = document.getElementById("session-expired-modal");
          if (modalToRemove) {
              root.unmount(); // Unmount the React component
              document.body.removeChild(modalToRemove); // Remove modal  
          }

        console.log("all cleared");
        window.location.replace("/#/login");
    };

    root.render(
        <Modal open={true}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    textAlign: "center",
                }}
            >
                <Typography variant="h6">Your session has expired</Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Please log in again to continue.
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 3 }} 
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
        </Modal>
    );
};

Axios.interceptors.request.use((config)=> {
    const token = getSecureItem("token");
    // console.log(config,"config")
    if(token){
        config.headers["Authorization"] = `Token ${token ? token :""}`;
    }
    return config;
});

Axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error?.response && error?.response?.status === 401 && error?.response?.data?.status === "session_expired"){
            // console.log("logout tryed")
            // removeSecureItem('token');
            // removeSecureItem('userData');
            // removeSecureItem('permissions');
            // removeSecureItem('auth');
            // removeSecureItem('branches');
            // removeSecureItem("institute")
            // window.location.replace("/#/login")
            showSessionExpiredModal();
        }
        return Promise.reject(error);
    }
);


class HttpClient{

     async get(url,params){
      const response = await Axios.get(url,{params})
      return response.data
     }

     async post(url,data,params){
      const response = await Axios.post(url,data,params)
      return response.data
     }

     async update(url,data){
        const response = await Axios.put(url,data)
        return response.data
     }
     
     async delete(url){
        const response = await Axios.delete(url)
        return response
     }

     async uploadFile(url, data) {
        const response = await Axios.post(url, data, { headers: { "Content-Type": "multipart/form-data" } });
        return response.data;
    }
}

export default new HttpClient()


