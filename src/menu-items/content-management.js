// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconNotes, IconNotebook } from '@tabler/icons';

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
  id: 'content-management',
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
          id: 'course-contents',
          title: 'Course Contents',
          type: 'item',
          url: '/content-management/course-contents',
          icon: icons.IconNotebook,
          target: false,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;
