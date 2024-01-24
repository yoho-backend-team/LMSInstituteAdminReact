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
const AddGroupPage = Loadable(lazy(() => import('views/user-management/add-group')));
const ViewGroupPage = Loadable(lazy(() => import('views/user-management/view-group')));
const EditGroupPage = Loadable(lazy(() => import('views/user-management/edit-group')));
const UsersPage = Loadable(lazy(() => import('views/user-management/users')));
const ViewUserPage = Loadable(lazy(() => import('views/user-management/view-user')));

//Branch Management
const BranchesPage = Loadable(lazy(() => import('views/branch-management/branches')));
const AddBranchPage = Loadable(lazy(() => import('views/branch-management/add-branch')));
const ViewBranchPage = Loadable(lazy(() => import('views/branch-management/view-branch')));

// Batch Management
const BatchesPage = Loadable(lazy(() => import('views/batch-management/batches')));
const AddBatchPage = Loadable(lazy(() => import('views/batch-management/add-batch')));
const ViewBatchPage = Loadable(lazy(() => import('views/batch-management/view-batch')));

// Attendance Management
const StudentAttendanceViewPage = Loadable(lazy(() => import('views/attendance-management/view-students/index')));
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
const CreateExamPaper = Loadable(lazy(() => import('views/content-management/exam-content/create-exam-paper/index')));
const CreateQuestionPage = Loadable(lazy(() => import('views/content-management/course-content/create-question/index')));


// Course Management
const CategoriesPage = Loadable(lazy(() => import('views/course-management/categories')));
const CoursesPage = Loadable(lazy(() => import('views/course-management/courses')));
const AddCoursePage = Loadable(lazy(() => import('views/course-management/add-course')));
const ViewCoursePage = Loadable(lazy(() => import('views/course-management/view-course')));

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
const ViewTeachingProfile = Loadable(lazy(() => import('views/staff-management/teaching-staffs/view-profile')));
const AddNewStaff = Loadable(lazy(() => import('views/staff-management/add-new-staff/addNewStaff')));



// Student Management
const StudentsPage = Loadable(lazy(() => import('views/student-management/students/profile')));
const ViewStudentProfile = Loadable(lazy(() => import('views/student-management/students/view-profile')));
const AddNewStudent = Loadable(lazy(() => import('views/student-management/students/profile/add-new-student/addNewStudent')));

//Error Pages
const Page404 = Loadable(lazy(() => import('views/error-pages/404-page')));
const Page401 = Loadable(lazy(() => import('views/error-pages/401-page')));
const Page500 = Loadable(lazy(() => import('views/error-pages/500-page')));


//Calender
const CalenderPage = Loadable(lazy(() => import('views/calender')));

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
      <Route path="/calender" element={<MainLayout />}>
        <Route index element={<CalenderPage />} />
        {/* <Route path="" element={} /> */}
      </Route>

      <Route path="/user-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/user-management/groups" />} />
        {/* <Route element={<ProtectedRoute element={<GroupsPage />} screen={'Groups'} name={'Read'} />}> */}
        <Route path="groups" element={<GroupsPage />} />
        <Route path="groups/add" element={<AddGroupPage />} />
        <Route path="groups/view" element={<ViewGroupPage />} />
        <Route path="groups/edit/:id" element={<EditGroupPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id" element={<ViewUserPage />} />
      </Route>

      <Route path="/attendance-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/attendance-management/student-attendances" />} />
        <Route path="student-attendances" element={<StudentAttendancesPage />} />
        <Route path="student-attendances/view" element={<StudentAttendanceViewPage />} />
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
        <Route path="branches/add" element={<AddBranchPage />} />
        <Route path="branches/:id" element={<ViewBranchPage />} />
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
        <Route path="exam-contents/create-exam-paper" element={<CreateExamPaper />} />
        <Route path="exam-contents/create-exam-paper/create-question" element={<CreateQuestionPage />} />
      </Route>

      <Route path="/course-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/course-management/categories" />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/add" element={<AddCoursePage />} />
        <Route path="courses/:id" element={<ViewCoursePage />} />
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
        <Route path="view-profile" element={<ViewTeachingProfile/>} />
        <Route path="add-new-staff" element={<AddNewStaff/>} />
        <Route path="non-teaching-staffs" element={<NonTeachingStaffsPage />} />
      </Route>

      <Route path="/student-management" element={<MainLayout />}>
        <Route index element={<Navigate to="/student-management/students" />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="view-profile" element={<ViewStudentProfile />} />
        <Route path="add-new-student" element={<AddNewStudent />} />
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
