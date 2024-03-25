// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconCash, IconNotification, IconBellRinging } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconCash,
  IconNotification,
  IconBellRinging
};
import { hasPermission } from 'hooks/hasPermissions';
// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'notification-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Notification Management',
      type: 'collapse',
      icon: icons.IconNotification,

      children: [
        {
          id: 'student-notifications',
          title: 'Student Notifications',
          type: 'item',
          url: '/notification-management/student-notifications',
          icon: icons.IconBellRinging,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_student_notification_view')
        },
        {
          id: 'staff-notifications',
          title: 'Staff Notifications',
          type: 'item',
          url: '/notification-management/staff-notifications',
          icon: icons.IconBellRinging,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_staff_notification_view')
        },
        {
          id: 'all-notifications',
          title: 'All Notifications',
          type: 'item',
          url: '/notification-management/all-notifications',
          icon: icons.IconBellRinging,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_all_notification_view')
        }
      ]
    }
  ]
};

export default pages;
