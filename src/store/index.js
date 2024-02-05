// import { createStore } from 'redux';
// import reducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customizationReducer';
import auth from 'features/authentication/authReducer';
import groupReducer from 'features/user-management/groups/redux/groupSlice';
import userReducer from 'features/user-management/users/redux/userSlices';
import batchReducer from 'features/batch-management/batches/redux/batchSlice';
import branchReducer from 'features/branch-management/branches/redux/branchReducers';
import courseCategoryReducer from 'features/course-management/categories/redux/courseCategoryReducers';
import courseReducer from 'features/course-management/courses/redux/courseReducers';
import courseStudyMaterialsReducer from 'features/content-management/course-contents/study-materials/redux/studyMaterialReducers';
import courseNotesReducer from 'features/content-management/course-contents/notes/redux/noteReducers';
import courseModulesReducer from 'features/content-management/course-contents/modules/redux/moduleReducers';
import teachingStaffsReducer from 'features/staff-management/teaching-staffs/redux/teachingStaffReducers';
import nonTeachingStaffsReducer from 'features/staff-management/non-teaching-staffs/redux/nonTeachingStaffReducers';
import studentsReducer from 'features/student-management/students/redux/studentReducer';
import offlineClassesReducer from 'features/class-management/offline-classes/redux/offlineClassReducers';
import liveClassesReducer from 'features/class-management/live-classes/redux/liveClassReducers';
import studentAttendancesReducer from 'features/attandence-management/student-attandences/redux/studentAttendanceReducers';
import teachingStaffAttendancesReducer from 'features/attandence-management/teaching-staff-attandences/redux/teachingStaffAttendanceReducers';
import nonTeachingStaffAttendancesReducer from 'features/attandence-management/non-teaching-staff-attandences/redux/nonTeachingStaffAttendanceReducers';
import studentFeesReducer from 'features/payment-management/fees/redux/studentFeeReducers';
import teachingStaffSalariesReducer from 'features/payment-management/salaries/teaching-staffs/redux/teachingStaffSalariesReducers';
import nonTeachingStaffSalariesReducer from 'features/payment-management/salaries/non-teaching-staffs/redux/nonTeachingStaffSalariesReducers';
import studentFeeRefundsReducer from 'features/refund-management/refunds/redux/studentFeeRefundReducers';

import studentNotificationsReducer from 'features/notification-management/student-notifications/redux/studentNotificationReducers';
import staffNotificationsReducer from 'features/notification-management/teaching-staff-notifications/redux/staffNotificationReducers';
import allNotificationsReducer from 'features/notification-management/all-notifications/redux/allNotificationReducers';

import studentCertificatesReducer from 'features/certificate-management/student-certificates/redux/studentCertificateReducers';
import calendar from 'features/calender/redux/reducers';
import studentIdCardsReducer from 'features/id-card-management/student-id-cards/redux/studentIdcardReducers';
import staffIdCardsReducer from 'features/id-card-management/staff-id-cards/redux/staffIdcardReducers';

import customerSupportsReducer from 'features/help-center/customer-support/redux/customerSupportReducers';
import technicalSupportsReducer from 'features/help-center/technical-support/redux/technicalSupportReducers';
// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    groups: groupReducer,
    users: userReducer,
    batches: batchReducer,
    branches: branchReducer,
    courseCategories: courseCategoryReducer,
    courseStudyMaterials: courseStudyMaterialsReducer,
    courseNotes: courseNotesReducer,
    courseModules: courseModulesReducer,
    courses: courseReducer,
    teachingStaffs: teachingStaffsReducer,
    nonTeachingStaffs: nonTeachingStaffsReducer,
    students: studentsReducer,
    offlineClasses: offlineClassesReducer,
    liveClasses: liveClassesReducer,
    studentAttendances: studentAttendancesReducer,
    teachingStaffAttendances: teachingStaffAttendancesReducer,
    nonTeachingStaffAttendances: nonTeachingStaffAttendancesReducer,
    studentFees: studentFeesReducer,
    teachingStaffSalaries: teachingStaffSalariesReducer,
    nonTeachingStaffSalaries: nonTeachingStaffSalariesReducer,
    studentFeeRefunds: studentFeeRefundsReducer,
    studentNotifications: studentNotificationsReducer,
    staffNotifications: staffNotificationsReducer,
    allNotifications: allNotificationsReducer,
    studentCertificates: studentCertificatesReducer,
    studentIdCards: studentIdCardsReducer,
    staffIdCards: staffIdCardsReducer,
    consumerSupports: customerSupportsReducer,
    technicalSupport: technicalSupportsReducer,
    calendar: calendar,
    auth: auth
  }
});
// configureStore(reducer);
const persister = 'Free';

export { store, persister };
