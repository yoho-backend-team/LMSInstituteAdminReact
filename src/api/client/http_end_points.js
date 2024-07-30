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
        admin  : {
          me : `/api/institutes/auth/admin/me`
        },
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
            delete : "/api/institutes/auth/admin/user/delete/",
            getWithRoleName : "/api/institutes/attedance/user-list/"
        },
        branch : {
            getAll : `/api/institutes/${instituteId}/branches/`,
            create : `/api/institutes/${instituteId}/branches/`
        },
        category: {
            getAll: `/api/institutes/${instituteId}/categories/`,
            create: `/api/institutes/${instituteId}/categories`
        },
        course: {
            get: `${backEndUrl}/api/institutes/${instituteId}/branches/`,
            update: `${backEndUrl}/api/institutes/${instituteId}/categories/`,
            withBranch : `/api/institutes/${instituteId}/branches/`,
            add :`/api/institutes/${instituteId}/categories/`,
            template : `/api/institutes/${instituteId}/branches/${branchId}/course-template`
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
            getWithId : `/api/institutes/${instituteId}/branches/${branchId}/batches/`,
            update : `/api/institutes/${instituteId}/branches/${branchId}/update/`,
            delete : `/api/institutes/${instituteId}/branches/${branchId}/batches/`
        },
        online_class : {
            getAll : `/api/institutes/class/online/all`,
            getWithId : `/api/institutes/class/online/`,
            create : `/api/institutes/class/online`,
            update : `/api/institutes/class/online/update/`
        },
        offline_class : {
            create : `/api/institutes/class/offline`,
            getAll : `/api/institutes/class/offline/all`,
            getWithId : `/api/institutes/class/offline/`,
            update : `/api/institutes/class/offline/update/`,
            delete : `/api/institutes/class/offline/`
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
            getWithId : `/api/institutes/student/${instituteId}/students/`,
            getWithBatch : `/api/institutes/${instituteId}/branches/`,
            getWithCourse: `/api/institutes/${instituteId}/branches/`,
            update : `/api/institutes/:instituteId/students/update/`,
            delete : `/api/institutes/student/student/`,
            activity : `/api/institutes/${instituteId}/students/student/activity/`,
            classess : `/api/institutes/:instituteId/students/student/classes/`
        },
        payment : {
          fee : {
            create : "/api/institutes/payments/student-fee/create"
          }
        },
        staff : {
            get : `/api/institutes/${instituteId}/Non-teaching-staff/`,
            getWithName : `/api/institutes/${instituteId}/branches/${branchId}/staff`,
            getWithId : `/api/institutes/${instituteId}/staff/`,
            getWithcourse : `/api/institutes/${instituteId}/branches/${branchId}/courses/`,
            getWithBranch : `/api/institutes/${instituteId}/branches/`
        },
        nonstaff :{
            getWithId : `/api/institutes/${instituteId}/branches/${branchId}/nonstaff/`,
        },
        community : {
            all : `/api/institutes/community/${instituteId}/branches/`,
            messages : `/api/institutes/community/messages/`
        },
        ticket : {
            student_ticket : `/api/institutes/student-ticket/getalll`,
            update_student_status_ticket : `/api/institutes/student-ticket/updatestatus/`,
            update : `/api/institutes/student-ticket/update/`,
            student_ticket_with_id : `/api/institutes/student-ticket/`,
            staff_ticket : `/api/institutes/staff/ticket/all`,
            staff_ticket_with_id : `/api/institutes/staff/ticket/`,
            update_staff_ticket : `/api/institutes/staff/ticket/updatestatus/`
        },
        attedence : {
          student_all : `/api/institutes/attedance/students`,
          get_with_id : `/api/institutes/attedance/student/`,   
          student_mark : `/api/institutes/attedance/student/mark-attedence`,
          staff_mark:`/api/institutes/attedance/staff/attedence`,
          non_staff_mark :`/api/institutes/non-attedence/non-teaching-staff/attedence`,
          staff_all : `/api/institutes/attedance/staff/attedence`,
          non_teaching_all : `/api/institutes/non-attedence/non-teaching-staff/attedence`,
          get_staff_attedence_with_id : `/api/institutes/attedance/staff/`,
          get_non_staff_with_id : `/api/institutes/non-attedence/non_teaching_staff/`
        },
        notification : {
          student_notification : `/api/institutes/students/notifications/all`,
          student_notification_get : `/api/institutes/students/notifications`,
          staff_notification : `/api/institutes/staff/notifications/all`,
          create_staff_notification : `/api/institutes/staff/notifications/`,
          institute_notification : `/api/institutes/branch/notifications`
        },
        subscription:{
           all_plans : `/api/institutes/payments/subscription/all`,
           institute_subscription : `/api/institutes/payments/subscription/`
        },
        activity : {
            get : "/api/institutes/user/activity"
        },
        reports : {
            get : `/api/institutes/${instituteId}/report/${branchId}`
        }
    };
};

export const HTTP_END_POINTS = generateEndpoints();
