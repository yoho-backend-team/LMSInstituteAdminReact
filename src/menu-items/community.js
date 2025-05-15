// assets
import { IconBuildingCommunity } from '@tabler/icons';
import { hasPermission } from 'hooks/hasPermissions';

// constant
const icons = { IconBuildingCommunity };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const community = {
  id: 'communities',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Community Management',
      type: 'collapse',
      icon: icons.IconBuildingCommunity,
      children: [
        {
          id: 'communities',
          title: 'Communities',
          type: 'item',
          url: '/community-management/community',
          icon: icons.IconBuildingCommunity,
          breadcrumbs: false,
          visible: hasPermission('can_read_institute_community','Community')
        }
      ]
    }
  ]
};

export default community;
