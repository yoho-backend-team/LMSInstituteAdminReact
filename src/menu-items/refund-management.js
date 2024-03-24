// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconCash, IconReceiptRefund } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconCash,
  IconReceiptRefund
};
import { hasPermission } from 'hooks/hasPermissions';
// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'refund-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Refund Management',
      type: 'collapse',
      icon: icons.IconReceiptRefund,

      children: [
        {
          id: 'fees',
          title: 'Fees',
          type: 'item',
          url: '/refund-management/refunds',
          icon: icons.IconReceiptRefund,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_student_fees_refund_management_view')
        }
      ]
    }
  ]
};

export default pages;
