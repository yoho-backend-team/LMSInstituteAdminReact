// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import CustomSkeleton from '..';
// ==============================|| SKELETON - EARNING CARD ||============================== //

const NonTeachingStaffSkeleton = () => {
  const skeletonData = Array.from({ length: 10 });
  return (
    <>
      <Grid container spacing={4}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} p={1} mt={3}>
            <Card
            sx={{
              width: "490px",
              height: "340px",
              borderRadius: 3,
              boxShadow: 5,
              position: 'relative',
              overflow: 'visible',
              background: '#fff',
            }}
          >
           
              <CardContent sx={{ pt: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
                    <Box sx={{ display: 'flex', gap: '1px' }}>
                        <CustomSkeleton variant="circular" width={100} />
                    </Box>
    
</Box>
<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '24px',gap:"2px" }}>
    <CustomSkeleton variant="text" width={80} height={20} />
</Box>


<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '24px',gap:"160px" }}>
    <CustomSkeleton variant="text" width={50} height={30} />
    <CustomSkeleton variant="text" width={50} height={30} />
</Box>

                
                <Box sx={{ display: 'flex', justifyContent: 'center', textDecoration: 'none',alignItems:"center" }}>
                  <Box sx={{marginTop:'30px'}}>
                    <CustomSkeleton variant="text" width={160} height={30} />
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

export default NonTeachingStaffSkeleton;
