// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconNotes, IconNotebook } from '@tabler/icons';
import { hasPermission } from 'hooks/hasPermissions';
// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconNotes,
  IconNotebook
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'content-managementt',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Content Management',
      type: 'collapse',
      icon: icons.IconNotes,

      children: [
        {
          id: 'study-materials',
          title: 'Study Materials',
          type: 'item',
          url: '/content-management/study-materials',
          icon: icons.IconNotebook,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_study_materials_view')
        },
        {
          id: 'notes',
          title: 'Notes',
          icon: icons.IconNotebook,
          type: 'item',
          url: '/content-management/notes',
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_course_notes_view')
        },
        {
          id: 'modules',
          title: 'Modules',
          icon: icons.IconNotebook,
          type: 'item',
          url: '/content-management/modules',
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_course_module_view')
        }
      ]
    }
  ]
};

export default pages;
