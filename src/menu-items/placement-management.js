// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconSchool } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconSchool
};
import { hasPermission } from 'hooks/hasPermissions';

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'placement-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Placement Management',
      type: 'collapse',
      icon: icons.IconSchool,

      children: [
        {
          id: 'placement',
          title: 'Placement',
          type: 'item',
          url: '/placement-management/placement',
          icon: icons.IconSchool,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('can_view_students','Students')
        }
      ]
    }
  ]
};

export default pages;
