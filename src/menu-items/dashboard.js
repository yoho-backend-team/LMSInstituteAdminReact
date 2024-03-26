// assets
import { IconDashboard } from '@tabler/icons';
import { hasPermission } from 'hooks/hasPermissions';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Dashboard',
      type: 'collapse',
      icon: icons.IconDashboard,
      children: [
        {
          id: 'dashboard',
          title: 'Branch Dashboard',
          type: 'item',
          url: '/dashboard',
          icon: icons.IconDashboard,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_dashboard_view')
        }
      ]
    }
  ]
};

export default dashboard;
