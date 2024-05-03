import { lazy } from 'react';

// project imports
import Loadable from 'components/loadable';
import MinimalLayout from 'layout/MinimalLayout';
import MainLayout from 'layout/MainLayout';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { status } from 'nprogress';
// view imports

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const AuthLogin = Loadable(lazy(() => import('views/authentication/login-page')));

// User Management
const GroupsPage = Loadable(lazy(() => import('views/user-management/groups-page/groups-overview-page')));
const AddGroupPage = Loadable(lazy(() => import('views/user-management/groups-page/groups-add-page')));
const ViewGroupPage = Loadable(lazy(() => import('views/user-management/groups-page/groups[id]-page')));
const EditGroupPage = Loadable(lazy(() => import('views/user-management/groups-page/groups-edit-page')));
const UsersPage = Loadable(lazy(() => import('views/user-management/users-page/users-overview-page')));
const ViewUserPage = Loadable(lazy(() => import('views/user-management/users-page/users[id]-page')));

//Branch Management
const BranchesPage = Loadable(lazy(() => import('views/branch-management/branches-page/branch-overview-page')));
const AddBranchPage = Loadable(lazy(() => import('views/branch-management/branches-page/branch-add-page')));
const ViewBranchPage = Loadable(lazy(() => import('views/branch-management/branches-page/branch[id]-page')));

// Batch Management
const BatchesPage = Loadable(lazy(() => import('views/batch-management/batches-overview-page')));
const AddBatchPage = Loadable(lazy(() => import('views/batch-management/add-batch')));
const ViewBatchPage = Loadable(lazy(() => import('views/batch-management/view-batch')));

// Attendance Management
const StudentAttendanceViewPage = Loadable(lazy(() => import('views/attendance-management/student-attendances-page/attendance[id]-page')));
const StudentAttendancesPage = Loadable(
  lazy(() => import('views/attendance-management/student-attendances-page/attendance-overview-page'))
);
const TeachingStaffAttendancesPage = Loadable(
  lazy(() => import('views/attendance-management/teaching-staff-attendances-page/attendance-overview-page'))
);
const TeachingStaffViewAttendancesPage = Loadable(
  lazy(() => import('views/attendance-management/teaching-staff-attendances-page/attendance[id]-page'))
);
const NonTeachingStaffAttendancesPage = Loadable(
  lazy(() => import('views/attendance-management/non-teaching-staff-attendances-page/attendance-overview-page'))
);
const NonTeachingStaffViewAttendancesPage = Loadable(
  lazy(() => import('views/attendance-management/non-teaching-staff-attendances-page/attendance[id]-page'))
);

// Certificate Management
const StudentCertificatesPage = Loadable(lazy(() => import('views/certificate-management/student-certificates-page/student-certificates-overview-page')));

// Class Management
const LiveClassesPage = Loadable(lazy(() => import('views/class-management/live-classes-page/live-classes-overview-page')));
const ViewLiveClass = Loadable(lazy(() => import('views/class-management/live-classes-page/live-class[id]-page')));
const OfflineClassesPage = Loadable(lazy(() => import('views/class-management/offline-classes-page/offline-classes-overview-page')));
const ViewOfflineClass = Loadable(lazy(() => import('views/class-management/offline-classes-page/offline-class[id]-page')));

// Content Management

const StudyMaterialsPage = Loadable(lazy(() => import('views/content-management/course-study-materials-page/course-study-materials-overview-page')));
const NotesPage = Loadable(lazy(() => import('views/content-management/course-notes-page/course-notes-overview-page')));
const ModulesPage = Loadable(lazy(() => import('views/content-management/course-modules-page/course-modules-overview-page')));

// Course Management
const CategoriesPage = Loadable(lazy(() => import('views/course-management/course-categories-page/categories-overview-page')));
const CoursesPage = Loadable(lazy(() => import('views/course-management/courses-page/courses-overview-page')));
const AddCoursePage = Loadable(lazy(() => import('views/course-management/courses-page/course-add-page')));
const ViewCoursePage = Loadable(lazy(() => import('views/course-management/courses-page/course[id]-page')));

// Help Center
const CustomerSupportPage = Loadable(lazy(() => import('views/help-center/customer-support-page')));

