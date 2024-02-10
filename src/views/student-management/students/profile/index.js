import { Avatar, Box, Grid, Stack, Typography, Card } from '@mui/material';
import SocialsButton from './SocialButton';
import SvgIconStyle from './svgIconStyle';
import styled from '@emotion/styled';
import cssStyles from './cssStyles';
import StudentFilter from '../view-profile/studentFilterCard';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import StudentSkeleton from 'components/cards/Skeleton/StudentSkeleton';
import Image from './image';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const dummyData = [
    {
      name: 'Anish',
      image: 'https://www.trickscity.com/wp-content/uploads/2016/11/K0cAXP3.jpg',
      title: 'Full-Stack Web Development'
    },
    {
      name: 'Anish',
      image: 'https://i.pinimg.com/originals/d9/e9/a0/d9e9a0e75e88814c9480b8038af03d18.jpg',
      title: 'Front-end Developer'
    },
    {
      name: 'Anish',
      image: 'https://i.pinimg.com/originals/d9/e9/a0/d9e9a0e75e88814c9480b8038af03d18.jpg',
      title: 'Front-end Developer'
    },
    {
      name: 'Anish',
      image: 'https://i.pinimg.com/originals/d9/e9/a0/d9e9a0e75e88814c9480b8038af03d18.jpg',
      title: 'Front-end Developer'
    }
  ];

  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height">
          {loading ? (
            // If data is still loading, display skeleton
            <StudentSkeleton />
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12} mb={2}>
                <StudentFilter />
              </Grid>

              {dummyData.map((student, index) => (
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
                        src={student.image}
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
                      {student.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {student.title}
                    </Typography>

                    <Stack alignItems="center">
                      <SocialsButton initialColor sx={{ my: 2.5 }} />
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
