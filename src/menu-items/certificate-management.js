// assets
import { IconKey, IconShieldLock, IconUser, IconUsers, IconCash, IconCertificate, IconCertificate2 } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers,
  IconCash,
  IconCertificate,
  IconCertificate2
};
import { hasPermission } from 'hooks/hasPermissions';
// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'certificate-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Certificate Management',
      type: 'collapse',
      icon: icons.IconCertificate,

      children: [
        {
          id: 'student-certificates',
          title: 'Student Certificates',
          type: 'item',
          url: '/certificate-management/student-certificates',
          icon: icons.IconCertificate2,
          target: false,
          breadcrumbs: false,
          visible: hasPermission('inst_perm_student_certificates_view','Student Certificates')
        }
      ]
    }
  ]
};

export default pages;
