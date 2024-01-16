import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import userManagement from './user-management';
import branchManagement from './branch-management';
import staffManagement from './staff-management';
import studentManagement from './student-management';
import courseManagement from './course-management';
import contentManagement from './content-management';
import classManagement from './class-management';
import examManagement from './exam-management';
import attendanceManagement from './attendance-management';
import paymentManagement from './payment-management';
import feeManagement from './fee-management';
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [
    dashboard,
    branchManagement,
    userManagement,
    staffManagement,
    studentManagement,
    courseManagement,
    contentManagement,
    classManagement,
    examManagement,
    attendanceManagement,
    paymentManagement,
    feeManagement,
    pages,
    utilities,
    other
  ]
};

export default menuItems;
