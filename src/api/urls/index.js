const backEndUrl = process.env.REACT_APP_PUBLIC_API_URL;

const getInstituteDetails = () => {
    if(typeof(localStorage) !== "undefined"){
    const institute = localStorage.getItem("institute")
    return JSON.parse(institute)
    }else{
     return undefined
    }
}

const getSelectedBranchId = () => {
    if(typeof(localStorage)!== "undefined"){
    const branch = localStorage.getItem("selectedBranchId")
    console.log(branch,"branch")
    return branch
    
    }else{
        return undefined
    }
}

const generateEndpoints = () => {
    const institute = getInstituteDetails();
    const branchId = getSelectedBranchId()

    if (!institute) {
        return {}; 
    }

    const instituteId = institute.uuid;

    return {
        category: {
            getAll: `${backEndUrl}/api/institutes/${instituteId}/categories/`,
            create: `${backEndUrl}/api/institutes/${instituteId}/categories`
        },
        course: {
            get: `${backEndUrl}/api/institutes/${instituteId}/branches/`,
            update: `${backEndUrl}/api/institutes/${instituteId}/categories/`,
            add :`/api/institutes/${instituteId}/categories/`
        },
        file: {
            upload: `${backEndUrl}/api/upload/`
        },
        users :{
            verifyOtp : "/api/institutes/auth/admin/verify-otp/",
            studentRegister : "/api/institutes/auth/student/register",
            logout : `/api/institutes/auth/admin/logout`
        },
        student : {
            get : `/api/institutes/${instituteId}/branches/`,
            getWithId : `/api/institutes/${instituteId}/students/`
        },
        staff : {
            get : `/api/institutes/${instituteId}/Non-teaching-staff/`,
            get : `/api/institutes/${instituteId}/teaching-staff/`,
            getWithId : `/api/institutes/${instituteId}/staff/`
        }
    };
};


export const HTTP_END_POINTS = generateEndpoints();
