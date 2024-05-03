// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconCash } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconCash
};
import { hasPermission } from 'hooks/hasPermissions';
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
          id: 'fees',
          title: 'Fees',
          type: 'item',
          url: '/payment-management/fees',
          icon: icons.IconCash,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_student_fees_payment_management_view',"Fees")
        },
        {
          id: 'salaries',
          title: 'Salaries',
          type: 'item',
          url: '/payment-management/salaries',
          icon: icons.IconCash,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_staff_salaries_view','Staff Salaries')
        },
        {
          id: 'subscriptions',
          title: 'Subscriptions',
          type: 'item',
          url: '/payment-management/subscriptions',
          icon: icons.IconCash,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_subscriptions_view','Subscriptions')
        }
      ]
    }
  ]
};

export default pages;
