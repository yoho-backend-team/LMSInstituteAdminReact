// assets

// constant
import { IconKey, IconShieldLock, IconUser, IconUsers, IconCash, IconHelp } from '@tabler/icons';
const icons = {
  Icon1: IconHelp
};
import AddIcon from '@mui/icons-material/Add';
import { hasPermission } from 'hooks/hasPermissions';
// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'help-center',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Help Center',
      type: 'collapse',
      icon: icons.Icon1,

      children: [
        {
          id: 'customer-support',
          title: 'Help Faqs',
          type: 'item',
          url: '/help-center/help-faqs',
          icon: icons.Icon1,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_help_faqs_support_view', 'Help Faqs')
        },
        {
          id: 'Add Help Category',
          title: 'Add Question',
          type: 'item',
          url: '/help-center/help-Add',
          icon: AddIcon,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_help_faqs_support_view', 'Help Faqs')
        }
      ]
    }
  ]
};

export default pages;
