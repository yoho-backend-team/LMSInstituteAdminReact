// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconCash, IconId, IconIdBadge, IconIdBadge2 } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconCash,
  IconId,
  IconIdBadge,
  IconIdBadge2
};
import { hasPermission } from 'hooks/hasPermissions';
// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'id-card-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'IDCards Management',
      type: 'collapse',
      icon: icons.IconId,

      children: [
        {
          id: 'student-id-cards',
          title: 'Student IDCards',
          type: 'item',
          url: '/id-card-management/student-id-cards',
          icon: icons.IconIdBadge,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_student_id_cards_view')
        },
        {
          id: 'staff-id-cards',
          title: 'Staff IDCards',
          type: 'item',
          url: '/id-card-management/staff-id-cards',
          icon: icons.IconIdBadge2,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_staff_id_cards_view')
        }
      ]
    }
  ]
};

export default pages;
