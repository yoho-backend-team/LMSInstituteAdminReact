// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconCash, IconHelp } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconCash,
  IconHelp
};
import { hasPermission } from 'hooks/hasPermissions';
// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'faq-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Faq Management',
      type: 'collapse',
      icon: icons.IconHelp,
      children: [
        {
          id: 'categories',
          title: 'Categories',
          type: 'item',
          url: '/faq-management/categories',
          icon: icons.IconHelp,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_faq_categories_view')
        },
        {
          id: 'Faqs',
          title: 'Faqs',
          type: 'item',
          url: '/faq-management/faqs',
          icon: icons.IconHelp,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_faqs_view')
        }
      ]
    }
  ]
};

export default pages;
