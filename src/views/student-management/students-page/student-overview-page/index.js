import styled from '@emotion/styled';
import { Avatar, Box, Card, Grid, Stack, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import StudentSkeleton from 'components/cards/Skeleton/StudentSkeleton';
import { selectLoading, selectStudents } from 'features/student-management/students/redux/studentSelectors';
import { getAllStudents } from 'features/student-management/students/redux/studentThunks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StudentFilter from 'features/student-management/students/components/studentFilterCard';
import SocialsButton from 'features/student-management/students/components/SocialButton';
import cssStyles from 'features/student-management/students/components/cssStyles';
import Image from 'features/student-management/students/components/image';
import SvgIconStyle from 'features/student-management/students/components/svgIconStyle';

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.main }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute'
}));

const Students = () => {
  const dispatch = useDispatch();
  const Students = useSelector(selectStudents);
  const StudentsLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  console.log(Students);

  useEffect(() => {
    dispatch(getAllStudents({ branch_id: selectedBranchId }));
  }, [dispatch, selectedBranchId]);

  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height">
          {StudentsLoading ? (
            <StudentSkeleton />
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12} mb={2}>
                <StudentFilter selectedBranchId={selectedBranchId} />
              </Grid>
              {Students.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={3} lg={3}>
                  <Card sx={{ textAlign: 'center', height: '100%' }}>
                    <Box sx={{ position: 'relative' }}>
                      <SvgIconStyle
                        src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
                        sx={{
                          width: 144,
                          height: 62,
                          zIndex: 10,
                          left: 0,
                          right: 0,
                          bottom: -26,
                          mx: 'auto',
                          position: 'absolute',
                          color: 'background.paper'
                        }}
                      />
                      <Avatar
                        alt="image"
                        src={item.image}
                        sx={{
                          width: 64,
                          height: 64,
                          zIndex: 11,
                          left: 0,
                          right: 0,
                          bottom: -32,
                          mx: 'auto',
                          position: 'absolute'
                        }}
                      />
                      <OverlayStyle />
                      <Image
                        src="https://i.pinimg.com/originals/52/2c/1a/522c1a4289f2e2d0e29ed59071de9dce.jpg"
                        alt="overlaystyle"
                        ratio="16/9"
                      />
                    </Box>

                    <Typography variant="subtitle1" sx={{ mt: 6 }}>
                      {item.student.first_name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item.student.email}
                    </Typography>

                    <Stack alignItems="center">
                      <SocialsButton initialColor sx={{ my: 2.5 }} item={item} />
                    </Stack>
                  </Card>
                </Grid>
              ))}

              <Grid container justifyContent="flex-end" mt={2}>
                <Pagination count={10} color="primary" />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Students;
