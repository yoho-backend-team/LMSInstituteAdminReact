// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconCalendarEvent } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconCalendarEvent
};
import { hasPermission } from './../hooks/hasPermissions';
// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'attendance-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Attendance Management',
      type: 'collapse',
      icon: icons.IconCalendarEvent,

      children: [
        {
          id: 'student-attendances',
          title: 'Student Attendances',
          type: 'item',
          url: '/attendance-management/student-attendances',
          icon: icons.IconCalendarEvent,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('can_view_student_attendances','Student Attendances')
        },
        {
          id: 'teaching-staff-attendances',
          title: 'Teaching Staff Attendances',
          icon: IconCalendarEvent,
          type: 'item',
          url: '/attendance-management/teaching-staff-attendances',
          target: false,
          breadcrumbs: false,
          visible: hasPermission('can_view_teaching_staff_attendance',"TeachingStaff Attendances")
        },
        // {
        //   id: 'non-teaching-staff-attendances',
        //   title: 'Non Teaching Staff Attendances',
        //   icon: IconCalendarEvent,
        //   type: 'item',
        //   url: '/attendance-management/non-teaching-staff-attendances',
        //   target: false,

        //   breadcrumbs: false,
        //   visible: hasPermission('can_view_non_teaching_staff_attendance','NonTeachingStaff Attendances')
        // }
      ]
    }
  ]
};

export default pages;
