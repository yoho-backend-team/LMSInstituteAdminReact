// assets
import { IconKey, IconShieldLock, IconUser, IconUsers } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'fee-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Fee Management',
      type: 'collapse',
      icon: icons.IconShieldLock,

      children: [
        {
          id: 'fees',
          title: 'Fees',
          type: 'item',
          url: '/fee-management/fees',
          icon: icons.IconUsers,
          target: false,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;
