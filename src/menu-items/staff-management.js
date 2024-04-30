// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconHeartHandshake } from '@tabler/icons';
import { hasPermission } from 'hooks/hasPermissions';
// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconHeartHandshake
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'staff-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Staff Management',
      type: 'collapse',
      icon: icons.IconHeartHandshake,

      children: [
        {
          id: 'teaching-staffs',
          title: 'Teaching Staffs',
          type: 'item',
          url: '/staff-management/teaching-staffs',
          icon: icons.IconHeartHandshake,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('can_read_institute_teaching_staffs','TeachingStaffs')
        },
        {
          id: 'non-teaching-staffs',
          title: 'Non Teaching Staffs',
          icon: IconHeartHandshake,
          type: 'item',
          url: '/staff-management/non-teaching-staffs',
          target: false,
          breadcrumbs: false,
          visible: hasPermission('can_view_non_teaching_staffs','Non TeachingStaffs')
        }
      ]
    }
  ]
};

export default pages;
