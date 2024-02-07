// assets
import { IconBuildingCommunity } from "@tabler/icons";

// constant
const icons = { IconBuildingCommunity };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const community = {
  id: 'community',
  title: '',
  type: 'group',
  children: [
    {
      id: 'community',
      title: 'Community',
      type: 'item',
      url: '/community',
      icon: icons.IconBuildingCommunity,
      breadcrumbs: false
    }
  ]
};

export default community;