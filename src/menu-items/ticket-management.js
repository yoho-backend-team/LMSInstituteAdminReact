// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconCash, IconHelp, IconTicket } from '@tabler/icons';
import { hasPermission } from 'hooks/hasPermissions';
// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconCash,
  IconHelp,
  IconTicket
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'ticket-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Ticket Management',
      type: 'collapse',
      icon: icons.IconTicket,

      children: [
        {
          id: 'staff-ticket',
          title: 'Staff-Ticket',
          type: 'item',
          url: '/ticket-management/staff-ticket',
          icon: icons.IconTicket,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_staff_ticket_view')
        },
        {
          id: 'student-ticket',
          title: 'Student-Ticket',
          type: 'item',
          url: '/ticket-management/student-ticket',
          icon: icons.IconTicket,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_student_ticket_view')
        },
         {
          id: 'your-ticket',
          title: 'Your-Ticket',
          type: 'item',
          url: '/ticket-management/your-ticket',
          icon: icons.IconTicket,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_student_ticket_view')
        },
      ]
    }
  ]
};

export default pages;
