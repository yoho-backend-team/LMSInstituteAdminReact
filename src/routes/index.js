// import { useRoutes } from 'react-router-dom';

// // routes
// import MainRoutes from './MainRoutes';
// import AuthenticationRoutes from './AuthenticationRoutes';

// // ==============================|| ROUTING RENDER ||============================== //

// export default function ThemeRoutes() {
//   return useRoutes([MainRoutes, AuthenticationRoutes]);
// }

import { lazy } from 'react';

// project imports
import Loadable from 'components/loadable';
import MinimalLayout from 'layout/MinimalLayout';
import MainLayout from 'layout/MainLayout';
import { Routes, Route, Navigate } from 'react-router-dom';

// view imports

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));

// User Management
const GroupsPage = Loadable(lazy(() => import('views/user-management/groups')));
const UsersPage = Loadable(lazy(() => import('views/user-management/users')));

//Branch Management
const BranchesPage = Loadable(lazy(() => import('views/branch-management/branches')));

// Batch Management
const BatchesPage = Loadable(lazy(() => import('views/batch-management/batches')));
const AddBatchPage = Loadable(lazy(() => import('views/batch-management/add-batch')));
const ViewBatchPage = Loadable(lazy(() => import('views/batch-management/view-batch')));

// Attendance Management
const StudentAttendancesPage = Loadable(lazy(() => import('views/attendance-management/students')));
const TeachingStaffAttendancesPage = Loadable(lazy(() => import('views/attendance-management/teaching -staffs')));
const NonTeachingStaffAttendancesPage = Loadable(lazy(() => import('views/attendance-management/non-teaching-staffs')));

// Certificate Management
const StaffCertificatesPage = Loadable(lazy(() => import('views/certificate-management/staff')));
const StudentCertificatesPage = Loadable(lazy(() => import('views/certificate-management/student')));

// Class Management
const LiveClassesPage = Loadable(lazy(() => import('views/class-management/live-class')));
const OnlineClassesPage = Loadable(lazy(() => import('views/class-management/online-class')));
const OfflineClassesPage = Loadable(lazy(() => import('views/class-management/offline-class')));

// Content Management
const ClassContentsPage = Loadable(lazy(() => import('views/content-management/class-content')));
const CourseContentsPage = Loadable(lazy(() => import('views/content-management/course-content')));
const ExamContentsPage = Loadable(lazy(() => import('views/content-management/exam-content')));

// Course Management
const CategoriesPage = Loadable(lazy(() => import('views/course-management/categories')));
const CoursesPage = Loadable(lazy(() => import('views/course-management/courses')));

// Exam Management
const OfflineExamsPage = Loadable(lazy(() => import('views/exam-management/offline-exam')));
const OnlineExamsPage = Loadable(lazy(() => import('views/exam-management/online-exam')));

// Result Management
const OfflineExamResultPage = Loadable(lazy(() => import('views/result-management/offline-exams')));
const OnlineExamResultPage = Loadable(lazy(() => import('views/result-management/online-exams')));

// Help Center
const CustomerSupportPage = Loadable(lazy(() => import('views/help-center/customer-support')));
const TechnicalSupportPage = Loadable(lazy(() => import('views/help-center/technical-support')));

// Id Card Management
const StaffIdCardsPage = Loadable(lazy(() => import('views/id-card-management/staffs/teaching')));
const StudentIdCardsPage = Loadable(lazy(() => import('views/id-card-management/students')));

// Attendance Management
const AllNotificationsPage = Loadable(lazy(() => import('views/notification-management/all-notification')));
const StaffNotificationsPage = Loadable(lazy(() => import('views/notification-management/staff-notification')));
const StudentNotificationsPage = Loadable(lazy(() => import('views/notification-management/student-notification')));

// Payment Management
const FeesPage = Loadable(lazy(() => import('views/payment-management/fee')));
const SalariesPage = Loadable(lazy(() => import('views/payment-management/salary')));
const SubscriptionsPage = Loadable(lazy(() => import('views/payment-management/subscription')));

// Refund Management
const RefundsPage = Loadable(lazy(() => import('views/refund-management/refunds')));

// Staff Management
const TeachingStaffsPage = Loadable(lazy(() => import('views/staff-management/teaching-staffs')));
const NonTeachingStaffsPage = Loadable(lazy(() => import('views/staff-management/non-teaching-staffs')));

// Student Management
const StudentsPage = Loadable(lazy(() => import('views/student-management/students/profile')));
// const ViewStudentProfile = Loadable(lazy(() => import('views/student-management/students/viewProfile')));


//Error Pages
const Page404 = Loadable(lazy(() => import('views/error-pages/404-page')));
const Page401 = Loadable(lazy(() => import('views/error-pages/401-page')));
const Page500 = Loadable(lazy(() => import('views/error-pages/500-page')));

