// ** MUI Imports
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import UserViewLeft from '../../../../features/student-management/students/components/StudentViewLeft';
import UserViewRight from '../../../../features/student-management/students/components/StudentViewRight';
import { studentById } from 'features/student-management/students/services/studentService';
import { useState } from 'react';
import { useLocation } from 'react-router';
const UserView = () => {
  const [student, setStudent] = useState({});
  const location = useLocation();
  const studentID = location?.state?.id;

  useEffect(() => {
    getStudentData(studentID);
  }, [studentID]);

  const getStudentData = async (id) => {
    const data = { student_id: id };
    const result = await studentById(data);
    if (result.success) {
      setStudent(result.data);
    }
  };
  console.log(student);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <UserViewLeft student={student} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <UserViewRight student={student} />
        </Grid>
      </Grid>
    </>
  );
};

export default UserView;
