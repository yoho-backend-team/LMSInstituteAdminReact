// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconBook, IconCategory } from '@tabler/icons';
import { hasPermission } from 'hooks/hasPermissions';
// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconBook,
  IconCategory
};



// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'course-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Course Management',
      type: 'collapse',
      icon: icons.IconBook,

      children: [
        {
          id: 'categories',
          title: 'Categories',
          type: 'item',
          url: '/course-management/categories',
          icon: icons.IconCategory,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_categories_view')
        },
        {
          id: 'courses',
          title: 'Courses',
          icon: icons.IconBook,
          type: 'item',
          url: '/course-management/courses',
          target: false,

          breadcrumbs: false,
          visible: hasPermission('inst_perm_course_view')
        }
      ]
    }
  ]
};

export default pages;
