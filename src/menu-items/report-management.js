// assets
import { 
  IconKey, 
  IconShieldLock, 
  IconUser, 
  IconUsers, 
  IconCash, 
  IconNotification, 
  IconBellRinging 
} from '@tabler/icons';

import AssessmentIcon from '@mui/icons-material/AssessmentOutlined';
import { hasPermission } from 'hooks/hasPermissions';

// Add NotificationsIcon to the icons object
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconCash,
  IconNotification,
  IconBellRinging,
  AssessmentIcon // ✅ Added here
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'notification-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Report Management',
      type: 'collapse',
      icon: icons.AssessmentIcon, // This is now correctly assigned

      children: [
        {
          id: 'student-notifications',
          title: 'Student Reports',
          type: 'item',
          url: '/report',
          icon: icons.IconBellRinging,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_student_notification_view', 'Student Notifications')
        }
      ]
    }
  ]
};

export default pages;
