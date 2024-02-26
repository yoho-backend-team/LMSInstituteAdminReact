// assets
import { IconQuestionCircle } from '@tabler/icons';

// constant
const icons = { IconQuestionCircle };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const FaqManagement = {
  id: 'authentication',
  title: '',
  type: 'group',
  children: [
    {
      id: 'faq',
      title: 'FAQ Management',
      type: 'item',
      url: '/faq-management/faq',
      icon: icons.IconQuestionCircle,
      breadcrumbs: false
    }
  ]
};

export default FaqManagement;