// Ticket Management
const StaffTicketPage = Loadable(lazy(() => import('views/ticket-management/staff-tickets-page/staff-tickets-overview-page')));
const StudentTicketPage = Loadable(lazy(() => import('views/ticket-management/student-tickets-page/student-tickets-overview-page')));
const YourTicketPage = Loadable(lazy(() => import('views/ticket-management/your-tickets-page/your-tickets-overview-page')));

// Id Card Management
const StaffIdCardsPage = Loadable(lazy(() => import('views/id-card-management/teaching-staff-id-cards-page/teaching-staff-id-cards-overview-page')));
const StudentIdCardsPage = Loadable(lazy(() => import('views/id-card-management/student-id-cards-page/student-id-cards-overview-page')));

// Attendance Management
const AllNotificationsPage = Loadable(lazy(() => import('views/notification-management/all-notifications-page/all-notifications-overview-page')));
const StaffNotificationsPage = Loadable(lazy(() => import('views/notification-management/staff-notifications-page/staff-notifications-overview-page')));
const StudentNotificationsPage = Loadable(lazy(() => import('views/notification-management/student-notifications-page/student-notifications-overview-page')));

// Payment Management
const FeesPage = Loadable(lazy(() => import('views/payment-management/student-fees-page/student-fees-overview-page')));
const SalariesPage = Loadable(lazy(() => import('views/payment-management/staff-salaries-page/staff-salaries-overview-page')));
const SubscriptionsPage = Loadable(lazy(() => import('views/payment-management/subscriptions-page/subscriptions-overview-page')));

// Refund Management
const RefundsPage = Loadable(lazy(() => import('views/refund-management/student-fee-refunds-page/student-fee-refunds-overview-page')));

//Faq Management
const FaqCategoriesPage = Loadable(lazy(() => import('views/faq-management/faq-categories-page/faq-categories-overview-page')));
const FaqFaqsPage = Loadable(lazy(() => import('views/faq-management/faqs-page/faqs-overview-page')));

// Staff Management
const TeachingStaffsPage = Loadable(lazy(() => import('views/staff-management/teaching-staffs-page/staff-overview-page')));
const NonTeachingStaffsPage = Loadable(lazy(() => import('views/staff-management/non-teaching-staffs-page/staff-overview-page')));
const ViewTeachingProfile = Loadable(lazy(() => import('views/staff-management/teaching-staffs-page/staff[id]-page')));
const AddNewNonTeachingStaff = Loadable(lazy(() => import('views/staff-management/non-teaching-staffs-page/staff-add-page')));
const EditNonTeachingStaff = Loadable(lazy(() => import('views/staff-management/non-teaching-staffs-page/staff-edit-page')));
const AddNewTeachingStaff = Loadable(lazy(() => import('views/staff-management/teaching-staffs-page/staff-add-page')));
const EditTeachingStaff = Loadable(lazy(() => import('views/staff-management/teaching-staffs-page/staff-edit-page')));
const ViewNonTeachingProfile = Loadable(lazy(() => import('views/staff-management/non-teaching-staffs-page/staff[id]-page')));
// Student Management
const StudentsPage = Loadable(lazy(() => import('views/student-management/students-page/student-overview-page')));
const ViewStudentProfile = Loadable(lazy(() => import('views/student-management/students-page/student[id]-page')));
const AddNewStudent = Loadable(lazy(() => import('views/student-management/students-page/student-add-page')));
const EditStudent = Loadable(lazy(() => import('views/student-management/students-page/student-edit-page')));

//Error Pages
const Page404 = Loadable(lazy(() => import('views/error-pages/404-page')));
const Page401 = Loadable(lazy(() => import('views/error-pages/401-page')));
const Page500 = Loadable(lazy(() => import('views/error-pages/500-page')));

// Community
const Community = Loadable(lazy(() => import('views/community-management/batch-communities-page/community-overview-page/index.js')));
const AccountSettings = Loadable(lazy(() => import('layout/MainLayout/Header/ProfileSection/AccountSettings')));

// Profile management
const AllNotifications = Loadable(lazy(() => import('views/profile-management/notifications-page')));

