
import Card from '@mui/material/Card';
import StudentCertificates from 'features/certificate-management/student-certificates/components/StudyMaterialDataGrid'

const TabsFullWidth = () => {

  return (
    <Card sx={{ minHeight: '100vh', p: 2 }}>
          <StudentCertificates />
    </Card>
  );
};

export default TabsFullWidth;
