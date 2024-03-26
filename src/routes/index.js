import { lazy } from 'react';

// project imports
import Loadable from 'components/loadable';
import MinimalLayout from 'layout/MinimalLayout';
import MainLayout from 'layout/MainLayout';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';
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
const BranchesPage = Loadable(lazy(() => import('views/branch-management/branch-overview-page')));
const AddBranchPage = Loadable(lazy(() => import('views/branch-management/branch-add-page')));
const ViewBranchPage = Loadable(lazy(() => import('views/branch-management/branch[id]-page')));

// Batch Management
const BatchesPage = Loadable(lazy(() => import('views/batch-management/batches')));
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
const StudentCertificatesPage = Loadable(lazy(() => import('views/certificate-management/student-certificates-page')));

// Class Management
const LiveClassesPage = Loadable(lazy(() => import('views/class-management/live-class')));
const ViewLiveClass = Loadable(lazy(() => import('views/class-management/live-class/view-class')));
const OfflineClassesPage = Loadable(lazy(() => import('views/class-management/offline-class')));
const ViewOfflineClass = Loadable(lazy(() => import('views/class-management/offline-class/view-class')));

// Content Management

const StudyMaterialsPage = Loadable(lazy(() => import('views/content-management/course-study-materials-page')));
const NotesPage = Loadable(lazy(() => import('views/content-management/course-notes-page')));
const ModulesPage = Loadable(lazy(() => import('views/content-management/course-modules-page')));

// Course Management
const CategoriesPage = Loadable(lazy(() => import('views/course-management/categories-page/categories-overview-page')));
const CoursesPage = Loadable(lazy(() => import('views/course-management/courses-page/courses-overview-page')));
const AddCoursePage = Loadable(lazy(() => import('views/course-management/courses-page/course-add-page')));
const ViewCoursePage = Loadable(lazy(() => import('views/course-management/courses-page/course[id]-page')));

// Help Center
const CustomerSupportPage = Loadable(lazy(() => import('views/help-center/customer-support-page')));

// Ticket Management
const StaffTicketPage = Loadable(lazy(() => import('views/ticket-management/staff-tickets-page')));
const StudentTicketPage = Loadable(lazy(() => import('views/ticket-management/student-tickets-page')));

// Id Card Management
const StaffIdCardsPage = Loadable(lazy(() => import('views/id-card-management/teaching-staff-id-cards-page')));
const StudentIdCardsPage = Loadable(lazy(() => import('views/id-card-management/student-id-cards-page')));

// Attendance Management
const AllNotificationsPage = Loadable(lazy(() => import('views/notification-management/all-notifications-page')));
const StaffNotificationsPage = Loadable(lazy(() => import('views/notification-management/staff-notifications-page')));
const StudentNotificationsPage = Loadable(lazy(() => import('views/notification-management/student-notifications-page')));

// Payment Management
const FeesPage = Loadable(lazy(() => import('views/payment-management/student-fees-page')));
const SalariesPage = Loadable(lazy(() => import('views/payment-management/staff-salaries-page')));
const SubscriptionsPage = Loadable(lazy(() => import('views/payment-management/subscriptions-page')));

// Refund Management
const RefundsPage = Loadable(lazy(() => import('views/refund-management/student-fee-refunds-page')));

