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
        permission : {
            getAll : `/api/admin/institutes/permissions/all`,
            update : `/api/admin/institutes/groups/permissions`
        },
        group : {
            create : "/api/admin/institutes/role",
            getAll : "/api/admin/institutes/groups/all/",
            permissions : "/api/lms/institutes/groups/permissions/",
            update_status : "/api/admin/institutes/groups/update-status/",
            delete : "/api/admin/institutes/group/delete/"
        },
        user : {
            add : "/api/institutes/auth/admin/register",
            all : "/api/institutes/auth/admin/users/all",
            getWihtId : '/api/institutes/auth/admin/user/',
            update : "/api/institutes/auth/admin/user/update/",
            delete : "/api/institutes/auth/admin/user/delete/"
        },
        branch : {
            getAll : `/api/institutes/${instituteId}/branches/`
        },
        category: {
            getAll: `/api/institutes/${instituteId}/categories/`,
            create: `/api/institutes/${instituteId}/categories`
        },
        course: {
            get: `${backEndUrl}/api/institutes/${instituteId}/branches/`,
            update: `${backEndUrl}/api/institutes/${instituteId}/categories/`,
            withBranch : `/api/institutes/${instituteId}/branches/`,
            add :`/api/institutes/${instituteId}/categories/`
        },
        course_module : {
            get : "/api/institutes/course-module/",
            update_status : "/api/institutes/course-module/update-status/",
            update : '/api/institutes/course-module/update/'
        },
        study_material : {
            get : "api/institutes/study-material/",
            update_status : "/api/institutes/study-material/update-status/"
        },
        notes : {
         index : '/api/institutes/course/note',
         update_status : '/api/institutes/course/note/update-status/'
        },
        batch : {
            create : `/api/institutes/${instituteId}/branches/`,
            getAll : `/api/institutes/${instituteId}/branches/`,
            getWithId : `/api/institutes/${instituteId}/branches/${branchId}/batches/`
        },
        online_class : {
            getAll : `/api/institutes/class/online/all`,
            getWithId : `/api/institutes/class/online/`
        },
        offline_class : {
            getAll : `/api/institutes/class/offline/all`
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
            getWithBatch : `/api/institutes/${instituteId}/branches/`,
            getWithCourse: `/api/institutes/${instituteId}/branches/`
        },
        staff : {
            get : `/api/institutes/${instituteId}/Non-teaching-staff/`,
            getWithId : `/api/institutes/${instituteId}/staff/`,
            getWithcourse : `/api/institutes/${instituteId}/branches/${branchId}/courses/`
        },
        community : {
            all : `/api/institutes/community/${instituteId}/branches/`,
            messages : `/api/institutes/community/messages/`
        }
    };
};

export const HTTP_END_POINTS = generateEndpoints();
