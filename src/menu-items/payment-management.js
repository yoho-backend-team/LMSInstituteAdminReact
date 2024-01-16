// assets
import { IconKey, IconShieldLock, IconUser, IconUsers,IconCash } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconCash
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'payment-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Payment Management',
      type: 'collapse',
      icon: icons.IconCash,

      children: [
        {
          id: 'payments',
          title: 'Payments',
          type: 'item',
          url: '/payment-management/payments',
          icon: icons.IconCash,
          target: false,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;