//Faq Management
const FaqCategoriesPage = Loadable(lazy(() => import('views/faq-management/categories')));
const FaqFaqsPage = Loadable(lazy(() => import('views/faq-management/faqs')));

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
const Community = Loadable(lazy(() => import('views/community/index.js')));
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

  const hasPermission = (permissionCode) => {
    return permissions?.some((obj) => obj.permission_code === permissionCode);
  };
  // ProtectedRoute component for route protection and permission checks
  const ProtectedRoute = ({ element, permissionCode }) => {
    const hasAccess = hasPermission(permissionCode);

    return hasAccess ? element : <Navigate to="/unauthorized" />;
  };
  return (
    <Routes>
      <Route element={<Protected />}>
        {/* Dashboard Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to={permissions ? permissions[0]?.url : '/'} />} />
          <Route element={<ProtectedRoute element={<DashboardDefault />} permissionCode={'inst_perm_dashboard_view'} />}>
            <Route path="dashboard" element={<DashboardDefault />} />
          </Route>
        </Route>
        {/* Branch Management Routes */}
        <Route path="/branch-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/branch-management/branches" />} />
          <Route element={<ProtectedRoute element={<BranchesPage />} permissionCode={'inst_perm_branch_view'} />}>
            <Route path="branches" element={<BranchesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<AddBranchPage />} permissionCode={'inst_perm_branch_create'} />}>
            <Route path="branches/add" element={<AddBranchPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewBranchPage />} permissionCode={'inst_perm_branch_view'} />}>
            <Route path="branches/:id" element={<ViewBranchPage />} />
          </Route>
        </Route>
        {/* User Management Routes */}
        <Route path="/user-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/user-management/groups" />} />
          <Route element={<ProtectedRoute element={<GroupsPage />} permissionCode={'inst_perm_group_view'} />}>
            <Route path="groups" element={<GroupsPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<AddGroupPage />} permissionCode={'inst_perm_group_create'} />}>
            <Route path="groups/add" element={<AddGroupPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewGroupPage />} permissionCode={'inst_perm_group_details_view'} />}>
            <Route path="groups/view" element={<ViewGroupPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<EditGroupPage />} permissionCode={'inst_perm_group_update'} />}>
            <Route path="groups/:id/edit/" element={<EditGroupPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<UsersPage />} permissionCode={'inst_perm_admin_users_view'} />}>
            <Route path="admin-users" element={<UsersPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewUserPage />} permissionCode={'inst_perm_admin_user_view'} />}>
            <Route path="admin-users/:id" element={<ViewUserPage />} />
          </Route>
        </Route>
        {/* Course Management Routes */}
        <Route path="/course-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/course-management/categories" />} />
          <Route element={<ProtectedRoute element={<CategoriesPage />} permissionCode={'inst_perm_categories_view'} />}>
            <Route path="categories" element={<CategoriesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<CoursesPage />} permissionCode={'inst_perm_course_view'} />}>
            <Route path="courses" element={<CoursesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<AddCoursePage />} permissionCode={'inst_perm_course_create'} />}>
            <Route path="courses/add" element={<AddCoursePage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewCoursePage />} permissionCode={'inst_perm_course_details_view'} />}>
            <Route path="courses/:id" element={<ViewCoursePage />} />
          </Route>
        </Route>
        {/* Content Management Routes */}
        <Route path="/content-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/content-management/study-materials" />} />
          <Route element={<ProtectedRoute element={<StudyMaterialsPage />} permissionCode={'inst_perm_study_materials_view'} />}>
            <Route path="study-materials" element={<StudyMaterialsPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<NotesPage />} permissionCode={'inst_perm_course_notes_view'} />}>
            <Route path="notes" element={<NotesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ModulesPage />} permissionCode={'inst_perm_course_module_view'} />}>
            <Route path="modules" element={<ModulesPage />} />
          </Route>
        </Route>
        {/* Staff Management Routes */}
        <Route path="/staff-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/staff-management/teaching-staffs" />} />
          <Route element={<ProtectedRoute element={<TeachingStaffsPage />} permissionCode={'inst_perm_teaching_staff_view'} />}>
            <Route path="teaching-staffs" element={<TeachingStaffsPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<AddNewTeachingStaff />} permissionCode={'inst_perm_teaching_staff_create'} />}>
            <Route path="teaching-staffs/add" element={<AddNewTeachingStaff />} />
          </Route>
          <Route element={<ProtectedRoute element={<EditTeachingStaff />} permissionCode={'inst_perm_teaching_staff_update_status'} />}>
            <Route path="teaching-staffs/:id/edit" element={<EditTeachingStaff />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewTeachingProfile />} permissionCode={'inst_perm_teaching_staff_details_view'} />}>
            <Route path="teaching-staffs/:id" element={<ViewTeachingProfile />} />
          </Route>
          <Route element={<ProtectedRoute element={<NonTeachingStaffsPage />} permissionCode={'inst_perm_non_teaching_staff_view'} />}>
            <Route path="non-teaching-staffs" element={<NonTeachingStaffsPage />} />
          </Route>
          <Route
            element={<ProtectedRoute element={<ViewNonTeachingProfile />} permissionCode={'inst_perm_non_teaching_staff_details_view'} />}
          >
            <Route path="non-teaching-staffs/:id" element={<ViewNonTeachingProfile />} />
          </Route>
          <Route element={<ProtectedRoute element={<AddNewNonTeachingStaff />} permissionCode={'inst_perm_non_teaching_staff_create'} />}>
            <Route path="non-teaching-staffs/add" element={<AddNewNonTeachingStaff />} />
          </Route>
          <Route
            element={<ProtectedRoute element={<EditNonTeachingStaff />} permissionCode={'inst_perm_non_teaching_staff_details_update'} />}
          >
            <Route path="non-teaching-staffs/:id/edit" element={<EditNonTeachingStaff />} />
          </Route>
        </Route>
        {/* Student Management Routes */}
        <Route path="/student-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/student-management/students" />} />
          <Route element={<ProtectedRoute element={<StudentsPage />} permissionCode={'inst_perm_student_view'} />}>
            <Route path="students" element={<StudentsPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewStudentProfile />} permissionCode={'inst_perm_student_details_view'} />}>
            <Route path="students/:id" element={<ViewStudentProfile />} />
          </Route>
          <Route element={<ProtectedRoute element={<AddNewStudent />} permissionCode={'inst_perm_student_create'} />}>
            <Route path="students/add" element={<AddNewStudent />} />
          </Route>
          <Route element={<ProtectedRoute element={<EditStudent />} permissionCode={'inst_perm_student_details_update'} />}>
            <Route path="students/:id/edit" element={<EditStudent />} />
          </Route>
        </Route>
        {/* Batch Management Routes */}
        <Route path="/batch-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/batch-management/batches" />} />
          <Route element={<ProtectedRoute element={<BatchesPage />} permissionCode={'inst_perm_batches_view'} />}>
            <Route path="batches" element={<BatchesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<AddBatchPage />} permissionCode={'inst_perm_batches_create'} />}>
            <Route path="batches/add" element={<AddBatchPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewBatchPage />} permissionCode={'inst_perm_batch_details_view'} />}>
            <Route path="batches/:id" element={<ViewBatchPage />} />
          </Route>
        </Route>
        {/* Class Management Routes */}
        <Route path="/class-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/class-management/live-classes" />} />
          <Route element={<ProtectedRoute element={<LiveClassesPage />} permissionCode={'inst_perm_live_classes_view'} />}>
            <Route path="live-classes" element={<LiveClassesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewLiveClass />} permissionCode={'inst_perm_live_classes_details_view'} />}>
            <Route path="live-classes/:id" element={<ViewLiveClass />} />
          </Route>
          <Route element={<ProtectedRoute element={<OfflineClassesPage />} permissionCode={'inst_perm_offline_classes_view'} />}>
            <Route path="offline-classes" element={<OfflineClassesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<ViewOfflineClass />} permissionCode={'inst_perm_offline_classes_details_view'} />}>
            <Route path="offline-classes/:id" element={<ViewOfflineClass />} />
          </Route>
        </Route>
        {/* Attendance Management Routes */}
        <Route path="/attendance-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/attendance-management/student-attendances" />} />
          <Route element={<ProtectedRoute element={<StudentAttendancesPage />} permissionCode={'inst_perm_student_attendances_view'} />}>
            <Route path="student-attendances" element={<StudentAttendancesPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute element={<StudentAttendanceViewPage />} permissionCode={'inst_perm_student_attendances_details_view'} />
            }
          >
            <Route path="student-attendances/:id" element={<StudentAttendanceViewPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute element={<TeachingStaffAttendancesPage />} permissionCode={'inst_perm_teaching_staff_attendance_view'} />
            }
          >
            <Route path="teaching-staff-attendances" element={<TeachingStaffAttendancesPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                element={<TeachingStaffViewAttendancesPage />}
                permissionCode={'inst_perm_teaching_staff_attendance_details_view'}
              />
            }
          >
            <Route path="teaching-staff-attendances/:id" element={<TeachingStaffViewAttendancesPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                element={<NonTeachingStaffAttendancesPage />}
                permissionCode={'inst_perm_non_teaching_staff_attendance_view'}
              />
            }
          >
            <Route path="non-teaching-staff-attendances" element={<NonTeachingStaffAttendancesPage />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                element={<NonTeachingStaffViewAttendancesPage />}
                permissionCode={'inst_perm_non_teaching_staff_attendance_details_view'}
              />
            }
          >
            <Route path="non-teaching-staff-attendances/:id" element={<NonTeachingStaffViewAttendancesPage />} />
          </Route>
        </Route>
        {/* Payment Management Routes */}
        <Route path="/payment-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/payment-management/fees" />} />
          <Route element={<ProtectedRoute element={<FeesPage />} permissionCode={'inst_perm_student_fees_payment_management_view'} />}>
            <Route path="fees" element={<FeesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<SalariesPage />} permissionCode={'inst_perm_staff_salaries_view'} />}>
            <Route path="salaries" element={<SalariesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<SubscriptionsPage />} permissionCode={'inst_perm_subscriptions_view'} />}>
            <Route path="subscriptions" element={<SubscriptionsPage />} />
          </Route>
        </Route>
        {/* Refund Management Routes */}
        <Route path="/refund-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/refund-management/refunds" />} />
          <Route element={<ProtectedRoute element={<RefundsPage />} permissionCode={'inst_perm_student_fees_refund_management_view'} />}>
            <Route path="refunds" element={<RefundsPage />} />
          </Route>
        </Route>
        {/* Notification Management Routes */}
        <Route path="/notification-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/notification-management/all-notifications" />} />
          <Route element={<ProtectedRoute element={<AllNotificationsPage />} permissionCode={'inst_perm_all_notification_view'} />}>
            <Route path="all-notifications" element={<AllNotificationsPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<StaffNotificationsPage />} permissionCode={'inst_perm_staff_notification_view'} />}>
            <Route path="staff-notifications" element={<StaffNotificationsPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<StudentNotificationsPage />} permissionCode={'inst_perm_student_notification_view'} />}>
            <Route path="student-notifications" element={<StudentNotificationsPage />} />
          </Route>
        </Route>
        {/* Certificate Management Routes */}
        <Route path="/certificate-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/certificate-management/student-certificates" />} />
          <Route element={<ProtectedRoute element={<StudentCertificatesPage />} permissionCode={'inst_perm_student_certificates_view'} />}>
            <Route path="student-certificates" element={<StudentCertificatesPage />} />
          </Route>
        </Route>
        <Route path="/id-card-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/id-card-management/student-id-cards" />} />
          <Route element={<ProtectedRoute element={<StudentIdCardsPage />} permissionCode={'inst_perm_student_id_cards_view'} />}>
            <Route path="student-id-cards" element={<StudentIdCardsPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<StaffIdCardsPage />} permissionCode={'inst_perm_student_id_cards_view'} />}>
            <Route path="staff-id-cards" element={<StaffIdCardsPage />} />
          </Route>
        </Route>
        {/* Faq Management Routes */}
        <Route path="/faq-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/faq-management/categories" />} />
          <Route element={<ProtectedRoute element={<FaqCategoriesPage />} permissionCode={'inst_perm_faq_categories_view'} />}>
            <Route path="categories" element={<FaqCategoriesPage />} />
          </Route>
          <Route element={<ProtectedRoute element={<FaqFaqsPage />} permissionCode={'inst_perm_faqs_view'} />}>
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
        </Route>
        {/* Help Center Routes */}
        <Route path="/help-center" element={<MainLayout />}>
          <Route index element={<Navigate to="/help-center/help-faqs" />} />
          <Route element={<ProtectedRoute element={<CustomerSupportPage />} permissionCode={'inst_help_faqs_support_view'} />}>
            <Route path="help-faqs" element={<CustomerSupportPage />} />
          </Route>
        </Route>
        {/* Community Management Routes */}
        <Route path="/community-management" element={<MainLayout />}>
          <Route index element={<Navigate to="/community" />} />
          <Route element={<ProtectedRoute element={<Community />} permissionCode={'inst_perm_community_view'} />}>
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