//Forget Password
const ForgetPassword = Loadable(lazy(() => import('views/authentication/forget-password-page')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //
const Protected = () => {
  // Access the isAuthenticated state from the Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // If the user is authenticated, render the content
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }
};

const ApplicationRoutes = () => {
  const permissions = useSelector((state) => state.auth.permissions);

  const hasPermission = (permissionCode,permission,action) => {
    return permissionCode === permission[action].code
    // return permissions?.some((obj) => obj.identity === permissionCode);
  };
  
  const ProtectedRoute = ({ element, permissionCode,module ,permissionReq }) => {
    const permission = permissions?.filter((obj) => obj.identity === module)
    const action = permissionReq ? permissionReq : "read_permission"
    const hasAccess = hasPermission(permissionCode,permission[0],action);
  
    return hasAccess ? element : <Navigate to="/unauthorized" />;
  };

  return (
    <Routes>
      <Route element={<Protected />}>
        {/* Dashboard Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to={permissions ? permissions[0]?.urls[0] : '/'} />} />
          <Route element={<ProtectedRoute element={<DashboardDefault />} permissionCode={"can_read_dashboard"} module={"dashboard"} />}>
            <Route path="dashboard" element={<DashboardDefault />} />
          </Route>
        </Route>
        {/* Branch Management Routes */}
        <Route path="/branch-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/branch-management/branches" />} />
          <Route element={<ProtectedRoute element={<BranchesPage />} permissionCode={'can_read_branches'} module={"Branches"} />}>
            <Route path="branches" element={<BranchesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<AddBranchPage />} permissionCode={'can_create_branches'} permissionReq={"create_permission"} module={"Branches"} />}>
            <Route path="branches/add" element={<AddBranchPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewBranchPage />} permissionCode={'can_read_branches'} module={"Branches"} />}>
            <Route path="branches/:id" element={<ViewBranchPage />} />
          </Route>
        </Route>
        {/* User Management Routes */}
        <Route path="/user-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/user-management/groups" />} />
          <Route element={<ProtectedRoute element={<GroupsPage />} permissionCode={'can_read_institute_group'} module={'Groups'} />}>
            <Route path="groups" element={<GroupsPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<AddGroupPage />} permissionCode={'can_create_institute_group'} module={'Groups'} />}>
            <Route path="groups/add" element={<AddGroupPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewGroupPage />} permissionCode={'inst_perm_group_details_view'} module={'Groups'} />}>
            <Route path="groups/view" element={<ViewGroupPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<EditGroupPage />} permissionCode={'can_update_institute_group'} module={'Groups'} />}>
            <Route path="groups/:id/edit/" element={<EditGroupPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<UsersPage />} permissionCode={'can_read_institute_user'} module={'Users'} />}>
            <Route path="admin-users" element={<UsersPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewUserPage />} permissionCode={'can_read_institute_user_details'} module={'User Details'} />}>
            <Route path="admin-users/:id" element={<ViewUserPage />} />
          </Route>
        </Route>
        {/* Course Management Routes */}
        <Route path="/course-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/course-management/categories" />} />
          <Route element={<ProtectedRoute element={<CategoriesPage />} permissionCode={'can_read_institute_category'} module={'Categories'} />}>
            <Route path="categories" element={<CategoriesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<CoursesPage />} permissionCode={'can_read_institute_course'} module={'Courses'} />}>
            <Route path="courses" element={<CoursesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<AddCoursePage />} permissionCode={'can_create_institute_course'} module={'Courses'} permissionReq={"create_permission"} />}>
            <Route path="courses/add" element={<AddCoursePage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewCoursePage />} permissionCode={'can_read_institute_course_details'} module={"Course Details"} />}>
            <Route path="courses/:id" element={<ViewCoursePage />} />
          </Route>
        </Route>
        {/* Content Management Routes */}
        <Route path="/content-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/content-management/study-materials" />} />
          <Route element={<ProtectedRoute element={<StudyMaterialsPage />} permissionCode={'can_read_institute_study_materials'} module={'Study Materials'} />}>
            <Route path="study-materials" element={<StudyMaterialsPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<NotesPage />} permissionCode={'can_read_institute_course_notes'} module={'Course Notes'} />}>
            <Route path="notes" element={<NotesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ModulesPage />} permissionCode={'can_read_institute_course_modules'} module={'Course Modules'} />}>
            <Route path="modules" element={<ModulesPage />} />
          </Route>
        </Route>
        {/* Staff Management Routes */}
        <Route path="/staff-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/staff-management/teaching-staffs" />} />
          <Route element={<ProtectedRoute element={<TeachingStaffsPage />} permissionCode={'can_read_institute_teaching_staffs'} module={'TeachingStaffs'} />}>
            <Route path="teaching-staffs" element={<TeachingStaffsPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<AddNewTeachingStaff />} permissionCode={'can_create_institute_teaching_staffs'} module={'TeachingStaffs'} permissionReq={"create_permission"} />}>
            <Route path="teaching-staffs/add" element={<AddNewTeachingStaff />} />
          </Route>
          <Route element={<ProtectedRoute element={<EditTeachingStaff />} permissionCode={'can_update_institute_teching_staffs'} module={'TeachingStaffs'} />}>
            <Route path="teaching-staffs/:id/edit" element={<EditTeachingStaff />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewTeachingProfile />} permissionCode={'can_view_staff_details'} module={'TeachingStaff Details'} />}>
            <Route path="teaching-staffs/:id" element={<ViewTeachingProfile />} />
          </Route>
          <Route element={<ProtectedRoute element={<NonTeachingStaffsPage />} permissionCode={'can_view_non_teaching_staffs'} module={'Non TeachingStaffs'} />}>
            <Route path="non-teaching-staffs" element={<NonTeachingStaffsPage />} />
          </Route>
          <Route
            element={<ProtectedRoute element={<ViewNonTeachingProfile />} permissionCode={'can_view_non_teaching_staff_details'} module={'Non TeachingStaff Details'} />}
          >
            <Route path="non-teaching-staffs/:id" element={<ViewNonTeachingProfile />} />
          </Route>
          <Route element={<ProtectedRoute element={<AddNewNonTeachingStaff />} permissionCode={'can_create_non_teaching_staffs'} module={'Non TeachingStaffs'} permissionReq={"create_permission"} />}>
            <Route path="non-teaching-staffs/add" element={<AddNewNonTeachingStaff />} />
          </Route>
          <Route
            element={<ProtectedRoute element={<EditNonTeachingStaff />} permissionCode={'can_update_non_teaching_staff_details'} module={'Non TeachingStaff Details'} />}
          >
            <Route path="non-teaching-staffs/:id/edit" element={<EditNonTeachingStaff />} />
          </Route>
        </Route>
        {/* Student Management Routes */}
        <Route path="/student-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/student-management/students" />} />
          <Route element={<ProtectedRoute element={<StudentsPage />} permissionCode={'can_view_students'} module={'Students'} />}>
            <Route path="students" element={<StudentsPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewStudentProfile />} permissionCode={'can_view_student_details'} module={'Student Details'} />}>
            <Route path="students/:id" element={<ViewStudentProfile />} />
          </Route>
          <Route element={<ProtectedRoute element={<AddNewStudent />} permissionCode={'can_create_students'} module={'Students'} permissionReq={"create_permission"} />}>
            <Route path="students/add" element={<AddNewStudent />} />
          </Route>
          <Route element={<ProtectedRoute element={<EditStudent />} permissionCode={'can_update_student_details'} module={'Student Details'} />}>
            <Route path="students/:id/edit" element={<EditStudent />} />
          </Route>
        </Route>
        {/* Batch Management Routes */}
        <Route path="/batch-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/batch-management/batches" />} />
          <Route element={<ProtectedRoute element={<BatchesPage />} permissionCode={'can_view_batches'} module={'Batches'} />}>
            <Route path="batches" element={<BatchesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<AddBatchPage />} permissionCode={'can_create_batches'} module={'Batches'} permissionReq={"create_permission"} />}>
            <Route path="batches/add" element={<AddBatchPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewBatchPage />} permissionCode={'can_view_batch_details'} module={'Batch Details'} />}>
            <Route path="batches/:id" element={<ViewBatchPage />} />
          </Route>
        </Route>
        {/* Class Management Routes */}
        <Route path="/class-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/class-management/live-classes" />} />
          <Route element={<ProtectedRoute element={<LiveClassesPage />} permissionCode={'can_view_live_classes'} module={'Live Classes'}/>}>
            <Route path="live-classes" element={<LiveClassesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewLiveClass />} permissionCode={'can_view_live_classes_details'} module={'LiveClass Details'} />}>
            <Route path="live-classes/:id" element={<ViewLiveClass />} />
          </Route>
          <Route element={<ProtectedRoute element={<OfflineClassesPage />} permissionCode={'can_view_offline_classes'} module={'Offline Classes'} />}>
            <Route path="offline-classes" element={<OfflineClassesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewOfflineClass />} permissionCode={'can_view_offline_class_details'} module={'OfflineClass Details'} />}>
            <Route path="offline-classes/:id" element={<ViewOfflineClass />} />
          </Route>
        </Route>
        {/* Attendance Management Routes */}
        <Route path="/attendance-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/attendance-management/student-attendances" />} />
          <Route element={<ProtectedRoute element={<StudentAttendancesPage />} permissionCode={'can_view_student_attendances'} module={'Student Attendances'} />}>
            <Route path="student-attendances" element={<StudentAttendancesPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute element={<StudentAttendanceViewPage />} permissionCode={'can_view_student_attendance_details'} module={'Student Attendances Details'} />
            }
          >
            <Route path="student-attendances/:id" element={<StudentAttendanceViewPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute element={<TeachingStaffAttendancesPage />} permissionCode={'can_view_teaching_staff_attendance'} module={'TeachingStaff Attendances'} />
            }
          >
            <Route path="teaching-staff-attendances" element={<TeachingStaffAttendancesPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                element={<TeachingStaffViewAttendancesPage />}
                permissionCode={'can_view_teaching_staff_attendance_details'}
                module={'TeachingStaff Attendance Details'}
              />
            }
          >
            <Route path="teaching-staff-attendances/:id" element={<TeachingStaffViewAttendancesPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                element={<NonTeachingStaffAttendancesPage />}
                permissionCode={'can_view_non_teaching_staff_attendance'}
                module={'NonTeachingStaff Attendances'}
              />
            }
          >
            <Route path="non-teaching-staff-attendances" element={<NonTeachingStaffAttendancesPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                element={<NonTeachingStaffViewAttendancesPage />}
                permissionCode={'can_view_non_teaching_staff_attendance'}
                module={'NonTeachingStaff Attendances'}
              />
            }
          >
            <Route path="non-teaching-staff-attendances/:id" element={<NonTeachingStaffViewAttendancesPage />} />
          </Route>
        </Route>
        {/* Payment Management Routes */}
        <Route path="/payment-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/payment-management/fees" />} />
          <Route element={<ProtectedRoute element={<FeesPage />} permissionCode={'inst_perm_student_fees_payment_management_view'} module={"Fees"} />}>
            <Route path="fees" element={<FeesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<SalariesPage />} permissionCode={'inst_perm_staff_salaries_view'} module={'Staff Salaries'} />}>
            <Route path="salaries" element={<SalariesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<SubscriptionsPage />} permissionCode={'inst_perm_subscriptions_view'} module={'Subscriptions'} />}>
            <Route path="subscriptions" element={<SubscriptionsPage />} />
          </Route>
        </Route>
        {/* Refund Management Routes */}
        <Route path="/refund-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/refund-management/refunds" />} />
          <Route element={<ProtectedRoute element={<RefundsPage />} permissionCode={'inst_perm_student_fees_refund_management_view'} module={'Student Fees'} />}>
            <Route path="refunds" element={<RefundsPage />} />
          </Route>
        </Route>
        {/* Notification Management Routes */}
        <Route path="/notification-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/notification-management/all-notifications" />} />
          <Route element={<ProtectedRoute element={<AllNotificationsPage />} permissionCode={'inst_perm_all_notification_view'} module={'All Notifications'} />}>
            <Route path="all-notifications" element={<AllNotificationsPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<StaffNotificationsPage />} permissionCode={'inst_perm_staff_notification_view'} module={'Student Notifications'} />}>
            <Route path="staff-notifications" element={<StaffNotificationsPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<StudentNotificationsPage />} permissionCode={'inst_perm_student_notification_view'} module={'Student Notifications'} />}>
            <Route path="student-notifications" element={<StudentNotificationsPage />} />
          </Route>
        </Route>
        {/* Certificate Management Routes */}
        <Route path="/certificate-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/certificate-management/student-certificates" />} />
          <Route element={<ProtectedRoute element={<StudentCertificatesPage />} permissionCode={'inst_perm_student_certificates_view'} module={'Student Certificates'} />}>
            <Route path="student-certificates" element={<StudentCertificatesPage />} />
          </Route>
        </Route>
        <Route path="/id-card-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/id-card-management/student-id-cards" />} />
          <Route element={<ProtectedRoute element={<StudentIdCardsPage />} permissionCode={'can_read_institute_student_id_cards'} module={'Student IdCards'} />}>
            <Route path="student-id-cards" element={<StudentIdCardsPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<StaffIdCardsPage />} permissionCode={'inst_perm_staff_id_cards_view'} module={"Staff IdCards"} />}>
            <Route path="staff-id-cards" element={<StaffIdCardsPage />} />
          </Route>
        </Route>
        {/* Faq Management Routes */}
        <Route path="/faq-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/faq-management/categories" />} />
          <Route element={<ProtectedRoute element={<FaqCategoriesPage />} permissionCode={'can_read_institute_faq_categoreis'} module={"Faq Categories"} />}>
            <Route path="categories" element={<FaqCategoriesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<FaqFaqsPage />} permissionCode={'can_read_institute_faqs'} module={"Faqs"} />}>
            <Route path="faqs" element={<FaqFaqsPage />} />
          </Route>
        </Route>
        {/* Ticket Management Routes */}
        <Route path="/ticket-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/ticket-management/staff-ticket" />} />
          <Route element={<ProtectedRoute element={<StaffTicketPage />} permissionCode={'inst_perm_staff_ticket_view'} />}>
            <Route path="staff-ticket" element={<StaffTicketPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<StudentTicketPage />} permissionCode={'inst_perm_student_ticket_view'} />}>
            <Route path="student-ticket" element={<StudentTicketPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<YourTicketPage />} permissionCode={'inst_perm_student_ticket_view'} />}>
            <Route path="your-ticket" element={<YourTicketPage />} />
          </Route>
        </Route>
        {/* Help Center Routes */}
        <Route path="/help-center" element={<MainLayout />}>
          <Route index element={<Navigate to="/help-center/help-faqs" />} />
          <Route element={<ProtectedRoute element={<CustomerSupportPage />} permissionCode={'inst_help_faqs_support_view'} module={"Help Faqs"} />}>
            <Route path="help-faqs" element={<CustomerSupportPage />} />
          </Route>
        </Route>
        {/* Community Management Routes */}
        <Route path="/community-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/community" />} />
          <Route element={<ProtectedRoute element={<Community />} permissionCode={'can_read_institute_community'} module={'Community'} />}>
            <Route path="community" element={<Community />} />
          </Route>
        </Route>
        {/* Profile Management Routes */}
        <Route path="/profile-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/account-settings" />} />
          <Route path="account-settings" element={<AccountSettings />} />
          <Route path="notifications" element={<AllNotifications />} />
        </Route>
        <Route element={<MinimalLayout />}>
          <Route path="/unauthorized" element={<Page401 />} />
        </Route>

        <Route element={<MinimalLayout />}>
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route element={<MinimalLayout />}>
          <Route path="/server-error" element={<Page500 />} />
        </Route>
      </Route>

      {/* UnAuth Pages */}
      <Route element={<MinimalLayout />}>
        <Route path="/login" element={<AuthLogin />} />
      </Route>
      <Route element={<MinimalLayout />}>
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Route>
      <Route element={<MinimalLayout />}>
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route element={<MinimalLayout />}>
        <Route path="/un-authorized" element={<Page401 />} />
      </Route>
      <Route element={<MinimalLayout />}>
        <Route path="/server-error" element={<Page500 />} />
      </Route>
    </Routes>
  );
};

export default ApplicationRoutes;
