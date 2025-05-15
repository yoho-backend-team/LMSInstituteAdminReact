// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconChalkboard } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconChalkboard
};
import { hasPermission } from 'hooks/hasPermissions';
// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'class-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Class Management',
      type: 'collapse',
      icon: icons.IconChalkboard,

      children: [
        {
          id: 'offline-classes',
          title: 'Offline Classes',
          icon: IconUser,
          type: 'item',
          url: '/class-management/offline-classes',
          target: false,
          breadcrumbs: false,
          visible: hasPermission('can_view_offline_classes','Offline Classes')
        },
        {
          id: 'live-classes',
          title: 'Live Classes',
          icon: IconUser,
          type: 'item',
          url: '/class-management/live-classes',
          target: false,
          breadcrumbs: false,
          visible: hasPermission('can_view_live_classes','Live Classes')
        }
      ]
    }
  ]
};

export default pages;
