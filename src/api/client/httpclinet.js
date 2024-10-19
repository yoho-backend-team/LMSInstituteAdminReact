import axios from "axios";

const Axios = axios.create({
    baseURL : process.env.REACT_APP_PUBLIC_API_URL,
    timeout : 5000000,
    headers : {
        "Content-Type" : "application/json"
    }
});

Axios.interceptors.request.use((config)=> {
    const token = localStorage.getItem("token");
    if(token){
        config.headers["Authorization"] = `Token ${token ? token :""}`;
    }
    return config;
});

Axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error,error?.response.status === 401,error.response.statusText === "Unauthorized")
        if(error.response && error.response.status === 401 && error.response.statusText === "Unauthorized"){
            console.log("logout tryed")
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            localStorage.removeItem('permissions');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('branches');
            localStorage.removeItem("institute")
            window.location.replace("/login")
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

