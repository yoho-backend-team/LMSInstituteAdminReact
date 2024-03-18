// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
// ==============================|| SKELETON - EARNING CARD ||============================== //

const TeachingStaffSkeleton = () => {
  const skeletonData = Array.from({ length: 10 });
  return (
    <>
      <Grid container spacing={2} mt={2}>
        {skeletonData.map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={4}>
            <Card sx={{ position: 'relative' }}>
              <CardContent sx={{ pt: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <Skeleton variant="circular" width={100} height={100} />

                  <Box sx={{ mb: 1, pt: 1, mt: 2 }}>
                    <Skeleton variant="rectangular" height={15} width={160} />
                  </Box>
                  <Box sx={{ mb: 5, pt: 1 }}>
                    <Skeleton variant="rectangular" height={15} width={150} />
                  </Box>
                  <Box
                    sx={{
                      mb: 5,
                      gap: 2,
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-around'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <Skeleton variant="rectangular" height={28} width={90} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <Skeleton variant="rectangular" height={28} width={90} />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <Skeleton variant="rectangular" height={33} width={120} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TeachingStaffSkeleton;
