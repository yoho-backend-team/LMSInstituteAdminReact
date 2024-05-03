// assets
import { IconKey, IconShieldLock, IconUser, IconUsers } from '@tabler/icons';
import { hasPermission } from 'hooks/hasPermissions';
// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //


const pages = {
  id: 'user-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'User Management',
      type: 'collapse',
      icon: icons.IconShieldLock,

      children: [
        {
          id: 'groups',
          title: 'Groups',
          type: 'item',
          url: '/user-management/groups',
          icon: icons.IconUsers,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('can_create_institute_group','Groups')
        },
        {
          id: 'users',
          title: 'Users',
          icon: IconUser,
          type: 'item',
          url: '/user-management/admin-users',
          target: false,
          breadcrumbs: false,
          visible: hasPermission('can_read_institute_user',"Users")
        }
      ]
    }
  ]
};

export default pages;
