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
    return branch
    
    }else{
        return undefined
    }
}

const generateEndpoints = () => {
    const institute = getInstituteDetails();
    const branchId = getSelectedBranchId()

    // if (!institute) {
    //     return ; 
    // }

    const instituteId = institute? institute?.uuid  :""

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
        batch : {
            create : `/api/institutes/${instituteId}/branches/`,
            getAll : `/api/institutes/${instituteId}/branches/`,
            getWithId : `/api/institutes/${instituteId}/branches/${branchId}/batches/`
        },
        file: {
            upload: `${backEndUrl}/api/upload/`
        },
        users :{
            valiateOtp : `/api/institutes/auth/admin/verify-otp/`,
            studentRegister : "/api/institutes/auth/student/register",
            logout : `/api/institutes/auth/admin/logout`
        },
        student : {
            get : `/api/institutes/${instituteId}/branches/`,
            getWithId : `/api/institutes/${instituteId}/students/`,
            getWithcourse : `/api/institutes/${instituteId}/branches/${branchId}/courses/`
        },
        community : {
            all : `/api/institute/community/${instituteId}/branches/`,
            messages : `/api/institute/community/messages/`
        }
    };
};

console.log(generateEndpoints())
export const HTTP_END_POINTS = generateEndpoints();
