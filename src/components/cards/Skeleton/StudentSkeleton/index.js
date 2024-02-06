import { Box, Card, Grid, Skeleton, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

const StudentSkeleton = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<Skeleton height={25} width={200} />} />
            <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <Skeleton variant="rectangular" height={50} animation="wave" />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Skeleton variant="rectangular" height={50} animation="wave" />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Skeleton variant="rectangular" height={50} animation="wave" />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Skeleton variant="rectangular" height={50} animation="wave" />
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent="flex-end">
                    <Grid item xs={12} sm={3}>
                      <Skeleton variant="rectangular" height={40}  animation="wave" />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {[...Array(6)].map((_, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
           <Card sx={{ textAlign: 'center', height: '100%', position: 'relative' }}>
              {/* Avatar and shape */}
            
            <Box sx={{ position: 'relative', height: '200px', overflow: 'hidden', }}>
              <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '20px',
                  bottom: 0,
                  left: 0,
                  zIndex: 1,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    width: '60px',
                    height: '50px',
                    background: 'white',
                    borderRadius: '40%',
                    transform: 'translateX(-50%)',
                  },
                }}
              />
            </Box>

            <Box sx={{ml:21,}}>
                  <Skeleton variant="circular" width={60} height={60} />
                </Box>
              {/* Student name */}
              <Box  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',}} >
                <Typography variant="subtitle1" sx={{ mt:3}}>
                  <Skeleton width={120} />
                </Typography>
              </Box>

              {/* Student title */}
              <Box  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',mb:3}}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                  <Skeleton width={100} />
                </Typography>
              </Box>

              {/* Socials button */}
             
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 ,mb:3}}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Skeleton variant="rounded" width={30} height={30} />
                  <Skeleton variant="rounded" width={30} height={30} />
                  <Skeleton variant="rounded" width={30} height={30} />
                  <Skeleton variant="rounded" width={30} height={30} />
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default StudentSkeleton;