// const UserViewPage = Loadable(lazy(() => import('views/user-management/view-user')));
// const InstitutesPage = Loadable(lazy(() => import('views/institute-management/institutes/institutes')));
// const InstituteProfile = Loadable(lazy(() => import('views/institute-management/institutes/overView/instituteProfile')));
// const TaxesPage = Loadable(lazy(() => import('views/tax-management/taxes')));
// const DiscountsPage = Loadable(lazy(() => import('views/discount-management/discounts')));
// const NotificationsPage = Loadable(lazy(() => import('views/notification-management/notifications')));
// const PaymentsPage = Loadable(lazy(() => import('views/payment-management/payments')));
// const SubscriptionsPage = Loadable(lazy(() => import('views/subscription-management/subscriptions')));
// const ReportsPage = Loadable(lazy(() => import('views/report-management/reports')));
// const HelpsPage = Loadable(lazy(() => import('views/help-center/helps')));
// const TicketsPage = Loadable(lazy(() => import('views/help-center/tickets')));
// const Page404 = Loadable(lazy(() => import('views/404Page')));
// const Page401 = Loadable(lazy(() => import('views/401Page')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

// const Protected = () => {
//   const { state } = useAppContext();

//   if (state?.user) return <Outlet />;
//   return <Navigate to="/login" replace />;
// };
// const AdminRoute = () => {
//   const { state } = useAppContext();

//   if (state?.is_admin) {
//     return <Outlet />;
//   }
//   return <Navigate to="/login" />;
// };

const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<DashboardDefault />} />
      </Route>

      <Route path="/user-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/user-management/groups" />} />
        {/* <Route element={<ProtectedRoute element={<GroupsPage />} screen={'Groups'} name={'Read'} />}> */}
        <Route path="groups" element={<GroupsPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>

      <Route path="/attendance-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/attendance-management/student-attendances" />} />
        <Route path="student-attendances" element={<StudentAttendancesPage />} />
        <Route path="teaching-staff-attendances" element={<TeachingStaffAttendancesPage />} />
        <Route path="non-teaching-staff-attendances" element={<NonTeachingStaffAttendancesPage />} />
      </Route>

      <Route path="/batch-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/batch-management/batches" />} />
        <Route path="batches" element={<BatchesPage />} />
        <Route path="batches/add" element={<AddBatchPage />} />
        <Route path="batches/:id" element={<ViewBatchPage />} />
      </Route>

      <Route path="/branch-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/branch-management/branches" />} />
        <Route path="branches" element={<BranchesPage />} />
      </Route>

      <Route path="/certificate-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/certificate-management/student-certificates" />} />
        <Route path="student-certificates" element={<StudentCertificatesPage />} />
        <Route path="staff-certificates" element={<StaffCertificatesPage />} />
      </Route>

      <Route path="/class-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/class-management/live-classes" />} />
        <Route path="live-classes" element={<LiveClassesPage />} />
        <Route path="offline-classes" element={<OfflineClassesPage />} />
        <Route path="online-classes" element={<OnlineClassesPage />} />
      </Route>

      <Route path="/content-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/content-management/class-contents" />} />
        <Route path="class-contents" element={<ClassContentsPage />} />
        <Route path="course-contents" element={<CourseContentsPage />} />
        <Route path="exam-contents" element={<ExamContentsPage />} />
      </Route>

      <Route path="/course-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/course-management/categories" />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="courses" element={<CoursesPage />} />
      </Route>

      <Route path="/help-center" element={<MainLayout />}>
        <Route index element={<Navigate to="/help-center/customer-support" />} />
        <Route path="customer-support" element={<CustomerSupportPage />} />
        <Route path="technical-support" element={<TechnicalSupportPage />} />
      </Route>

      <Route path="/exam-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/exam-management/online-exams" />} />
        <Route path="offline-exams" element={<OfflineExamsPage />} />
        <Route path="online-exams" element={<OnlineExamsPage />} />
      </Route>
      <Route path="/result-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/exam-management/online-exam-results" />} />
        <Route path="offline-exam-results" element={<OfflineExamResultPage />} />
        <Route path="online-exam-results" element={<OnlineExamResultPage />} />
      </Route>

      <Route path="/id-card-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/id-card-management/student-id-cards" />} />
        <Route path="student-id-cards" element={<StudentIdCardsPage />} />
        <Route path="staff-id-cards" element={<StaffIdCardsPage />} />
      </Route>

      <Route path="/notification-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/notification-management/all-notifications" />} />
        <Route path="all-notifications" element={<AllNotificationsPage />} />
        <Route path="staff-notifications" element={<StaffNotificationsPage />} />
        <Route path="student-notifications" element={<StudentNotificationsPage />} />
      </Route>

      <Route path="/payment-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/payment-management/fees" />} />
        <Route path="fees" element={<FeesPage />} />
        <Route path="salaries" element={<SalariesPage />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
      </Route>

      <Route path="/refund-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/refund-management/refunds" />} />
        <Route path="refunds" element={<RefundsPage />} />
      </Route>

      <Route path="/staff-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/staff-management/teaching-staffs" />} />
        <Route path="teaching-staffs" element={<TeachingStaffsPage />} />
        <Route path="non-teaching-staffs" element={<NonTeachingStaffsPage />} />
      </Route>

      <Route path="/student-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/student-management/students" />} />
        <Route path="students" element={<StudentsPage />} />
      </Route>

      <Route element={<MinimalLayout />}>
        <Route path="/login" element={<AuthLogin />} />
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
